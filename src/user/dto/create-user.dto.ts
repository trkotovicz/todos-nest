import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(27)
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 8 })
  password: string;
}
