import { Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {

  @PrimaryGeneratedColumn({
    name: "id_user"
  })
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;
};