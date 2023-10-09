import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductCharacteristics } from "./product-characteristics.entity";
import { ProductImages } from "./product-images.entity";
import { OrderItems } from "../../order/entities/order-items.entity";

@Entity({ name: "products" })
export class Product {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "name", length: 100, nullable: false })
    name: string;

    @Column({ name: "description", length: 100, nullable: false })
    description: string;

    @Column({ name: "price", nullable: false })
    price: number;

    @Column({ name: "quantity", nullable: false })
    quantity: number;

    @Column({ name: "category", nullable: true })
    category: string;

    @OneToMany(() => ProductCharacteristics, (productCharacteristics) => productCharacteristics.product, { cascade: true, eager: true })
    characteristics: ProductCharacteristics[];

    @OneToMany(() => ProductImages, (productImages) => productImages.product, { cascade: true, eager: true })
    images: ProductImages[];

    @OneToMany(() => OrderItems, (orderItens) => orderItens.product)
    orderItens: OrderItems[];

    @CreateDateColumn({ name: "created_at" })
    createdAt: string;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: string;

    @DeleteDateColumn({ name: "deleted_at" })
    deletedAt: string;

 
}
