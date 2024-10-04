import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Admin } from "src/entities/admin.entity";
import { AdminStatus } from "src/enums/admin-status.enum";
import { DataSource, Repository } from "typeorm";
import { SignInDto } from "./dto/sign-in-admin.dto";
import * as bcrypt from 'bcrypt' 
import { JwtPayload } from "./dto/jwt-payload.interface";
import { PasswordResetDto } from "./dto/password-reset.dto";

@Injectable()
export class AuthRepository extends Repository<Admin>{
    
    private readonly logger = new Logger(AuthRepository.name);
    constructor(
        private readonly dataSource: DataSource ,
        private readonly jwtService: JwtService,
    ){super( Admin, dataSource.createEntityManager())}

    async verifyEmail(token: string): Promise<{
        refreshToken: string,
        accessToken: string
    }> {
        // Verify the token and extract the payload
        const payload = await this.jwtService.verify(token);
    
        // Find the user based on the userId from the payload
        const user = await this.findOne({ where: { id: payload.userId } });
    
        // Sign new access and refresh tokens without the exp property
        const accessToken = await this.jwtService.sign(payload);
        const refreshToken = await this.jwtService.sign(payload);
    
        // If user is not found, throw an error
        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        // Update user's email verification status and set them to active
        user.email_verified = true;
        user.status = AdminStatus.ACTIVE;
        await this.save(user);
    
        // Return the new tokens
        return {
            refreshToken,
            accessToken,
        };
    }
    

    async signIn(signInAdminDto: SignInDto): Promise<{
        refreshToken:string,
        accessToken: string
    }> { 
            const { email, password } = signInAdminDto;
            this.logger.log(`Attempting to sign in admin with email: ${email}`);
        
                const user = await this.findOne({ where: { email } });
        
                if (!user) {
                    this.logger.warn(`Sign-in failed: No user found with email: ${email}`);
                    throw new UnauthorizedException('No user found with this email');
                }
        
                this.logger.log(`User found with ID: ${user.id}. Verifying password...`);
        
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (isPasswordValid) {
                    const adminId = user.id;
                    const payload: JwtPayload = { adminId };
        
                    const accessToken = await this.jwtService.sign(payload);
                    const refreshToken = await this.jwtService.sign(payload, { expiresIn: '7d' });
        
                    user.refreshToken = refreshToken; // Save the refresh token as needed
                    await this.save(user); // Ensure save operation is awaited
        
                    this.logger.log(`JWT token generated successfully for user ID: ${adminId}`);
                    this.logger.log(`Sign-in successful for user ID: ${adminId}`);
                    return { accessToken, refreshToken };
                } else {
                    this.logger.warn(`Sign-in failed: Invalid password for email: ${email}`);
                    throw new UnauthorizedException('Please check your login credentials');
                }
        }
        
    async logout(token: string ):Promise<boolean>{

        try {
            const payload: JwtPayload = await this.jwtService.verify(token);
            const adminId = payload.adminId

            const adminUser = await this.findOne( {where: {id: adminId}})
            if(!adminUser){
                throw new NotFoundException('Admin user with this id doesnt exist')
            }
    
            adminUser.refreshToken = "";
            await this.save(adminUser)
            return true;
        
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
            return false
        }
    }
 
       
    


    async passwordReset(passwordResetDto: PasswordResetDto, admin: Admin ):Promise<{
        message: string
    }>{
            const {oldPassword , newPassword , newPasswordRepeat} = passwordResetDto;

            const user = await this.findOne({where: {id: admin.id}})

            if(!user){
                throw new NotFoundException('User with that id is not found')
            }

            if(oldPassword){
                const passwordMatched = await bcrypt.compare(oldPassword, user.password)

                if(!passwordMatched){
                    throw new BadRequestException('Old password is incorect')
                 }
            }

      

         if(newPassword !== newPasswordRepeat ){
            throw new BadRequestException('New Passwords are not matching')
         }

         const salt = await bcrypt.genSalt(10)
         user.password = await bcrypt.hash(newPassword, salt)
         
         if(user.initial_password){
            user.initial_password = false
         }
         
         await this.save(user)

         return {
            message: "Password is successfully updated"
         }
    }

    async whoAmI(token):Promise<Admin>{

        try{
            
        if(!token){
            throw new UnauthorizedException('No Token Found')
        }
 
            const payload:JwtPayload = await this.jwtService.verify(token)

            const adminId = payload.adminId
    
            const adminProfile = this.findOne({where: {id : adminId}} )
    
            
      
        if(!adminProfile) {
            throw new NotFoundException('Not found admin with provided admin id')
        }

        return adminProfile;
        
    }catch(error){
        throw new UnauthorizedException(error)
    }
    }

    async refreshAccessToken(refreshToken:string):Promise<{
        newAccessToken: string
    }>{
        try{
            const payload:JwtPayload = await this.jwtService.verify(refreshToken)

            const adminId = payload.adminId;

            const adminProfile = await this.findOne({where: {id: adminId}})

            if(!adminProfile){
                throw new NotFoundException('Didnt find the user with that id')
            }

            // Create a new access token
            const newAccessToken = this.jwtService.sign({ adminId }, {expiresIn: '1h'});
            return {newAccessToken};
        }catch(error){
            throw new UnauthorizedException('Invalid refresh token')
        }
    }

  


}