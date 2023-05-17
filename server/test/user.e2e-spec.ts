import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/database/prisma.service';
import { TestPrismaService } from './test-prisma.service';
import { cpf } from 'cpf-cnpj-validator';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  let userId: string;
  const createUserData = {
    name: 'Renato Neto',
    birthdate: '1990-01-01',
    document: cpf.generate(),
    zipcode: '30130-010',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useClass(TestPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await prismaService.user.deleteMany();
    await prismaService.$disconnect();
    await app.close();
  });

  describe('/user (POST)', () => {
    it('should create a new user', async () => {
      const result = await request(app.getHttpServer())
        .post('/user')
        .send(createUserData)
        .expect(HttpStatus.CREATED);
      expect(result.body).toHaveProperty('success', true);
      expect(result.body.data).toHaveProperty('id');
      expect(result.body.data).toHaveProperty('name', createUserData.name);
      expect(result.body.data).toHaveProperty(
        'document',
        createUserData.document,
      );
      expect(result.body.data).toHaveProperty('createdAt');
      expect(!isNaN(Date.parse(result.body.data.createdAt))).toBe(true); // check if is a valid data string
      expect(result.body.data).toHaveProperty('updatedAt');
      expect(result.body.data.updatedAt).toBe(null);
      expect(result.body.data).toHaveProperty(
        'acceptedTermsAndConditions',
        false,
      );
      expect(result.body.data).toHaveProperty(
        'street',
        'Praça Sete de Setembro',
      );
      expect(result.body.data).toHaveProperty('neighborhood', 'Centro');
      expect(result.body.data).toHaveProperty('city', 'Belo Horizonte');
      expect(result.body.data).toHaveProperty('state', 'MG');
      userId = result.body.data.id;
    });

    it('should return a 400 Bad Request if the data is empty', async () => {
      const createUserData = {};
      const result = await request(app.getHttpServer())
        .post('/user')
        .send(createUserData)
        .expect(HttpStatus.BAD_REQUEST);
      expect(result.body).toHaveProperty('success', false);
      expect(result.body).toHaveProperty('errors', 'document is required');
    });

    it('should return a list of errors when sending just the document', async () => {
      const createUserData = {
        document: cpf.generate(),
      };
      const result = await request(app.getHttpServer())
        .post('/user')
        .send(createUserData)
        .expect(HttpStatus.BAD_REQUEST);
      expect(result.body).toHaveProperty('success', false);
      expect(result.body).toHaveProperty('errors');
      expect(result.body.errors.length).toBe(7);
    });

    it("should return a error if the user doesn't have a least 18yo", async () => {
      const createUserInvalidData = {
        ...createUserData,
        document: cpf.generate(),
        birthdate: '2010-01-01',
      };
      const result = await request(app.getHttpServer())
        .post('/user')
        .send(createUserInvalidData)
        .expect(HttpStatus.BAD_REQUEST);
      expect(result.body).toHaveProperty('success', false);
      expect(result.body).toHaveProperty('errors');
      expect(result.body.errors).toBe('User must be at least 18 years old');
    });
  });

  describe('/user (GET)', () => {
    it('should return a list of users', async () => {
      const result = await request(app.getHttpServer())
        .get('/user')
        .expect(HttpStatus.OK);
      expect(result.body).toHaveProperty('success', true);
      expect(result.body).toHaveProperty('data');
      expect(result.body.data.length).toBe(1);
      expect(result.body.data[0]).toHaveProperty('id');
    });

    it('should return a list of users filtered by name', async () => {
      const result = await request(app.getHttpServer())
        .get('/user?name=neto')
        .expect(HttpStatus.OK);
      expect(result.body).toHaveProperty('success', true);
      expect(result.body).toHaveProperty('data');
      expect(result.body.data.length).toBe(1);
      expect(result.body.data[0]).toHaveProperty('id');
      expect(result.body.data[0]).toHaveProperty('name', 'Renato Neto');
    });

    it('should return an empty list when the name is not found', async () => {
      const result = await request(app.getHttpServer())
        .get('/user?name=test')
        .expect(HttpStatus.OK);
      expect(result.body).toHaveProperty('success', true);
      expect(result.body).toHaveProperty('data');
      expect(result.body.data.length).toBe(0);
    });
  });

  describe('/user/:id (GET)', () => {
    it('should return a user by id', async () => {
      const result = await request(app.getHttpServer())
        .get(`/user/${userId}`)
        .expect(HttpStatus.OK);
      expect(result.body).toHaveProperty('success', true);
      expect(result.body).toHaveProperty('data');
      expect(result.body.data).toHaveProperty('id', userId);
      expect(result.body.data).toHaveProperty('name', 'Renato Neto');
    });

    it('should return error when id is not found', async () => {
      const result = await request(app.getHttpServer())
        .get(`/user/${userId + 1}`)
        .expect(HttpStatus.NOT_FOUND);
      expect(result.body).toHaveProperty('success', false);
      expect(result.body).toHaveProperty('errors');
      expect(result.body.errors).toBe('User not found');
    });
  });

  describe('/user/:id (PATCH)', () => {
    it('should return the updated user', async () => {
      const result = await request(app.getHttpServer())
        .patch(`/user/${userId}`)
        .send({ name: 'New Name' })
        .expect(HttpStatus.OK);
      expect(result.body).toHaveProperty('success', true);
      expect(result.body).toHaveProperty('data');
      expect(result.body.data).toHaveProperty('id', userId);
      expect(result.body.data).toHaveProperty('name', 'New Name');
      expect(result.body.data).toHaveProperty('updatedAt');
      expect(!isNaN(Date.parse(result.body.data.updatedAt))).toBe(true); // check if is a valid data string
    });

    it('should return error when id is not found', async () => {
      const result = await request(app.getHttpServer())
        .patch(`/user/${userId + 1}`)
        .send({ name: 'New Name' })
        .expect(HttpStatus.NOT_FOUND);
      expect(result.body).toHaveProperty('success', false);
      expect(result.body).toHaveProperty('errors');
      expect(result.body.errors).toBe('User not found');
    });

    it('should return error when trying to update with a invalid document and zipcode', async () => {
      const result = await request(app.getHttpServer())
        .patch(`/user/${userId}`)
        .send({
          document: '11111111111',
          zipcode: '11111111111',
        })
        .expect(HttpStatus.BAD_REQUEST);
      expect(result.body).toHaveProperty('success', false);
      expect(result.body).toHaveProperty('errors');
      expect(result.body.errors.length).toBe(2);
      expect(result.body.errors[0]).toBe('document must be a valid CPF');
      expect(result.body.errors[1]).toBe('zipcode must be a postal code');
    });

    it("should return a error if the user doesn't have a least 18yo", async () => {
      const result = await request(app.getHttpServer())
        .patch(`/user/${userId}`)
        .send({
          birthdate: '2010-01-01',
        })
        .expect(HttpStatus.BAD_REQUEST);
      expect(result.body).toHaveProperty('success', false);
      expect(result.body).toHaveProperty('errors');
      expect(result.body.errors).toBe('User must be at least 18 years old');
    });
  });

  describe('/user/:id (DELETE)', () => {
    it('should return error when trying to delete a user without the access-token header', async () => {
      const result = await request(app.getHttpServer())
        .delete(`/user/${userId}`)
        .expect(HttpStatus.UNAUTHORIZED);
      expect(result.body).toHaveProperty('success', false);
      expect(result.body).toHaveProperty('errors');
      expect(result.body.errors).toBe(
        'You do not have permission to access this resource',
      );
    });
    it('should delete a user with the access-token header', async () => {
      const result = await request(app.getHttpServer())
        .delete(`/user/${userId}`)
        .set('access-token', 'meegu')
        .expect(HttpStatus.OK);
      expect(result.body).toHaveProperty('success', true);
    });
    it('should return error when trying to delete a user with a invalid id', async () => {
      const result = await request(app.getHttpServer())
        .delete(`/user/${userId + 1}`)
        .set('access-token', 'meegu')
        .expect(HttpStatus.NOT_FOUND);
      expect(result.body).toHaveProperty('success', false);
      expect(result.body).toHaveProperty('errors');
      expect(result.body.errors).toBe('User not found');
    });
  });
});
