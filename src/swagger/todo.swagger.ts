import { ApiProperty } from '@nestjs/swagger';

export class TodoPayloadSwagger {
  @ApiProperty()
  task: string;

  @ApiProperty()
  description?: string;
}

export class TodoResponseSwagger {
  @ApiProperty()
  id: string;

  @ApiProperty()
  task: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date | null;
}
