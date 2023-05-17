import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../database/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { cpf } from 'cpf-cnpj-validator';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockId = '1';
  const mockNameQuery = 'neto';
  const mockUpdateName = 'Updated Name';
  const mockUsers: User[] = [
    {
      id: 1,
      name: 'Renato Neto',
      birthdate: new Date('1995-10-27'),
      document: cpf.format(cpf.generate()),
      acceptedTermsAndConditions: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      street: 'Rua A',
      neighborhood: 'Bairro A',
      city: 'Cidade A',
      state: 'Estado A',
      zipcode: '12345',
    },
    {
      id: 2,
      name: 'João Paulo',
      birthdate: new Date('1995-01-01'),
      document: cpf.format(cpf.generate()),
      acceptedTermsAndConditions: false,
      createdAt: new Date(),
      updatedAt: null,
      street: 'Rua B',
      neighborhood: 'Bairro B',
      city: 'Cidade B',
      state: 'Estado B',
      zipcode: '54321',
    },
  ];

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
  });

  it('userController and userService should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    const mockUser: CreateUserDto = {
      name: mockUsers[1].name,
      birthdate: mockUsers[1].birthdate,
      document: mockUsers[1].document,
      zipcode: mockUsers[1].zipcode,
    };
    it('should create a new user and return success', async () => {
      jest.spyOn(userService, 'create').mockResolvedValue(mockUsers[1]);

      const result = await userController.create(mockUser);
      expect(userService.create).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual({ success: true, data: mockUsers[1] });
    });

    it('should throw a BadRequestException if the user is invalid', async () => {
      const error = new Error('Invalid User data');
      jest.spyOn(userService, 'create').mockRejectedValue(error);
      await expect(userController.create(mockUser)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(userService, 'findAll').mockResolvedValue(mockUsers);
      const result = await userController.findAll();
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockUsers);
    });

    it('should return an array of users filtered by name', async () => {
      jest.spyOn(userService, 'findAll').mockResolvedValue([mockUsers[0]]);
      const result = await userController.findAll(mockNameQuery);
      expect(result.success).toBe(true);
      expect(result.data).toEqual([mockUsers[0]]);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(mockUsers[0]);
      const result = await userController.findOne(+mockId);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockUsers[0]);
    });

    it('should throw an error if the user is not found', async () => {
      const error = new Error('User not found');
      jest.spyOn(userService, 'findOne').mockRejectedValue(error);
      await expect(userController.findOne(999999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(mockUsers[0]);
      jest.spyOn(userService, 'update').mockResolvedValue({
        ...mockUsers[0],
        name: mockUpdateName,
        updatedAt: expect.any(Date),
      });
      const result = await userController.update(+mockId, {
        name: mockUpdateName,
      });
      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        ...mockUsers[0],
        name: mockUpdateName,
        updatedAt: expect.any(Date),
      });
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(mockUsers[0]);
      jest.spyOn(userService, 'remove').mockResolvedValue(mockUsers[0]);
      const result = await userController.remove(+mockId);
      expect(result.success).toBe(true);
      expect(result.data).not.toBeDefined();
    });
  });
});
