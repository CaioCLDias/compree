import { Exclude } from "class-transformer";
import { Order } from "../../order/entities/order.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "name", length: 200, nullable: false })
    name: string;

    @Column({ name: "email", length: 100, nullable: false })
    email: string;

    @Exclude()
    @Column({ name: "password", length: 100, nullable: false })
    password: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: string;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: string;

    @DeleteDateColumn({ name: "deleted_at" })
    deletedAt: string;

    @OneToMany(()=> Order, (order)=> order.user)
    orders: Order[];

}
