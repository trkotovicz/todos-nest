import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TodoEntity } from '../../todo/entity/todo.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty()
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', unique: true, nullable: false, length: 27 })
  username: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 127, nullable: false })
  password: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt?: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => TodoEntity, (todo) => todo.userId)
  todos: TodoEntity[];
}
