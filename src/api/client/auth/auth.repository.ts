import { BadRequestException, ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User } from "src/api/entities/user.entity";
import { DataSource, IsNull, Repository } from "typeorm";
import { SignUpDto } from "./dto/sign-up.dto";
import { UserStatus } from "src/api/enums/user-status.enum";
import { UserType } from "src/api/enums/user-type.enum"; 
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./dto/jwt-payload.interface";
import { UserRole } from "src/api/enums/user-role.enum";
import {  randomInt } from "crypto";
import * as bcrypt from 'bcrypt' 
import { SetPasswordDto } from "./dto/set-password.dto";
import { MessageResponseDto } from "src/api/responses/message-response.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { TokenResponseDto } from "./dto/token-response.dto";

@Injectable()
export class AuthRepository extends Repository<User> {
    constructor(
        private readonly jwtService: JwtService,
        private readonly dataSource: DataSource, 
    ) {
        super(User, dataSource.createEntityManager())
    }

    async signUp(signUpDto: SignUpDto): Promise<{
        user: User,
        registerToken: string,
        passcode: string
    }> {
        const { email } = signUpDto

        const userExist:User = await this.findOne({where: {email}}) 
        
        if(userExist){
            throw new ConflictException("User already exist")
        }

        const passcode = randomInt(100000, 999999).toString()
        const hashedPasscode = await bcrypt.hash(passcode, 10)
    
        const user = new User()
        user.email = email
        user.email_verified = false
        user.status = UserStatus.NEW_REGISTER
        user.user_type = UserType.USER
        user.role = UserRole.HEAD
        user.passcode = hashedPasscode
        const savedUser = await this.save(user)
        
        const payload: JwtPayload = { userId: savedUser.id }
        const registerToken = await this.jwtService.sign(payload,  { expiresIn: '24h', secret: process.env.CLIENT_JWT_SECRET })
        
        return { user , registerToken, passcode }
    } 

    async getUser(token:string):Promise<User>{
        const payload = await this.verifyJwtToken(token)
        const user = await this.findOne({where: {id: payload.userId}})
        if(!user){
            throw new BadRequestException("User is not found using User ID from payload of token")
        }

        return user
    }

    async signIn(signInDto: SignInDto):Promise<{accessToken: string, refreshToken: string, user: User}>{
        const { password, email } = signInDto

        const user = await this.findOne({where: { email }})
        if(!user){
            throw new BadRequestException("Please check your login credentials")
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch){
            throw new BadRequestException("Please check your login credentials")
        }

        const accessToken = await this.signJwtToken(user.id, '1h')
        const refreshToken = await this.signJwtToken(user.id, '30d')

        return {
            accessToken,
            refreshToken,
            user
        }
    } 


    async emailVerification(token:string):Promise<{accessToken: string, refreshToken: string, user: User }>{
        const payload = await this.verifyJwtToken(token)        
        console.log("PAYLOAD  FROM EMAIL:: " + JSON.stringify(payload, null, 2)); // Pretty print the object

        if(!payload.userId){
            throw new ForbiddenException("User ID does not exist in token payload.")
        }
        const user = await this.findOne({where: {id: payload.userId}})
        if(!user){
            throw new NotFoundException("User with provided ID through token does not exist.")
        }

        user.email_verified = true
        user.status = UserStatus.NO_PASSWORD
        user.status_updated_at = new Date()

        await this.save(user)

        const accessToken = await this.signJwtToken(user.id, '1h')
        const refreshToken = await this.signJwtToken(user.id, '30d')
 
        
        return {
            accessToken, 
            refreshToken,
            user
        }
    }

    async setPassword(setPasswordDto: SetPasswordDto, user: User):Promise<MessageResponseDto>{
        const { password, repeatPassword } = setPasswordDto
        
        if(password !== repeatPassword){
            throw new BadRequestException("Password are not matching")
        }

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        user.status = UserStatus.ACTIVE
        user.status_updated_at = new Date()
        await this.save(user)
        return {
            message: "Password is saved."
        }
    }

    async signJwtToken(userId: string, expireIn: string):Promise<string>{
        try {
            const payload = {userId, expireIn } 
            const jwtToken = await this.jwtService.sign(payload, {secret: process.env.CLIENT_JWT_SECRET})
    
            return jwtToken
    
        } catch (error) {
            console.error('Error signing JWT token:', error);
            throw new InternalServerErrorException('Failed to generate token');
        }
    }
/*
    async verifyJwtToken(token: string) {
        const payload = await this.jwtService.verify(token, { secret: process.env.CLIENT_JWT_SECRET });
        //console.log("PAYLOAD  FROM JWT TOKEN: " + JSON.stringify(payload, null, 2)); // Pretty print the object
        return payload
    }
    */
    async verifyJwtToken(token: string): Promise<JwtPayload> {
        try {
            // Verify the token and check its validity
            const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
                secret: process.env.CLIENT_JWT_SECRET,
            });

            // Optional: Validate specific claims if needed (e.g., issuer, audience)
            if (!payload) {
                throw new UnauthorizedException('Invalid token payload');
            }

            // Optional: Validate specific claims if needed (e.g., issuer, audience)
            if (!payload || !payload.userId) {
                throw new UnauthorizedException('Invalid token payload: User ID does not exist.');
            }

            // Return the decoded payload if valid
            return payload;
        } catch (error) {
            // Handle specific JWT errors for better debugging
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('Token has expired');
            }
            if (error.name === 'JsonWebTokenError') {
                throw new UnauthorizedException('Invalid JWT token');
            }
            if (error.name === 'NotBeforeError') {
                throw new UnauthorizedException('Token is not yet active');
            }

            // For any other errors, log and throw a generic unauthorized exception
            console.error('JWT Verification Error:', error);
            throw new UnauthorizedException('Could not verify token');
        }
    }

}