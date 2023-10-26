import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderItemDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { RequestUser } from '../authentication/auth.guard';

@Controller('/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(
    @Req() req: RequestUser,
    @Body() orderDto: CreateOrderDto,
  ) {

    const userId = req.user.id;

    return this.orderService.createOrder(userId, orderDto);

  }

  @Get()
  async orderByuser(@Req() req: RequestUser) {

    const userId = req.user.id;

    const orders = await this.orderService.getOrderByUser(userId);

    return orders;

  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateOrderDto: UpdateOrderDto,
    @Req() req: RequestUser,
    ) {
    
    const userId = req.user.id;

    return this.orderService.update(id, updateOrderDto, userId);
  }

  /* 
    
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.orderService.remove(+id);
    } */
}
