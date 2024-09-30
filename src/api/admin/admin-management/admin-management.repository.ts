import { Admin } from "../../../entities/admin.entity";
import { DataSource, Repository } from "typeorm";
import { CreateAdminDto } from './dto/create-admin.dto';
import { Injectable , HttpException, HttpStatus, NotFoundException, UnauthorizedException, Logger, ConflictException} from "@nestjs/common";
import { GetAdminsDto } from "./dto/get-admins.dto"; 
import * as bcrypt from 'bcrypt' 
import { AdminRole } from "../../../enums/admin-role.enum";
import { AdminStatus } from "../../../enums/admin-status.enum";
import { EmailService } from "src/email/email.service";  
import { JwtService } from "@nestjs/jwt";
import * as dotenv from 'dotenv';
import { updateAdminDto } from "./dto/update-admin.dto";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { stat } from "fs";


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
        const { searchQuery, role, status, email_verified , initial_password, limit, offset} = getAdminsDto

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

        if(initial_password){
            query.andWhere('(adminUser.initial_password = :initial_password)', {initial_password})
        }

        if(email_verified){
            query.andWhere('(adminUser.email_verified = :email_verified)', {email_verified})
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

    private async verifyEmail(userId: string,email: string, randomPassword?:string ){
        const jwtPayload = { userId: userId, expireIn: '3600' };
        const jwtToken = await this.jwtService.sign(jwtPayload)
        const verifyUrl = `${process.env.BASE_URL}admin/auth/email?jwtToken=${encodeURIComponent(jwtToken)}`;
        await this.emailService.sendAdminWelcomeEmail(email, verifyUrl, randomPassword || '' );

    }
    
    async createAdmin(createAdminDto: CreateAdminDto): Promise<any> {
        //this.logger.log('Creating admin user...'); // Log the start of the process

        const { name, email, phone_number, role, created_by } = createAdminDto;
 
            // 1. Check if an admin user with this email already exists
            const existingEmailUser = await this.findOne({
                where: { email: email },
            });

            if (existingEmailUser) {
             this.logger.warn(`Email conflict for email: ${email}`);
                throw new HttpException({
                    success: false,
                    message: "This email address is already associated with an existing user.",
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
                        message: 'Phone number format is not valid. Ensure it has 10 digits.',
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
                        message: 'This phone number is already associated with an existing user.',
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
            newAdminUser.initial_password = true;
            newAdminUser.status_changed_at = new Date();

            // Save the new admin user to the database
            await this.save(newAdminUser);
           this.logger.log(`Admin user created with ID: ${newAdminUser.id}`);
        
          // verify email method  newAdminUser.id
          await this.verifyEmail(newAdminUser.id, email, randomPassword)

            // Return success response
            return {
                success: true,
                message: 'The user has been created successfully.',
            };
        } catch (error) {
           this.logger.error('Error creating admin user', error.stack); // Log the error stack
            throw new HttpException({
                success: false,
                message: 'An error occurred while creating the user.',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        } 
    }

    async updateAdmin(updateAdminDto: updateAdminDto, id:string): Promise<any> {
        const { name, email, phone_number, status, role } = updateAdminDto

        const adminData = await this.findOne({where: { id: id}})

        if(!adminData){
            throw new NotFoundException('No user found with this ID.')
        }

        if(name){
            adminData.name = name
        }

        if(email){
            const emailExist = await this.findOne({where: {email:email}})
            if(emailExist && emailExist.id !== id){
                throw new ConflictException('This email address is already associated with an existing user.')
            }
            adminData.email = email
            await this.verifyEmail(adminData.id, email)
            adminData.email_verified = false
        }

        if(phone_number){
            const phoneExist =await this.findOne({where: {phone_number: phone_number}})
            if(phoneExist && phoneExist.id !== id){
                throw new ConflictException('This phone number is already associated with an existing user.')
            }
            adminData.phone_number = phone_number
        }

        if(status){
            adminData.status = status
            adminData.status_changed_at = new Date()
        }

        if(role){
            adminData.role = role
        }

        await this.save(adminData)

        return {message: "User is updated"}
    }
    
    async resendEmailVerification(id:string):Promise<any>{
        const adminData = await this.findOne({where: {id:id}})
        if(!adminData){
            throw new NotFoundException('No user found with this ID.')
        }
        await this.verifyEmail(id, adminData.email)
        return {message: "A new email verification link has been sent."}
    }

    async resetPassword(id:string):Promise<any>{
        const adminData =await this.findOne({where: {id:id}})
        if(!adminData){
            throw new NotFoundException('No user found with this ID.')
        }

        const randomPassword =await this.generateRandomPassword()

        await this.verifyEmail(id, adminData.email, randomPassword)
        
        const hashedPassword = await bcrypt.hash(randomPassword, 10)
        
        adminData.password = hashedPassword;
        adminData.initial_password = true;

        await this.save(adminData)

        return {message: "A new password has been sent to: " + adminData.email}
    }


    async deleteAdmin(id:string):Promise<any>{
        const userData = await this.findOne({where: {id}})

        if(!userData){
            throw new NotFoundException('No user found with this ID.')
        }

        userData.status = AdminStatus.DELETED
        return { message: "Account has been successfully deleted."}
    }
}