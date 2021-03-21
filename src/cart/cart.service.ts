import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { cart as CartModel, Prisma } from '@prisma/client';

export type ProductInfoCartModel = {
  id: number;
  name: string;
  price: number;
  imageSrc: string;
  amount: number;
};

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async cartProduct(where: Prisma.cartWhereUniqueInput): Promise<CartModel> {
    return this.prisma.cart.findUnique({
      where,
    });
  }

  async cartWithProductsInfo(userId: number): Promise<ProductInfoCartModel[]> {
    return this.prisma.$queryRaw(
      `SELECT p.id, p.name, p.price, p."imageSrc", c.amount FROM products p JOIN cart c on p.id = c."productId" WHERE "userId" = ${userId}`,
    );
  }

  async createCartProduct(data: Prisma.cartCreateInput): Promise<CartModel> {
    return this.prisma.cart.create({ data });
  }

  async updateCart(params: {
    where?: Prisma.cartWhereUniqueInput;
    data: Prisma.cartUpdateInput;
  }): Promise<CartModel> {
    const { where, data } = params;
    return this.prisma.cart.update({
      data,
      where,
    });
  }

  async deleteCart(where: Prisma.cartWhereInput): Promise<Prisma.BatchPayload> {
    return this.prisma.cart.deleteMany({ where });
  }

  async deleteCartProduct(
    where: Prisma.cartWhereUniqueInput,
  ): Promise<CartModel> {
    return this.prisma.cart.delete({ where });
  }
}
