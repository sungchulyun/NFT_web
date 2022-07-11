/* eslint-disable prettier/prettier */
import { Payload } from './security/payload.interface';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    //회원가입
    async signUp(authcredentialsDto : AuthCredentialsDto): Promise<void>{
        return this.userRepository.createUser(authcredentialsDto);
    }

    //비밀번호 해쉬 검사
    async validateUser(authcredentialsDto: AuthCredentialsDto): Promise<{accessToken: string} | undefined>{
        const email = authcredentialsDto.email;
        const password = authcredentialsDto.password;
        const hash = await (await this.userRepository.findOne({email})).password;
        const validatePassword = await(bcrypt.compare(password, hash));
        if(!validatePassword){
            throw new UnauthorizedException('login failed');
        }  
        const payload: Payload = { email : email };

        return {    //토큰 발급
            accessToken: this.jwtService.sign(payload),
        };
    }
    async tokenValidateUser(payload: Payload): Promise<any | undefined> {
        return await this.userRepository.findOne({
            where: { email: payload.email }
        });
    }
      
    //토큰 발급
    async login(user: User){
        const payload = { email: user.email}
        console.log(payload)
        const token = this.jwtService.sign(payload);
        return token;
        
        
    }
    
}
