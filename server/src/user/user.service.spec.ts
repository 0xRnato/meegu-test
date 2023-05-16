import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../database/prisma.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { cpf } from 'cpf-cnpj-validator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;
  let httpService: HttpService;

  const mockId = 1;
  const mockNameQuery = 'neto';
  const mockUpdateName = 'Updated Name';
  const mockUsers: User[] = [
    {
      id: 1,
      name: 'Renato Neto',
      birthdate: new Date('1995-10-27'),
      document: cpf.generate(),
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
      document: cpf.generate(),
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
      providers: [UserService, PrismaService],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    httpService = moduleRef.get<HttpService>(HttpService);
  });

  it('userService, prismaService and httpService should be defined', () => {
    expect(userService).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      // Arrange
      const mockZipcode = '12345678';
      const mockAddressData = {
        logradouro: 'Rua A',
        bairro: 'Bairro A',
        localidade: 'Cidade A',
        uf: 'Estado A',
      };
      const mockCreateUserDto: CreateUserDto = {
        name: 'Renato Neto',
        birthdate: new Date('1995-10-27'),
        document: cpf.generate(),
        zipcode: mockZipcode,
      };
      jest
        .spyOn(httpService.axiosRef, 'get')
        .mockResolvedValueOnce({ data: mockAddressData });
      jest.spyOn(prismaService.user, 'create').mockResolvedValueOnce({
        ...mockCreateUserDto,
        id: 1,
        acceptedTermsAndConditions: false,
        createdAt: new Date(),
        updatedAt: null,
        street: mockAddressData.logradouro,
        neighborhood: mockAddressData.bairro,
        city: mockAddressData.localidade,
        state: mockAddressData.uf,
      });

      // Act
      const result = await userService.create(mockCreateUserDto);

      // Assert
      expect(result).toBeDefined();
      expect(result).toEqual({
        ...mockCreateUserDto,
        id: 1,
        acceptedTermsAndConditions: false,
        createdAt: expect.any(Date),
        updatedAt: null,
        street: mockAddressData.logradouro,
        neighborhood: mockAddressData.bairro,
        city: mockAddressData.localidade,
        state: mockAddressData.uf,
      });
      expect(httpService.axiosRef.get).toHaveBeenCalledWith(
        `https://viacep.com.br/ws/${mockZipcode}/json/`,
      );
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          ...mockCreateUserDto,
          street: mockAddressData.logradouro,
          neighborhood: mockAddressData.bairro,
          city: mockAddressData.localidade,
          state: mockAddressData.uf,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return all users when no name is provided', async () => {
      // Arrange
      jest
        .spyOn(prismaService.user, 'findMany')
        .mockResolvedValueOnce(mockUsers);

      // Act
      const result = await userService.findAll();

      // Assert
      expect(result).toEqual(mockUsers);
      expect(prismaService.user.findMany).toHaveBeenCalledWith(undefined);
    });

    it('sould return matching users when a name is provided', async () => {
      // Arrange
      jest
        .spyOn(prismaService.user, 'findMany')
        .mockResolvedValueOnce([mockUsers[0]]);

      // Act
      const result = await userService.findAll(mockNameQuery);

      // Assert
      expect(result).toEqual([mockUsers[0]]);
      expect(prismaService.user.findMany).toHaveBeenCalledWith({
        where: {
          name: {
            contains: mockNameQuery,
          },
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return null if user with given id is not found', async () => {
      // Arrange
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);

      // Act
      const result = await userService.findOne(mockId);

      // Assert
      expect(result).toBeNull();
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: {
          id: mockId,
        },
      });
    });

    it('should return the use with the given id', async () => {
      // Arrange
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValueOnce(mockUsers[0]);

      // Act
      const result = await userService.findOne(mockId);

      // Assert
      expect(result).toEqual(mockUsers[0]);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: {
          id: mockId,
        },
      });
    });
  });

  describe('update', () => {
    it('should update user with given id', async () => {
      // Arrange
      jest.spyOn(prismaService.user, 'update').mockResolvedValueOnce({
        ...mockUsers[0],
        name: mockUpdateName,
        updatedAt: new Date(),
      });

      // Act
      const result = await userService.update(mockId, {
        name: mockUpdateName,
      });

      // Assert
      expect(result).toEqual({
        ...mockUsers[0],
        name: mockUpdateName,
        updatedAt: expect.any(Date),
      });
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: {
          id: mockId,
        },
        data: {
          name: mockUpdateName,
          updatedAt: expect.any(Date),
        },
      });
    });
  });

  describe('remove', () => {
    it('should remove a user by id', async () => {
      // Arrange
      jest
        .spyOn(prismaService.user, 'delete')
        .mockResolvedValueOnce(mockUsers[0]);

      // Act
      const result = await userService.remove(mockId);

      // Assert
      expect(result).toEqual(mockUsers[0]);
      expect(prismaService.user.delete).toHaveBeenCalledWith({
        where: {
          id: mockId,
        },
      });
    });
  });
});
