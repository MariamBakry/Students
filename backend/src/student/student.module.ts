import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Students } from '../Entity/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Students]), AuthModule],
  providers: [StudentService],
  controllers: [StudentController]
})
export class StudentModule {}
