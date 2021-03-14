import { Controller, Get, Param, Put, Delete } from '@nestjs/common';
import { cart as CartModel } from '@prisma/client';
import { CartService } from './cart.service';
import { ProductInfoCartModel } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(): Promise<ProductInfoCartModel[]> {
    return this.cartService.cartWithProductsInfo();
  }

  @Put('/:id')
  async updateCart(@Param('id') id: string): Promise<CartModel> {
    const productUserId = { productId: Number(id), userId: 1 };

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
        products: { connect: { id: Number(id) } },
        amount: 1,
        users: { connect: { id: 1 } },
      });
    }
  }

  @Delete()
  async deleteCart() {
    return this.cartService.deleteCart();
  }

  @Delete('/:id')
  async deleteCartProduct(@Param('id') id: string): Promise<CartModel> {
    return this.cartService.deleteCartProduct({
      productId_userId: { productId: Number(id), userId: 1 },
    });
  }
}
