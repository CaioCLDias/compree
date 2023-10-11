
import { IsEnum } from "class-validator";
import { OrderStatus } from "../enum/order-status.enum";

export class UpdateOrderDto {
   
    @IsEnum(OrderStatus)
    status: OrderStatus;

}
