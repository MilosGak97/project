import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AdminUserRepository } from "./admin_users_repository"; 
import { JwtPayload } from "./dto/jwt-payload.interface";
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
        const { adminId } = payload;
        const user: AdminUser = await this.adminUsersRepository.findOne({ where: { id: adminId } });
    
        if (!user) {
            this.logger.warn(`Unauthorized access attempt for userId: ${adminId}`);
            throw new UnauthorizedException();
        }
    
        return user;
    }

}