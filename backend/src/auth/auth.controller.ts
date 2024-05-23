import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RrgisterUserDto } from 'src/DTO/registerUser.dto';
import { UserLoginDto } from 'src/DTO/userLogin.dto';

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
}
