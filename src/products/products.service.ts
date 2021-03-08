import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { products as ProductModel, Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async product(
    productWhereUniqueInput: Prisma.productsWhereUniqueInput,
  ): Promise<ProductModel> {
    return this.prisma.products.findUnique({
      where: productWhereUniqueInput,
    });
  }

  async products(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.productsWhereUniqueInput;
    where?: Prisma.productsWhereInput;
    orderBy?: Prisma.productsOrderByInput;
  }): Promise<ProductModel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.products.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
