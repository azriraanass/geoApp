import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from "class-validator";

export class RegisterRequestDto {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsAlphanumeric()
  phoneNumber: string;
  @MinLength(4)
  password: string;
}
