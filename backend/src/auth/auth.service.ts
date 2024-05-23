import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import { RrgisterUserDto } from 'src/DTO/registerUser.dto';
import * as bcrypt from 'bcryptjs';
import { hash } from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private authRepository: Repository<UserEntity>
    ){}

    async registerUser(registorDto: RrgisterUserDto){
        const {username, password} = registorDto;
        const hashed = await bcrypt.hashSync(password, 12);
        const salt = await bcrypt.getSalt(hashed);

        const user = new UserEntity();
        user.username = username;
        user.password = hashed;
        user.salt = salt;

        this.authRepository.create(user);
        try{
            return this.authRepository.save(user);
        }catch(err){
            throw new InternalServerErrorException('something went wrong, user was not created');
        }
        
    }
}
