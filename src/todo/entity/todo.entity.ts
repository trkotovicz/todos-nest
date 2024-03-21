import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'todos' })
export class TodoEntity {
  @ApiProperty()
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', unique: true, nullable: false, length: 63 })
  task: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 127, default: null })
  description: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.todos)
  userId: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt?: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt?: Date;
}
