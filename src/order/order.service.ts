import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, OrderItemDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { OrderStatus } from './enum/order-status.enum';
import { OrderItems } from './entities/order-items.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) { }

  async createOrder(userId: string, orderDto: CreateOrderDto) {

    const user = await this.getUSer(userId);

    const producIds = orderDto.orderItens.map((item) => item.productId)

    const orderProducts = await this.productRepository.findBy({ id: In(producIds) })

    const order = new Order;

    order.stattus = OrderStatus.PROCESSING;
    order.user = user;

    const orderItens = orderDto.orderItens.map((item) => {

      const orderProduct = orderProducts.find(
        (product) => product.id === item.productId
      );

      this.validateOrder(orderDto, orderProducts);

      const orderItem = new OrderItems();

      orderItem.product = orderProduct!;

      orderItem.salePrice = orderProduct!.price;

      orderItem.quantity = item.quantity;

      return orderItem;

    });


    const amount = await orderItens.reduce((total, item) => {
      return total + item.salePrice * item.quantity;
    }, 0)

    order.orderItens = orderItens

    order.amount = amount;

    const orderCreted = await this.orderRepository.save(order);

    return orderCreted;

  }

  async getOrderByUser(userId: string) {

    const user = this.getUSer(userId);

    return this.orderRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        user: true,
      },
    });

  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {

    const order = await this.orderRepository.findOneBy({ id });

    if (order === null){

      throw new NotFoundException('Pedido não encontrado');

    }

    Object.assign(order, updateOrderDto);

    return this.orderRepository.save(order);

  }
  
  private async getUSer(id) {

    const user = await this.userRepository.findOneBy({ id });

    if (user === null) {
      throw new NotFoundException('O usuário não foi encontrado');
    }

    return user;
  }

  private validateOrder(orderDto: CreateOrderDto, orderProducts: Product[]){

    orderDto.orderItens.forEach((item) => { 

      const orderProduct = orderProducts.find(
        (product) => product.id === item.productId
      );

      if (orderProduct === undefined){
        throw new NotFoundException(`O produto com id ${item.productId}, não foi encontrado`);
      }

      if (orderProduct.quantity > item.quantity){
        throw new BadRequestException(`A quantidade solicitada (${item.quantity}) é maior do que a disponível (${item.quantity})`);
      }

    });
  }

}
