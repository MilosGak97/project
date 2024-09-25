import { AdminUser } from "./admin_user.entity";
import { DataSource, Repository } from "typeorm";
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { Injectable , HttpException, HttpStatus, NotFoundException, UnauthorizedException, Logger} from "@nestjs/common";
import { GetAdminUsersDto } from "./dto/get-admin-users.dto"; 
import * as bcrypt from 'bcrypt' 
import { AdminRole } from "./dto/admin-role.enum";
import { AdminStatus } from "./dto/admin-status.enum";
import { EmailService } from "src/email/email.service"; 
import { SignInAdminDto } from "./dto/sign-in-admin.dto";
import { JwtPayload } from "./dto/jwt-payload.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AdminUserRepository extends Repository<AdminUser> {
    private readonly logger = new Logger(AdminUserRepository.name);
    constructor(
        private readonly emailService: EmailService, 
        private readonly jwtService: JwtService,
        private readonly dataSource: DataSource,
    ) {
        super(AdminUser, dataSource.createEntityManager());
 
    }



    
    async createAdminUser(createAdminUserDto: CreateAdminUserDto): Promise<any> {
        this.logger.log('Creating admin user...'); // Log the start of the process

        const { name, email, phone_number, role, created_by } = createAdminUserDto;

        try {
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

            // Generate random password
            const randomPassword = this.generateRandomPassword();
            const hashedPassword = await bcrypt.hash(randomPassword, 10);

            const newAdminUser = new AdminUser();
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
            const verifyUrl = `https://uniqueproject-229b37d9b8ca.herokuapp.com/admin/admin-users/verify?jwtToken=${encodeURIComponent(jwtToken)}`;
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

    private generateRandomPassword(length: number = 8): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }
        return password;
    }
    /*
    async verifyAdminEmail(token: string):Promise<any>{
         try{
            const payload = await this.jwtService.verifyToken(token)

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
    */
    async signInAdmin(signInAdminDto: SignInAdminDto): Promise<any> {
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
    
    async getAdminUsers(getAdminUsersDto:GetAdminUsersDto):Promise<any>{
        const { searchQuery, role, status, limit, offset} = getAdminUsersDto

        const query = this.createQueryBuilder('adminUser')

        if(searchQuery){
            query.andWhere(
                '(adminUser.name LIKE :searchQuery OR adminUser.email LIKE :searchQuery OR adminUser.phone_number LIKE :searchQuery)',
                { searchQuery: `%${searchQuery}`}
            )
        }

        if(role){

            query.andWhere('(adminUser.role = :role)', { role });
        }

        if(status){
            query.andWhere('(adminUser.status = :status)', {status})
        }


        const totalRecords = await query.getCount()
        query.take(limit)
        query.skip(offset)

        const adminUsers = await query.getMany();

        const currentPage = Math.ceil(offset/limit) + 1

        const totalPages = Math.ceil(totalRecords / limit);

        return {
            totalRecords,
            currentPage,
            totalPages,
            adminUsers,
            limit, 
            offset
        }
    } 
}