import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  //@MinLength(10)
  password: string;
}
