import { IsNotEmpty, IsEmail, IsOptional, IsString} from "class-validator";
import { IsEnum } from 'class-validator';

enum Gender {
  Male = 'Male',
  Female = 'Female'
}

enum Status{
    ACTIVE = 'Active',
    INACTIVE = 'InActive'
}
  
enum Country {
    CAIRO = 'Cairo',
    ALEXANDRIA = 'Alexandria',
    GIZA = 'Giza',
    LUXOR = 'Luxor',
    ASWAN = 'Aswan',
    OTHER = 'Other'
}

export class UpdateStudentDto{
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email address'})
    email: string;

    @IsOptional()
    @IsNotEmpty()
    @IsEnum(Gender, { message: 'Gender must be either "male" or "female"' })
    gender: Gender;

    @IsOptional()
    @IsNotEmpty()
    @IsEnum(Country, { message: 'Wrong country input' })
    country: Country;

    @IsOptional()
    @IsNotEmpty()
    @IsEnum(Status, { message: 'Status must be either "Active" or "InActive"'})
    status: Status;

    @IsOptional()
    @IsNotEmpty()
    @IsNotEmpty()
    birthDate: Date;

}