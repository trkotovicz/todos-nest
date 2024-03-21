import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTodoDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(63)
  task: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(127)
  description: string;
}
