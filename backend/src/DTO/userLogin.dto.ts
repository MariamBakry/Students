import { IsNotEmpty, isString} from "class-validator";

export class UserLoginDto{
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    id:number;
}