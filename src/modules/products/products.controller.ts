import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {

    await this.productsService.create(createProductDto);

    return { message: 'Produto cadastrado com sucesso '}
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    await this.productsService.update(id, updateProductDto);
    return {message: "Procuto atualizado com sucesso"}
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await  this.productsService.remove(id);

    return {message: 'Produto removido com sucesso'};
  }
}
