import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "../../products/entities/product.entity";

@Entity({name: "order_items"})
export class OrderItems{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: "quantity", nullable: false}) 
    quantity: number;

    @Column({name: "sale_price", nullable: false})
    salePrice: number;

    @ManyToOne(() => Order, (order) => order.orderItens,{
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    order: Order;

    @ManyToOne(() => Product, (product) => product.orderItens, {
        cascade: ['update']
    })
    product: Product;


}