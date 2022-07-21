import { IsEmail, IsNotEmpty, Length, Min, validate, validateOrReject } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @Length(4, 50)
    password: string;

    constructor(username: string, email: string, password: string){
        this.username = username;
        this.email = email;
        this.password = password;   
    }

}