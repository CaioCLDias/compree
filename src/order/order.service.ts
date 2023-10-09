import { Injectable } from '@nestjs/common';
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

    const user = await this.userRepository.findOneBy({ id: userId });

    const producIds = orderDto.orderItens.map((item) => item.productId)

    const orderProducts = await this.productRepository.findBy({id: In(producIds)})

    const order = new Order;

    order.stattus = OrderStatus.PROCESSING;
    order.user = user;

    const orderItens = orderDto.orderItens.map((item) => {

      const orderProduct = orderProducts.find(
        (product) => product.id === item.productId
      )

      const orderItem = new OrderItems();

      orderItem.product = orderProduct!;

      orderItem.salePrice = orderProduct!.price;

      orderItem.quantity = item.quantity;

      return orderItem;

    });


    const amount  = await orderItens.reduce((total, item) => {
      return total + item.salePrice * item.quantity;
    }, 0) 

    order.orderItens = orderItens

    order.amount = amount;

    const orderCreted = await this.orderRepository.save(order);

    return orderCreted;

  }

  async getOrderByUser(userId: string) {

    return this.orderRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        user: true,
      },
    });

  }


  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
