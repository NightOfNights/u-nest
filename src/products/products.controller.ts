import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Res,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { products as ProductModel } from '@prisma/client';
import { Response } from 'express';
import { ApiProperty } from '@nestjs/swagger';
class productBody {
  @ApiProperty({
    description: 'Product name',
    default: 'Cat10',
  })
  name: string;

  @ApiProperty({
    description: 'Product price',
    minimum: 0,
    default: 0.99,
  })
  price: number;

  @ApiProperty({
    description: 'Product rating',
    minimum: 0,
    default: 5,
  })
  rating: number;

  @ApiProperty({
    description: 'Product description',
    default: 'Good cat',
  })
  description: string;

  @ApiProperty({
    description: 'Product image source',
    default:
      'https://i.pinimg.com/736x/2b/47/18/2b4718827a37b6f11dc82e939984c571.jpg',
  })
  imageSrc: string;
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<ProductModel[]> {
    return this.productsService.products({});
  }

  @Get('/:id')
  async getProductById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    const product = await this.productsService.product({ id: Number(id) });
    console.log(product);

    if (product) {
      res.status(HttpStatus.OK).json(product);
    } else {
      res.status(HttpStatus.NOT_FOUND).send({ error: 'No product' });
    }
  }

  @Post()
  async createProduct(
    @Body()
    body: productBody,
  ): Promise<ProductModel> {
    const { name, price, rating, description, imageSrc } = body;
    return this.productsService.createProduct({
      name,
      price,
      rating,
      description,
      imageSrc,
    });
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string): Promise<ProductModel> {
    return this.productsService.deleteProduct({ id: Number(id) });
  }
}
