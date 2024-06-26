import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/Entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtCustomStrategy } from './jwt.custom.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'dhijdjmoels656s',
      signOptions: {
        algorithm: 'HS512',
        expiresIn: '1d'
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    })
  ],
  providers: [AuthService,jwtCustomStrategy],
  controllers: [AuthController],
  exports: [PassportModule, jwtCustomStrategy]
})
export class AuthModule {}
