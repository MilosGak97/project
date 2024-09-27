import { Admin } from "../../../entities/admin.entity";
import { DataSource, Repository } from "typeorm";
import { CreateAdminDto } from './dto/create-admin.dto';
import { Injectable , HttpException, HttpStatus, NotFoundException, UnauthorizedException, Logger} from "@nestjs/common";
import { GetAdminsDto } from "./dto/get-admins.dto"; 
import * as bcrypt from 'bcrypt' 
import { AdminRole } from "../../../enums/admin-role.enum";
import { AdminStatus } from "../../../enums/admin-status.enum";
import { EmailService } from "src/email/email.service"; 
import { SignInDto } from "../auth/dto/sign-in-admin.dto";
import { JwtPayload } from "../auth/dto/jwt-payload.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AdminManagementRepository extends Repository<Admin> {
    private readonly logger = new Logger(AdminManagementRepository.name);
    constructor( 
        private readonly dataSource: DataSource,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService
    ) {
        super(Admin, dataSource.createEntityManager());
    }


    
    async getAdmins(getAdminsDto:GetAdminsDto):Promise<any>{
        const { searchQuery, role, status, limit, offset} = getAdminsDto

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

    private generateRandomPassword(length: number = 8): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }
        return password;
    }

    
    async createAdmin(createAdminUserDto: CreateAdminDto): Promise<any> {
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
            newAdminUser.initial_password= true;

            // Save the new admin user to the database
            await this.save(newAdminUser);
           this.logger.log(`Admin user created with ID: ${newAdminUser.id}`);
                
            const jwtPayload = { userId: newAdminUser.id, expireIn: '3600' };
            const jwtToken = await this.jwtService.sign(jwtPayload)
            const verifyUrl = `https://uniqueproject-229b37d9b8ca.herokuapp.com/admin/auth/email?jwtToken=${encodeURIComponent(jwtToken)}`;
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