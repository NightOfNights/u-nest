import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { users as UserModel, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserByEmail(
    where: Prisma.usersWhereUniqueInput,
  ): Promise<UserModel> {
    return this.prisma.users.findUnique({ where });
  }

  async createUser(data: Prisma.usersCreateInput): Promise<UserModel> {
    return this.prisma.users.create({ data });
  }

  async swapRolesForAdmin(params: {
    where?: Prisma.usersWhereUniqueInput;
    data: Prisma.usersUpdateInput;
  }): Promise<UserModel> {
    const { data, where } = params;
    return this.prisma.users.update({ data, where });
  }
}
