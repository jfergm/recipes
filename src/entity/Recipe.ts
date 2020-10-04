import { Entity, PrimaryGeneratedColumn, Column, BaseEntity  } from 'typeorm';

@Entity('recipes')
export class Recipe extends BaseEntity {

  @PrimaryGeneratedColumn({
    name: "id_recipe"
  })
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column('simple-array')  
  ingredients!: string[];

  @Column({
    name: "category_id"
  })
  category!: number;

  @Column({
    name: "user_id"
  })
  user!: number

};