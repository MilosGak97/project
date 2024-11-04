import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Token } from "src/api/entities/token.entity";
import { User } from "src/api/entities/user.entity";
import { TokenType } from "src/api/enums/token-type.enum";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class TokenRepository extends Repository<Token>{
    constructor(
        private readonly dataSource: DataSource
    ){super(Token, dataSource.createEntityManager())}


    // return true if at least one register token is valid
    async registerTokenValidation(  token: string):Promise<boolean> {
        const tokenRecord = await this.findOne({ where: { token: token, type: TokenType.REGISTER}})
      
         if(!tokenRecord.token){
             throw new NotFoundException("There is no token value under Token ID: " + tokenRecord.id)
         }
         if(tokenRecord.expires_at < new Date()){
             tokenRecord.expired = true
             await this.save(tokenRecord)
            throw new ConflictException("Token has been expired")
         }
      
        return true
    }


    async saveToken(user:User, registerToken: string, tokenType: TokenType, expireIn: string){
        const tokenExist = await this.findOne({where: { user: { id: user.id}, token: registerToken}})
        if(tokenExist){
            throw new ConflictException("Register token already exist")
        }

        const expireInSeconds = parseInt(expireIn, 10);
        const expires_at = new Date(Date.now() + expireInSeconds * 1000)

        const token = new Token()
        token.token = registerToken
        token.user = user
        token.expires_at = expires_at
        token.type = tokenType
        token.expired = false
        await this.save(token)

    }
}