import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderStatus } from "../enum/order-status.enum";
import { User } from "../../users/entities/user.entity";
import { OrderItems } from "./order-items.entity";

@Entity({name: "orders"})
export class Order {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({name: "amount", nullable: false})
    amount: number;

    @Column({name: "stats", enum: OrderStatus, nullable: false})
    stattus: OrderStatus;

    @CreateDateColumn({name: "created_at"})
    createdAt: string;

    @UpdateDateColumn({name: "updated_at"})
    updatedAt: string;

    @DeleteDateColumn({name: "deleted_at"})
    deletedAt: string;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @OneToMany(() => OrderItems, (orderItems) => orderItems.order, {
        cascade: true, eager: true
    })
    orderItens: OrderItems[];

}
