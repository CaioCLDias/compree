import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfigService } from './config/dg.config.service';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './modules/order/order.module';
import { APP_FILTER } from '@nestjs/core';
import { ExeptionFilter } from './resources/filters/exception-filter';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: DBConfigService,
      inject: [DBConfigService],
    }),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExeptionFilter
    }
  ],
})
export class AppModule { }
