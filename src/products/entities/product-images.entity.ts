import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({ name: "product_images" })
export class ProductImages {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "url", length: 100, nullable: false })
    url: string;

    @Column({ name: "description", length: 200, nullable: false })
    description: string;

    @ManyToOne(() => Product, (product => product.images), { orphanedRowAction: 'delete', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    product: Product;

}