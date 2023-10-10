import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ListProductDTO } from './dto/list-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>
  ){}

  async create(productDTO: CreateProductDto) {
    const product = new Product();

    product.name = productDTO.name;
    product.description = productDTO.description;
    product.price = productDTO.price;
    product.quantity = productDTO.quantity;
    product.characteristics = productDTO.characteristics;
    product.images = productDTO.images;

    await this.repository.save(product)
    
  }

  async findAll() {
    const products = await this.repository.find({
      relations: {
        characteristics: true,
        images: true,
      },
    });
    const productList = products.map(
      (product) => new ListProductDTO(
        product.id, 
        product.name,
        product.characteristics,
        product.images
        )
    );

    return productList;
  }


  findOne(id: string) {
    return this.repository.findBy({id: id});
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    return this.repository.update(id, updateProductDto)
    
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}
