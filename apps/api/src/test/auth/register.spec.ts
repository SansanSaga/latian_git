import { prismaMock } from '../prisma';
import request from 'supertest';
import App from '@/app';
import { comparePassword, hashPassword } from '@/lib/bcrypt';
import { User } from '@prisma/client';

jest.mock('@/lib/bcrypt');

const requestBody = {
  name: 'mockUser',
  email: 'mock@mail.com',
  password: 'Admin123',
};

const user: User = {
  id: 1,
  name: 'Mock user',
  email: 'mock@mail.com',
  password: 'mockPassword',
  provider: 'CREDENTIALS',
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeAll(() => {
  //ini bakalan dijalankan sebelum testing dijalankan
  console.log("halo");
})

beforeEach(() => {
  //ini bakalan dijalankan sebelum setiap test dijalankan
})

afterEach(() => {
  //ini bakalan dijalankan setelah setiap test dijalankan
})

afterAll(() => {
  //ini bakalan dijalankan setelah semua test dijalankan
})

describe('POST /api/auth/register', () => {
  const { app } = new App();

  it('should register user succesfully', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null);

    (hashPassword as jest.Mock).mockResolvedValueOnce('hashedPassword');

    prismaMock.user.create.mockResolvedValueOnce(user);

    const response = await request(app)
      .post('/api/auth/register')
      .send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Register success');
    expect(response.body.newUser).toBeDefined();
  });

  it('should return error if email already exist', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(user);

    const response = await request(app)
      .post('/api/auth/register')
      .send(requestBody);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Email already exist');
  });
});
