import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../database/prisma.service';
import { Prisma, User } from '@prisma/client';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { zipcode } = createUserDto;
    const { data: addressData } = await this.httpService.axiosRef.get(
      `https://viacep.com.br/ws/${zipcode}/json/`,
    );
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        birthdate: new Date(createUserDto.birthdate),
        street: addressData.logradouro,
        neighborhood: addressData.bairro,
        city: addressData.localidade,
        state: addressData.uf,
      },
    });
  }

  findAll(name?: string): Promise<User[]> {
    const query: Prisma.UserFindManyArgs = name
      ? {
          where: {
            name: {
              contains: name,
            },
          },
        }
      : undefined;
    return this.prisma.user.findMany(query);
  }

  findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const data = {
      ...updateUserDto,
      updatedAt: new Date(),
    };
    if (updateUserDto.birthdate) {
      data.birthdate = new Date(updateUserDto.birthdate);
    }
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  remove(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
