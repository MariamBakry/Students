import { Body, Controller, Post, Req, UseGuards, ValidationPipe, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RrgisterUserDto } from 'src/DTO/registerUser.dto';
import { UserLoginDto } from 'src/DTO/userLogin.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    registration(@Body(ValidationPipe) regDTO: RrgisterUserDto){
        return this.authService.registerUser(regDTO);
    }

    @Post('login')
    signin(@Body(ValidationPipe) loginDTO: UserLoginDto){
        return this.authService.loginUser(loginDTO)
    }

    @Post('logout')
    @UseGuards(AuthGuard('jwt'))
    async logout(@Headers() headers) {
        const authorization = headers.authorization;
        if (!authorization) {
        throw new UnauthorizedException('Missing authorization header');
        }
        const token = authorization.replace('Bearer ', '');
        return { message: 'Logout successful' };
    }
}
