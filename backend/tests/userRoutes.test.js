const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const userRoutes = require('../routes/userRoutes');
const User = require('../models/User');

jest.mock('../models/User');
jest.mock('bcrypt');
jest.mock('../functions/authenticateToken', () => (req, res, next) => {
  req.user = { userId: '67ec8844b5a1f7729b6e6292' };
  next();
});

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

describe('POST /users/register', () => {
  it('should register a user with valid data', async () => {
    bcrypt.hash.mockResolvedValue('password');

    User.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({
        _id: '67ec8844b5a1f7729b6e6292',
        name: 'Test User',
        email: 'test@test.com',
        experienceLevel: 'Beginner',
      }),
    }));

    const res = await request(app).post('/users/register').send({
      name: 'Test User',
      email: 'test@test.com',
      password: 'password',
      dateOfBirth: '1990-01-01',
      experienceLevel: 'Beginner',
      tosAccepted: 'true',
      privacyPolicyAccepted: 'true',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      _id: '67ec8844b5a1f7729b6e6292',
      name: 'Test User',
      email: 'test@test.com',
      experienceLevel: 'Beginner',
    });
  });
});

const jwt = require('jsonwebtoken');
jest.mock('jsonwebtoken');

describe('POST /users/login', () => {
  it('should log in a user with valid credentials', async () => {
    const mockUser = {
      _id: '67ec8844b5a1f7729b6e6292',
      email: 'test@test.com',
      password: 'password',
      experienceLevel: 'Beginner',
    };

    User.findOne = jest.fn().mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('mockJwtToken');

    const res = await request(app).post('/users/login').send({
      email: 'test@test.com',
      password: 'password',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      token: 'mockJwtToken',
      userId: '67ec8844b5a1f7729b6e6292',
      experienceLevel: 'Beginner',
    });
  });
});

describe('GET /users/:userId/name', () => {
  it('should return the name of the user', async () => {
    User.findOne.mockResolvedValue({ name: 'Mock Name' });

    const res = await request(app).get('/users/67ec8844b5a1f7729b6e6292/name');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      name: 'Mock Name',
    });
  });
  
  it('should return 400 for an invalid userId format', async () => {
    const res = await request(app).get('/users/plymouth/name');
    expect(res.statusCode).toBe(400);
  });
});

describe('GET /users/:userId', () => {
  it('should return all user information', async () => {
    const mockUser = {
      _id: '67ec8844b5a1f7729b6e6292',
      name: 'Test User',
      email: 'test@test.com',
      experienceLevel: 'Beginner',
      dateOfBirth: '2004-04-23',
      tosAccepted: true,
      privacyPolicyAccepted: true,
      role: 'User',
    };
    User.findOne.mockResolvedValue(mockUser);
    const res = await request(app).get('/users/67ec8844b5a1f7729b6e6292');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockUser);
  });

  it 
});
