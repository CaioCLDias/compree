import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({ name: "product_characteristics" })
export class ProductCharacteristics {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "name", length: 100, nullable: false })
    name: string;

    @Column({ name: "description", length: 200, nullable: false })
    description: string;

    @ManyToOne(() => Product, (product => product.characteristics), { orphanedRowAction: 'delete', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    product: Product;


}