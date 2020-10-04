import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity('categories')
export class Category extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;
}