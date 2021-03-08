import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { products as ProductsModel } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<ProductsModel[]> {
    return this.productsService.products({});
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string): Promise<ProductsModel> {
    return this.productsService.product({ id: Number(id) });
  }
}
