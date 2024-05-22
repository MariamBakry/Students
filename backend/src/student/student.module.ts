import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Students } from '../Entity/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Students])],
  providers: [StudentService],
  controllers: [StudentController]
})
export class StudentModule {}
