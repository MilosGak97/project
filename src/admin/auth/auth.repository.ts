import { HttpException, HttpStatus, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Admin } from "src/entities/admin.entity";
import { AdminStatus } from "src/enums/admin-status.enum";
import { DataSource, Repository } from "typeorm";
import { SignInDto } from "./dto/sign-in-admin.dto";
import * as bcrypt from 'bcrypt' 
import { JwtPayload } from "./dto/jwt-payload.interface";
import { AdminRole } from "src/enums/admin-role.enum";
import { CreateAdminDto } from "../admins/dto/create-admin.dto";
import { EmailService } from "src/email/email.service";

@Injectable()
export class AuthRepository extends Repository<Admin>{
    
    private readonly logger = new Logger(AuthRepository.name);
    constructor(
        private readonly dataSource: DataSource ,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService
    ){super( Admin, dataSource.createEntityManager())}


    async verifyAdminEmail(token:string):Promise<any>{ 
         try{
            const payload = await this.jwtService.verify(token)

            const user = await this.findOne({where: {id: payload.userId}})

            if(!user){
                throw new NotFoundException('User not found')
            }

            user.email_verified = true
            user.status = AdminStatus.ACTIVE
            await this.save(user)
            return {
                success:true,
                message: "Email verified successfully"
            }
         }
         catch(error){
            if(error.name==='JsonWebTokenError' || error.name==='TokenExpiredError'){
                throw new UnauthorizedException('Token invalid or expired')
            }else{
                throw new Error('Error verifying email')
            }
         } 
            
    }
    

    async signInAdmin(signInAdminDto: SignInDto): Promise<any> {
        const { email, password } = signInAdminDto;
        this.logger.log(`Attempting to sign in admin with email: ${email}`); // Log the email
    
        try {
            const user = await this.findOne({ where: { email } });
    
            if (!user) {
                this.logger.warn(`Sign-in failed: No user found with email: ${email}`);
                throw new UnauthorizedException('No user found with this email');
            }
    
            this.logger.log(`User found with ID: ${user.id}. Verifying password...`);
    
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                
                this.logger.log(`here1`);
                const adminId = user.id;
                
                this.logger.log(adminId);
                this.logger.log(`here2`);
                const payload: JwtPayload = { adminId };
                
                this.logger.log(payload);
                this.logger.log(`here3`);
                const accessToken: string = await this.jwtService.sign(payload) 
                this.logger.log(`JWT token generated successfully for user ID: ${adminId}`);
                this.logger.log(`Sign-in successful for user ID: ${adminId}`);
                return { accessToken };
            } else {
                this.logger.warn(`Sign-in failed: Invalid password for email: ${email}`);
                throw new UnauthorizedException('Please check your login credentials');
            }
        } catch (error) {
            this.logger.error(`Error during sign-in process for email: ${email}`, error.stack);
            throw new UnauthorizedException('An error occurred during sign-in');
        }
    }

     
    private generateRandomPassword(length: number = 8): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }
        return password;
    }
    
    async createAdminUser(createAdminUserDto: CreateAdminDto): Promise<any> {
        //this.logger.log('Creating admin user...'); // Log the start of the process

        const { name, email, phone_number, role, created_by } = createAdminUserDto;
 
            // 1. Check if an admin user with this email already exists
            const existingEmailUser = await this.findOne({
                where: { email: email },
            });

            if (existingEmailUser) {
             this.logger.warn(`Email conflict for email: ${email}`);
                throw new HttpException({
                    success: false,
                    message: "An admin user with this email already exists",
                }, HttpStatus.CONFLICT);
            }

            let cleanedPhoneNumber;
            if (phone_number) {
                // 2. Trim any whitespace from the phone number
                cleanedPhoneNumber = phone_number.replace(/\s+/g, '');

                // 3. Validate if phone number contains exactly 10 digits
                if (!/^\d{10}$/.test(cleanedPhoneNumber)) {
                   this.logger.warn(`Invalid phone number: ${cleanedPhoneNumber}`);
                    throw new HttpException({
                        success: false,
                        message: 'Phone number must contain exactly 10 digits.',
                    }, HttpStatus.BAD_REQUEST);
                }

                // 4. Check if an admin user with this phone number already exists
                const existingPhoneUser = await this.findOne({
                    where: { phone_number: cleanedPhoneNumber },
                });

                if (existingPhoneUser) {
                   this.logger.warn(`Phone number conflict for phone: ${cleanedPhoneNumber}`);
                    throw new HttpException({
                        success: false,
                        message: 'An admin user with this phone number already exists.',
                    }, HttpStatus.CONFLICT);
                }
            }

            try {
            // Generate random password
            const randomPassword = this.generateRandomPassword();
            const hashedPassword = await bcrypt.hash(randomPassword, 10);

            const newAdminUser = new Admin();
            newAdminUser.name = name;
            newAdminUser.email = email;
            newAdminUser.phone_number = cleanedPhoneNumber ? cleanedPhoneNumber : null;
            newAdminUser.role = role as AdminRole;
            newAdminUser.password = hashedPassword;
            newAdminUser.created_by = created_by;
            newAdminUser.status = AdminStatus.UNVERIFIED;
            newAdminUser.email_verified = false;

            // Save the new admin user to the database
            await this.save(newAdminUser);
           this.logger.log(`Admin user created with ID: ${newAdminUser.id}`);

            const jwtPayload = { userId: newAdminUser.id, expireIn: '3600' };
            const jwtToken = await this.jwtService.sign(jwtPayload)
            const verifyUrl = `https://uniqueproject-229b37d9b8ca.herokuapp.com/admin/auth/verify?jwtToken=${encodeURIComponent(jwtToken)}`;
            await this.emailService.sendAdminWelcomeEmail(email, randomPassword, verifyUrl);

            // Return success response
            return {
                success: true,
                message: 'Admin user created successfully.',
            };
        } catch (error) {
           this.logger.error('Error creating admin user', error.stack); // Log the error stack
            throw new HttpException({
                success: false,
                message: 'An error occurred while creating the admin user.',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        } 
    }


}