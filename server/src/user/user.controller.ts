import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../util/auth.guard';
import { ValidationPipe } from '../util/validation.pipe';
import { User } from '@prisma/client';
import IResponse from '../util/response.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body(new ValidationPipe(18)) createUserDto: CreateUserDto,
  ): Promise<IResponse<User>> {
    try {
      const result = await this.userService.create(createUserDto);
      return { success: true, data: result };
    } catch (error) {
      throw new BadRequestException({ success: false, errors: error.message });
    }
  }

  @Get()
  async findAll(@Query('name') name?: string): Promise<IResponse<User[]>> {
    try {
      const result = await this.userService.findAll(name);
      return { success: true, data: result };
    } catch (error) {
      throw new BadRequestException({ success: false, errors: error.message });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse<User>> {
    try {
      const result = await this.userService.findOne(+id);
      if (!!result) return { success: true, data: result };
      else throw new Error('User not found');
    } catch (error) {
      throw new NotFoundException({ success: false, errors: error.message });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe(18)) updateUserDto: UpdateUserDto,
  ): Promise<IResponse<User>> {
    try {
      const checkUser = await this.userService.findOne(+id);
      if (!!checkUser) {
        const result = await this.userService.update(+id, updateUserDto);
        return { success: true, data: result };
      } else throw new Error('User not found');
    } catch (error) {
      throw new NotFoundException({ success: false, errors: error.message });
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponse<null>> {
    try {
      const checkUser = await this.userService.findOne(+id);
      if (!!checkUser) {
        await this.userService.remove(+id);
        return { success: true };
      } else throw new Error('User not found');
    } catch (error) {
      throw new NotFoundException({ success: false, errors: error.message });
    }
  }
}
