import { ApiProperty } from '@nestjs/swagger';

export class AuthPayloadSwagger {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class AuthResponseSwagger {
  @ApiProperty()
  accessToken: string;
}

export class AuthMeResponseSwagger {
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
