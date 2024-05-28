import { IsNotEmpty, IsEmail, IsOptional} from "class-validator";
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

export class CreateStudentDto{
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email address'})
    email: string;

    @IsEnum(Gender, { message: 'Gender must be either "male" or "female"' })
    gender: Gender;

    @IsEnum(Country, { message: 'Wrong country input' })
    country: Country;

    @IsEnum(Status, { message: 'Status must be either "Active" or "InActive"'})
    status: Status;

    @IsNotEmpty()
    birthDate: Date;

}