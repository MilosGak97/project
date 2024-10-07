import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt"; 
import { JwtPayload } from "./dto/jwt-payload.interface";
import { Admin } from "../entities/admin.entity";
import { AuthRepository } from "./auth.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    
    private readonly logger = new Logger(AuthRepository.name);

    constructor(private authRepository: AuthRepository) {
        super({
            secretOrKey: 'topSecret51',
            jwtFromRequest: (req) => {
                return req.cookies['accessToken']; // Extract from cookies
            },
        });
    }

 

    async validate(payload: JwtPayload): Promise<Admin> {
        const { adminId } = payload; 
        
        const user: Admin = await this.authRepository.findOne({ where: { id: adminId } });
    
        if (!user) {
            this.logger.warn(`Unauthorized access attempt for userId: ${adminId}`);
            throw new UnauthorizedException();
        }
        return user;
    }

}