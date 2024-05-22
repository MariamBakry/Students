import { Controller, Get, Post, Body, Param, Put, Delete, ValidationPipe } from '@nestjs/common';
import { StudentService } from './student.service';
import { Students } from '../Entity/student.entity';
import { CreateStudentDto } from 'src/DTO/create-student.dto';

@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Get()
    getAllStudents(){
        return this.studentService.getAllStudents();
    }

    @Get(':id')
    getOneStudent(@Param('id') id: string){
        return this.studentService.getOneStudent(+id);
    }

    @Post()
    createStudent(@Body(ValidationPipe) student: CreateStudentDto){
        return this.studentService.createStudent(student);
    }

    @Put(':id')
    updateStudent(@Param('id') id: string, @Body() student: Students){
        return this.studentService.updateStudent(+id, student);
    }

    @Delete(':id')
    removeStudent(@Param('id') id: string){
        return this.studentService.removeStudent(+id);
    }
}
