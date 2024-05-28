import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import { RrgisterUserDto } from 'src/DTO/registerUser.dto';
import * as bcrypt from 'bcryptjs';
import { UserLoginDto } from 'src/DTO/userLogin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private authRepository: Repository<UserEntity>,
        private jwt: JwtService
    ){}

    async registerUser(registerDto: RrgisterUserDto){
        const {username, password} = registerDto;
        const hashed = await bcrypt.hashSync(password, 12);

        const user = new UserEntity();
        user.username = username;
        user.password = hashed;

        try{
            return this.authRepository.save(user);
        }catch(err){
            throw new InternalServerErrorException('something went wrong, user was not created');
        }
        
    }

    async loginUser(userLoginDto: UserLoginDto): Promise<{ token: string }>{
        const { username, password } = userLoginDto;
        const user = await this.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('Invalid username or password');
        }
    
        const payload = { username: user.username, sub: user.id };
        const token = this.jwt.sign(payload);
        return { token };
    }

    async validateUser(username: string, password: string): Promise<UserEntity | null> {
        const user = await this.authRepository.findOne({ where: { username } });
        if (user && await bcrypt.compare(password, user.password)) {
          return user;
        }
        return null;
    }
}
