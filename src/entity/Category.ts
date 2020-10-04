import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity('categories')
export class Category extends BaseEntity{

    @PrimaryGeneratedColumn({
      name: "id_category"
    })
    id!: number;

    @Column()
    name!: string;
}