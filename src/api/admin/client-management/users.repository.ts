import { ConflictException, Injectable, NotFoundException } from "@nestjs/common"; 
import { User } from "src/entities/user.entity";
import { UserStatus } from "src/enums/user-status.enum";
import { DataSource, Repository } from "typeorm";
import { ListAllUsersDto } from "./dto/list-all-users.dto"; 
import { Company } from "src/entities/company.entity"; 
import { UpdateUserDto } from "./dto/updateUser.dto";
import { EmailService } from "src/email/email.service";
import { JwtService } from "@nestjs/jwt"; 
import * as bcrypt from "bcrypt" 

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService,
        private readonly dataSource: DataSource
    ){
        super(User, dataSource.createEntityManager())
    }

    private async verifyEmail(userId: string, email: string, randomPassword?:string ){
        const jwtPayload = { userId: userId, expireIn: '3600' };
        const jwtToken = await this.jwtService.sign(jwtPayload)
        const verifyUrl = `${process.env.BASE_URL}admin/auth/email?jwtToken=${encodeURIComponent(jwtToken)}`;
        await this.emailService.authEmail(email, verifyUrl, randomPassword || '' );
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

    async listAllUsers(companyId:string, listAllUsersDto:ListAllUsersDto):Promise<{
        result: User[],
        totalRecords: number,
        totalPages: number,
        currentPage: number,
        
        numOffset: number,
        numLimit: number
    }>{

        const {searchQuery, limit, offset, status , role, initial_password, email_verified} = listAllUsersDto 
        const query = await this.createQueryBuilder('user')

        const numLimit = Number(limit)
        const numOffset = Number(offset) 

        // Validate limit and offset
        if (isNaN(numLimit) || numLimit <= 0) {
            throw new Error('Limit must be a positive number');
        }
        if (isNaN(numOffset) || numOffset < 0) {
            throw new Error('Offset must be a non-negative number');
        }

        
        query.where('(user.companyId = :companyId)', {companyId})
        query.andWhere('(user.status != :status )', { status: UserStatus.DELETED})
        
        if(searchQuery){
            query.andWhere('(user.name LIKE :searchQuery OR user.email LIKE :searchQuery OR user.phone_number LIKE :searchQuery)', { searchQuery: `%${searchQuery}%`})
        }

        if(status){
            query.andWhere('(user.status = :status)', {status})
        }
        
        if(role){
            query.andWhere('(user.role = :role) ', {role})
        }

        if(initial_password){
            query.andWhere('(user.initial_password = :initial_password) ', {initial_password})
        }

        if(email_verified){
            query.andWhere('(user.email_verified = :email_verified)', {email_verified})
        }
        query.skip(numOffset)
        query.take(numLimit)

        const result = await query.getMany()
        const totalRecords = await query.getCount()
        const totalPages = Math.ceil(totalRecords/numLimit)
        const currentPage = Math.ceil(numOffset/numLimit) + 1
        return {
            result,
            totalRecords,
            totalPages,
            currentPage,
            numLimit,
            numOffset
        }


    }


    async showUserData(companyId:string, userId: string):Promise<{
        userData: User,
        companyData: Company
    }>{
        
        const userData = await this.createQueryBuilder('user')
        .leftJoinAndSelect('user.company', 'company')
        .where('(user.id = :userId AND company.id = :companyId )', { userId, companyId})
        .getOne()

        if(!userData){
            throw new NotFoundException('User with this ID does not exist.')
        }

        const companyData = userData.company || null

        return {
            userData,
            companyData
        }
    }

    async updateUser(companyId:string, userId:string , updateUserDto: UpdateUserDto):Promise<{
        message:string
    }>{
        const { name, email, phone_number, role, status } = updateUserDto

        const userData = await this.findOne({where : { id: userId, company: {id: companyId}}})

        if(!userData){
            throw new NotFoundException('User with this ID does not exist.')
        }

        if(name && userData.id != userId){
            userData.name = name
        }

        if(email  ){
            const exist = await this.findOne({where: {email}})
            if(exist && exist.id != userId){
                throw new ConflictException('User with this email already exist.')
            }
            userData.email = email
            await this.verifyEmail(userId, email)
            userData.email_verified = false
        }

        if(phone_number){
            const exist = await this.findOne({where: {phone_number}})

            if(exist && exist.id != userId){
                throw new ConflictException('User with this phone number already exist.')
            }
            userData.phone_number = phone_number
        }

        if(role){
            userData.role = role
        }

        if(status){
            userData.status = status
        }

        await this.save(userData)

        return {
            message: "User is updated successfully."
        }
    }


    async deleteUser(companyId:string, userId:string):Promise<{
        message:string
    }>{
        const userData = await this.findOne({where: { id: userId, company: {id:companyId}}})

        if(!userData){
            throw new NotFoundException('User with this ID does not exist.')
        }

        userData.status = UserStatus.DELETED
        await this.save(userData)

        return {
            message: "The user has been successfully deleted."
        }
    }

    async resetPassword(companyId:string, userId:string):Promise<{
        message:string
    }>{
        const userData = await this.findOne({where: {id: userId, company: {id: companyId}}})
        if(!userData){
            throw new NotFoundException('User with this id does not exist.')
        }

        const randomPassword = await this.generateRandomPassword()
        const hashedPassword = await bcrypt.hash(randomPassword,10)
        userData.password = hashedPassword

        await this.verifyEmail(userId, userData.email, hashedPassword)
        userData.initial_password = true
        
        return {
            message: "New password has been sent to email"
        }
    }
}