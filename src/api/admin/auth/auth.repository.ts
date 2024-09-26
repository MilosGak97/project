import { Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Admin } from "src/entities/admin.entity";
import { AdminStatus } from "src/enums/admin-status.enum";
import { DataSource, Repository } from "typeorm";
import { SignInDto } from "./dto/sign-in-admin.dto";
import * as bcrypt from 'bcrypt' 
import { JwtPayload } from "./dto/jwt-payload.interface";

@Injectable()
export class AuthRepository extends Repository<Admin>{
    
    private readonly logger = new Logger(AuthRepository.name);
    constructor(
        private readonly dataSource: DataSource ,
        private readonly jwtService: JwtService,
    ){super( Admin, dataSource.createEntityManager())}


    async verifyEmail(token:string):Promise<any>{ 
         try{
            const payload = await this.jwtService.verify(token)

            const user = await this.findOne({where: {id: payload.userId}})

            const accessToken = await this.jwtService.sign(payload);
            const refreshToken = await this.jwtService.sign(payload, { expiresIn: '7d' });
            if(!user){
                throw new NotFoundException('User not found')
            }

            user.email_verified = true
            user.status = AdminStatus.ACTIVE
            await this.save(user)
            return {
                refreshToken,
                accessToken
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
    

    async signIn(signInAdminDto: SignInDto): Promise<any> { 
            const { email, password } = signInAdminDto;
            this.logger.log(`Attempting to sign in admin with email: ${email}`);
        
            try {
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
            } catch (error) {
                this.logger.error(`Error during sign-in process for email: ${email}`, error.stack);
                throw new UnauthorizedException('An error occurred during sign-in');
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

  


}