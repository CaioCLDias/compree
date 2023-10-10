import { Injectable, NotFoundException } from '@nestjs/common';
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
  ) { }

  async create(productDTO: CreateProductDto) {
    const product = new Product();

    Object.assign(product, productDTO as Product);

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


  async findOne(id: string) {
    const product = await this.repository.findBy({ id: id });

    if (product === null) {
      throw new NotFoundException('Produto não encontrado')
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    const product = await this.repository.findBy({ id })

    if (product === null) {
      throw new NotFoundException('Produto não encontrado')
    }

    Object.assign(id, updateProductDto)

    await this.repository.save(updateProductDto)

  }

  async remove(id: string) {
    const product = await this.repository.findBy({ id })

    if (product === null) {
      throw new NotFoundException('Produto não encontrado')
    }

    return this.repository.delete(id);
  }
}
