import { ClassSerializerInterceptor, Module, ConsoleLogger} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfigService } from './config/dg.config.service';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './modules/order/order.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExeptionFilter } from './resources/filters/exception-filter';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { LoggerGlobalInterceptor } from './resources/interceptors/logger-global.interceptor';


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
    CacheModule.registerAsync({
      useFactory: async () => ({
          store: await redisStore({ ttl: 10 * 1000}),
      }),
      isGlobal: true }),
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExeptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerGlobalInterceptor
    },
    ConsoleLogger,
  ]
})
export class AppModule { }
