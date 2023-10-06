import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';
import { ProductCharacteristicsDTO } from './product-characteristic.dto';
import { ProductImageDTO } from './product-image.dto';

export class UpdateProductDto {

    @IsUUID(undefined, { message: 'ID do produto inválido' })
    id: string;
  
    @IsUUID(undefined, { message: 'ID de usuário inválido' })
    userId: string;
  
    @IsString()
    @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
    @IsOptional()
    name: string;
  
    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @IsOptional()
    @Min(1, { message: 'O valor precisa ser maior que zero' })
    @IsOptional()
    price: number;
  
    @IsNumber()
    @Min(0, { message: 'Quantidade mínima inválida' })
    @IsOptional()
    quantity: number;
  
    @IsString()
    @IsOptional()
    description: string;
  
    @IsString()
    @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
    @IsOptional()
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
