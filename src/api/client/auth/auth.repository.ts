import { ConflictException, Injectable } from "@nestjs/common";
import { User } from "src/api/entities/user.entity";
import { DataSource, IsNull, Repository } from "typeorm";
import { SignUpDto } from "./dto/sign-up.dto";
import { UserStatus } from "src/api/enums/user-status.enum";
import { UserType } from "src/api/enums/user-type.enum";

@Injectable()
export class AuthRepository extends Repository<User> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(User, dataSource.createEntityManager())
    }

    async signUp(signUpDto: SignUpDto): Promise<{
        message: string
    }> {
        const { email } = signUpDto

        const userExist:User = await this.findOne({where: {email, password: IsNull()}}) 
        
        if(userExist){
            throw new ConflictException("That email already exist in our database but password is NULL")
        }

        const user = new User()
        user.email = email
        user.email_verified = false
        user.status = UserStatus.NO_PASSWORD
        user.user_type = UserType.USER
        this.save(user)

        return {
            message: "string"
        }

    }



}