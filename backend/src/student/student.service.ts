import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Students } from '../Entity/student.entity';
import { CreateStudentDto } from 'src/DTO/create-student.dto';
import { UpdateStudentDto } from 'src/DTO/update-student.dto';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Students)
        private readonly studentRepository: Repository<Students>
    ) {}

    async getAllStudents(){
        return await this.studentRepository.find();
    }

    async getOneStudent(id: number){
        const student = await this.studentRepository.findOne({where : {id}});
        if (student){
            return student;
        }else{
            throw new HttpException('Student not found', HttpStatus.BAD_REQUEST);
        }
    }

    async createStudent(createStudentDto: CreateStudentDto): Promise<Students> {
        if (await this.isEmailUnique(createStudentDto.email)){
            return this.studentRepository.save(createStudentDto);
        }
        throw new HttpException('this email is already used, choose another one!', HttpStatus.BAD_REQUEST);
    }

    async updateStudent(id: number, student: UpdateStudentDto) :Promise<Students>{
        const updatedStudent = await this.studentRepository.update(id, student);
        if(updatedStudent.affected === 0){
            throw new HttpException('Student not found', HttpStatus.BAD_REQUEST);
        }
        return await this.studentRepository.findOne({where : {id}});
    }

    async removeStudent(id: number){
        const deletedStudent = await this.studentRepository.delete(id);
        if(deletedStudent.affected === 0){
            throw new HttpException('Student not found', HttpStatus.BAD_REQUEST);
        }
        return deletedStudent; 
    }

    async isEmailUnique(email: string): Promise<boolean>{
        const student = await this.studentRepository.findOne({where : {email}});
        return !student;
    }
}
