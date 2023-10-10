import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderItemDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(
    @Query('userId') userId: string,
    @Body() orderDto: CreateOrderDto,
  ) {
    return this.orderService.createOrder(userId, orderDto);
  }

  @Get()
  async orderByuser(@Query('userId') userId: string) {

    const orders = await this.orderService.getOrderByUser(userId);

    return orders;

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  /* 
    
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.orderService.remove(+id);
    } */
}
