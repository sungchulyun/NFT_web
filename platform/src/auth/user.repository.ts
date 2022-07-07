/* eslint-disable prettier/prettier */
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { EntityRepository, Repository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authcredentialsDto: AuthCredentialsDto): Promise<void>{
        const{email, password} = authcredentialsDto;

        const salt = await bcrypt.genSalt();
        const user = this.create({email, password});

        try{
             await this.save(user);
        }
       catch(error){
        if(error.code=== '23505'){
            throw new ConflictException('이미 존재하는 이메일입니다.');
        }
        else throw new InternalServerErrorException();
       }
    }
    
} 