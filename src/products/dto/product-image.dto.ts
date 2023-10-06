import { IsNotEmpty, IsString, IsUrl } from "class-validator";
import { Product } from "../entities/product.entity";

export class ProductImageDTO {

    id: string;
  
    @IsUrl()
    url: string;
  
    @IsString()
    @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
    description: string;
  
    product: Product;
  }