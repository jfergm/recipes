import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Category } from './Category'

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

  @ManyToOne(type => Category, category => category)
  @JoinColumn({name: "category_id"})
  category!: number;

  @ManyToOne(type => User)
  @JoinColumn({
    name: "user_id"
  })
  user!: number

};