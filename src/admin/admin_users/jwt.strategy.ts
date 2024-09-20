import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AdminUserRepository } from "./admin_users_repository";
import { JwtPayload } from "jsonwebtoken";
import { AdminUser } from "./admin_user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    
    private readonly logger = new Logger(AdminUserRepository.name);
    constructor(private adminUsersRepository: AdminUserRepository){
        super({
            secretOrKey: 'topSecret51',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

 

    async validate(payload: JwtPayload): Promise<AdminUser> {
        const { userId } = payload;
        const user: AdminUser = await this.adminUsersRepository.findOne({ where: { id: userId } });
    
        if (!user) {
            this.logger.warn(`Unauthorized access attempt for userId: ${userId}`);
            throw new UnauthorizedException();
        }
    
        return user;
    }

}