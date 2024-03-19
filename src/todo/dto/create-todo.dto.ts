import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTodoDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(63)
  task: string;

  @IsOptional()
  @IsString()
  @MaxLength(127)
  description: string;
}
