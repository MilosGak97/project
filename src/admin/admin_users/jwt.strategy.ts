import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AdminUserRepository } from "./admin_users_repository";
import { JwtPayload } from "jsonwebtoken";
import { AdminUser } from "./admin_user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private adminUsersRepository: AdminUserRepository){
        super({
            secretOrKey: 'topSecret51',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload:JwtPayload):Promise<AdminUser>{
        const {userId} = payload
        const user:AdminUser = await this.adminUsersRepository.findOne({where: {id:userId}})

        if(!user){
            throw new UnauthorizedException()
        }

        return user
    }

}