import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength, Min, ValidateNested } from "class-validator";
import { ProductCharacteristics } from "../entities/product-characteristics.entity";
import { ProductImages } from "../entities/product-images.entity";
import { ProductCharacteristicsDTO } from "./product-characteristic.dto";
import { ProductImageDTO } from "./product-image.dto";

export class CreateProductDto {
  
    @IsString()
    @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
    name: string;
  
    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(1, { message: 'O valor precisa ser maior que zero' })
    price: number;
  
    @IsNumber()
    @Min(0, { message: 'Quantidade mínima inválida' })
    quantity: number;
  
    @IsString()
    @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia ' })
    @MaxLength(1000, {
      message: 'Descrição não pode ter mais que 1000 caracteres',
    })
    description: string;

  
    @IsString()
    @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
    category: string;

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(3)
    @Type(() => ProductCharacteristicsDTO)
    characteristics: ProductCharacteristicsDTO[];
  
    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => ProductImageDTO)
    images: ProductImageDTO[];
}
