import { Controller, Get, Param, Post, Body, Put, Query } from '@nestjs/common';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { users as UserModel } from '@prisma/client';
import { UsersService } from './users.service';

class UserInfo {
  id: number;
  role: string;
}

class UserBody {
  @ApiProperty({
    description: 'User email',
  })
  email: string;

  @ApiProperty({
    description: 'User role',
    default: 'user',
  })
  role: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<UserInfo> {
    const user = await this.usersService.getUserByEmail({ email });

    if (user) {
      return { id: user.id, role: user.role };
    } else {
      return this.usersService
        .createUser({ email, role: 'user' })
        .then(() => this.usersService.getUserByEmail({ email }));
    }
  }

  @Post()
  async createUser(@Body() body: UserBody): Promise<UserModel> {
    const { email, role } = body;
    return this.usersService.createUser({
      email,
      role,
    });
  }

  @Put('/admin')
  @ApiQuery({ name: 'role' })
  async swapRolesForAdmin(@Query('role') role: string): Promise<UserModel> {
    return this.usersService.swapRolesForAdmin({
      where: {
        id: 1,
      },
      data: {
        email: 'lexade1802@gmail.com',
        role,
      },
    });
  }
}
