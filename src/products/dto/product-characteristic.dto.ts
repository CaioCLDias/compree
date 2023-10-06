import { IsNotEmpty, IsString } from "class-validator";
import { Product } from "../entities/product.entity";

export class ProductCharacteristicsDTO {

    id: string;

    @IsString()
    @IsNotEmpty({ message: 'Nome da cadasterística não pode ser vazio' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
    description: string;

    product: Product;
}