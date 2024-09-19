import { AdminUser } from "./admin_user.entity";
import { DataSource, Repository } from "typeorm";
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { Injectable , HttpException, HttpStatus, NotFoundException, UnauthorizedException} from "@nestjs/common";
import { GetAdminUsersDto } from "./dto/get-admin-users.dto"; 
import * as bcrypt from 'bcrypt' 
import { AdminRole } from "./dto/admin-role.enum";
import { AdminStatus } from "./dto/admin-status.enum";
import { EmailService } from "src/email/email.service";
import { JwtService } from "src/jwt/jwt.service";

@Injectable()
export class AdminUserRepository extends Repository<AdminUser> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly emailService: EmailService,
        private readonly jwtService: JwtService
    ) {
        super(AdminUser, dataSource.createEntityManager());
    }



    
    async createAdminUser(createAdminUserDto: CreateAdminUserDto): Promise<any> {
      
            const { name, email, phone_number, role, created_by } = createAdminUserDto;
    
            // 1. Check if an admin user with this email already exists
            const existingEmailUser = await this.findOne({
                where: { email: email },
            });
    
            if (existingEmailUser) {
                // Throw 409 Conflict for email conflict
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
                    // Throw 400 Bad Request for invalid phone number
                    throw new HttpException({
                        success: false,
                        message: 'Phone number must contain exactly 10 digits.',
                    }, HttpStatus.BAD_REQUEST); // 400 Bad Request
                }
    
                // 4. Check if an admin user with this phone number already exists
                const existingPhoneUser = await this.findOne({
                    where: { phone_number: cleanedPhoneNumber },
                });
    
                if (existingPhoneUser) {
                    // Throw 409 Conflict for phone number conflict
                    throw new HttpException({
                        success: false,
                        message: 'An admin user with this phone number already exists.',
                    }, HttpStatus.CONFLICT); // 409 Conflict
                }
            }
    
            // Function to generate a random password
            function generateRandomPassword(length: number = 8): string {
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let password = '';
                for (let i = 0; i < length; i++) {
                    const randomIndex = Math.floor(Math.random() * characters.length);
                    password += characters[randomIndex];
                }
                return password;
            }
    
            const randomPassword = generateRandomPassword();
            const hashedPassword = await bcrypt.hash(randomPassword, 10);
    
            const status = AdminStatus.UNVERIFIED;
    
            // Create a new admin user object
            const newAdminUser = new AdminUser();
            newAdminUser.name = name;
            newAdminUser.email = email;
            newAdminUser.phone_number = cleanedPhoneNumber ? cleanedPhoneNumber : null; // optional
            newAdminUser.role = role as AdminRole;
            newAdminUser.password = hashedPassword; // Store hashed password
            newAdminUser.created_by = created_by;
            newAdminUser.status = status;
            newAdminUser.email_verified = false;
    

            

            // Save the new admin user to the database using TypeORM
            await this.save(newAdminUser);
     
            
            const jwtPayload = {userId: newAdminUser.id, expireIn: '3600'}
            const jwtToken = await this.jwtService.generateToken(jwtPayload)
            const verifyUrl = `https://subrosahub.com/admin/admin-users/verify?jwtToken=${encodeURIComponent(jwtToken)}`
            await this.emailService.sendAdminWelcomeEmail(email, randomPassword, verifyUrl)

            // Return success response
            return {
                success: true,
                message: 'Admin user created successfully.',
            };
       
    }
    
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