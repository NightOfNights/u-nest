import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    CartController,
    UsersController,
  ],
  providers: [
    AppService,
    ProductsService,
    PrismaService,
    CartService,
    UsersService,
  ],
})
export class AppModule {}
