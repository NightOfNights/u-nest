import { Controller, Get, Param, Put, Delete } from '@nestjs/common';
import { cart as CartModel, Prisma } from '@prisma/client';
import { CartService } from './cart.service';
import { ProductInfoCartModel } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCartFull(): Promise<CartModel[]> {
    return this.cartService.cart();
  }

  @Get('/:userId')
  async getCart(
    @Param('userId') userId: string,
  ): Promise<ProductInfoCartModel[]> {
    return this.cartService.cartWithProductsInfo(Number(userId));
  }

  @Put('/:userId/product/:productId')
  async updateCart(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ): Promise<CartModel> {
    const productUserId = {
      productId: Number(productId),
      userId: Number(userId),
    };

    const cartProduct = await this.cartService.cartProduct({
      productId_userId: productUserId,
    });

    if (cartProduct) {
      return this.cartService.updateCart({
        where: {
          productId_userId: productUserId,
        },
        data: {
          amount: {
            set: cartProduct.amount + 1,
          },
        },
      });
    } else {
      return this.cartService.createCartProduct({
        products: { connect: { id: Number(productId) } },
        amount: 1,
        users: { connect: { id: Number(userId) } },
      });
    }
  }

  @Delete('/:userId')
  async deleteCart(
    @Param('userId') userId: string,
  ): Promise<Prisma.BatchPayload> {
    return this.cartService.deleteCart({ userId: Number(userId) });
  }

  @Delete('/:userId/product/:productId')
  async deleteCartProduct(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ): Promise<CartModel> {
    return this.cartService.deleteCartProduct({
      productId_userId: {
        productId: Number(productId),
        userId: Number(userId),
      },
    });
  }
}
