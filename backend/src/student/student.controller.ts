import { Controller, Get, Post, Body, Param, Put, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { Students } from '../Entity/student.entity';
import { CreateStudentDto } from 'src/DTO/create-student.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateStatement } from 'typeorm';
import { UpdateStudentDto } from 'src/DTO/update-student.dto';

@Controller('students')
@UseGuards(AuthGuard('jwt'))
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Get()
    getAllStudents(){
        return this.studentService.getAllStudents();
    }

    @Get(':id')
    getOneStudent(@Param('id') id: number){
        return this.studentService.getOneStudent(+id);
    }

    @Post()
    createStudent(@Body(ValidationPipe) student: CreateStudentDto){
        return this.studentService.createStudent(student);
    }

    @Put(':id')
    updateStudent(@Param('id') id: number, @Body() student: UpdateStudentDto){
        return this.studentService.updateStudent(+id, student);
    }

    @Delete(':id')
    removeStudent(@Param('id') id: number){
        return this.studentService.removeStudent(+id);
    }
}
