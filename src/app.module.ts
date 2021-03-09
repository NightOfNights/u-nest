import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, CartController],
  providers: [AppService, ProductsService, PrismaService, CartService],
})
export class AppModule {}
