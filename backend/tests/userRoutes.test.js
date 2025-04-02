const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const userRoutes = require('../routes/userRoutes');
const User = require('../models/User');

jest.mock('../models/User');
jest.mock('bcrypt');

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

describe('POST /users/register', () => {
  it('should register a user with valid data', async () => {
    bcrypt.hash.mockResolvedValue('hashedPassword123');

    User.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({
        _id: 'mockUserId123',
        name: 'Test User',
        email: 'test@test.com',
        experienceLevel: 'Beginner',
      }),
    }));

    const res = await request(app).post('/users/register').send({
      name: 'Test User',
      email: 'test@test.com',
      password: 'password123',
      dateOfBirth: '1990-01-01',
      experienceLevel: 'Beginner',
      tosAccepted: 'true',
      privacyPolicyAccepted: 'true',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      _id: 'mockUserId123',
      name: 'Test User',
      email: 'test@test.com',
      experienceLevel: 'Beginner',
    });
  });
});
