import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(27)
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsStrongPassword({ minLength: 8 })
  password: string;
}
