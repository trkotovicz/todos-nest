import { ApiProperty } from '@nestjs/swagger';

export class UserPayloadSwagger {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class UserResponseSwagger {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date | null;
}
