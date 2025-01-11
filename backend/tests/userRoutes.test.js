const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const userRoutes = require('../routes/userRoutes');
const app = express();
app.use(express.json());
app.use('/users', userRoutes);

jest.mock('../models/User');

describe('User Routes', () => {
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/op_comp3000_test`;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /users/register', () => {
    it('should register a new user', async () => {
      const newUser = {
        name: 'Test Test',
        email: 'test@test.com',
        password: 'password',
        role: 'individual',
        dateOfBirth: '2000-01-01'
      };

      User.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(newUser)
      }));

      const res = await request(app).post('/users/register').send(newUser);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('name', 'Test Test');
    });
  });
});