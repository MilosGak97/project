import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/api/entities/user.entity";
import { DataSource, IsNull, Repository } from "typeorm";
import { SignUpDto } from "./dto/sign-up.dto";
import { UserStatus } from "src/api/enums/user-status.enum";
import { UserType } from "src/api/enums/user-type.enum";
import { TokenRepository } from "src/api/repositories/postgres/token.repository";
import { TokenType } from "src/api/enums/token-type.enum";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./dto/jwt-payload.interface";
import { UserRole } from "src/api/enums/user-role.enum";

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
        registerToken: string
    }> {
        const { email } = signUpDto

        const userExist:User = await this.findOne({where: {email}}) 
        
        if(userExist){
            throw new ConflictException("User already exist")
        }

        const user = new User()
        user.email = email
        user.email_verified = false
        user.status = UserStatus.NO_PASSWORD
        user.user_type = UserType.USER
        user.role = UserRole.HEAD
        this.save(user)

        
        const payload: JwtPayload = { userId: user.id }
        const registerToken = await this.jwtService.sign(payload,  { expiresIn: '24h', secret: process.env.CLIENT_JWT_SECRET })

        return { user , registerToken}

    } 

    async signJwtToken(userId: string, expireIn: string):Promise<string>{
        const payload = {userId, expireIn } // 5 days
        const jwtToken = await this.jwtService.sign(payload, {secret: process.env.CLIENT_JWT_SECRET})

        return jwtToken
    }
}