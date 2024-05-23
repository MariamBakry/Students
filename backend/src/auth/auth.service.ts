import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import { RrgisterUserDto } from 'src/DTO/registerUser.dto';
import * as bcrypt from 'bcryptjs';
import { hash } from 'crypto';
import { UserLoginDto } from 'src/DTO/userLogin.dto';

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

    async loginUser(userLoginDto: UserLoginDto){
        const {username, password} = userLoginDto;
        const user = await this.authRepository.findOne({where: {username}});
        if(!user){
            throw new UnauthorizedException('Invalid credentials');
        }

        const salt = user.salt;
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(isPasswordMatch){
            return {message: 'Logged in'};
        }else{
            throw new UnauthorizedException('Invalid credentials');
        }
    }
}
