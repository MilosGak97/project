import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, Repository } from 'typeorm';
import { AuthRepository } from './auth.repository';
import { SignInDto } from './dto/sign-in-admin.dto';
import { CreateAdminDto } from '../admins/dto/create-admin.dto';

@Injectable()
export class AuthService {
    constructor( 
        private readonly authRepository: AuthRepository
    ){}
    
    async verifyAdminEmail(token){
        return this.authRepository.verifyAdminEmail(token)
    }
  
    async signInAdmin(signInDto:SignInDto):Promise<any>{
        return this.authRepository.signInAdmin(signInDto)
    }


    async createAdminUser(createAdminUserDto: CreateAdminDto): Promise<any>{
        return this.authRepository.createAdminUser(createAdminUserDto)
    }


    }

