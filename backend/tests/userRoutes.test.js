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

  it('should return 400 for invalid data', async () => {
    User.findOne = jest.fn().mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('password');

    const res = await request(app).post('/users/register').send({
      name: 'Test User',
      email: 'invalid-email', // intentionally invalid
      password: 'password',
      dateOfBirth: '1990-01-01',
      experienceLevel: 'Beginner',
      tosAccepted: 'true',
      privacyPolicyAccepted: 'true',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: 'Invalid email format.',
          location: 'body',
        }),
      ])
    );
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

  it('should return 400 for invalid credentials', async () => {
    User.findOne = jest.fn().mockResolvedValue(null); // simulate user not found
  
    const res = await request(app).post('/users/login').send({
      email: 'incorrect@user.com',
      password: 'wrongpassword',
    });
  
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "Invalid credentials provided." });
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
});

describe('PUT /users/updatepassword', () => {
  it('should update the password if currentPassword is correct', async () => {
    const mockUser = {
      _id: '67ec8844b5a1f7729b6e6292',
      password: 'hashedOldPassword',
      save: jest.fn(),
    };

    User.findOne = jest.fn().mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    bcrypt.hash.mockResolvedValue('hashedNewPassword');

    const res = await request(app).put('/users/updatepassword').send({
      currentPassword: 'oldPassword',
      newPassword: 'newSecurePassword',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Password updated successfully." });
    expect(mockUser.password).toBe('hashedNewPassword');
    expect(mockUser.save).toHaveBeenCalled();
  });

  it('should return 400 if current password is incorrect', async () => {
    User.findOne = jest.fn().mockResolvedValue({ password: 'hashedPass' });
    bcrypt.compare.mockResolvedValue(false);

    const res = await request(app).put('/users/updatepassword').send({
      currentPassword: 'wrong',
      newPassword: 'newPassword',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Incorrect current password.");
  });
});

describe('GET /users/progress', () => {
  it('should return user progress', async () => {
    const mockSelect = jest.fn().mockResolvedValue({ progress: [{ topicId: '1', completed: true }] });
    User.findById = jest.fn().mockReturnValue({ select: mockSelect });

    const res = await request(app).get('/users/progress');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ topicId: '1', completed: true }]);
  });

  it('should return 404 if user not found', async () => {
    const mockSelect = jest.fn().mockResolvedValue(null);
    User.findById = jest.fn().mockReturnValue({ select: mockSelect });

    const res = await request(app).get('/users/progress');

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "User not found." });
  });
});


describe('POST /users/progress/complete', () => {
  it('should update user progress', async () => {
    User.findByIdAndUpdate = jest.fn().mockResolvedValue({});

    const res = await request(app).post('/users/progress/complete').send({
      topicId: 'topic1',
      subtopicId: 'sub1',
      sectionId: 'sec1',
      completed: true,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Progress saved!" });
  });
});

describe('DELETE /users/delete', () => {
  it('should delete the user account', async () => {
    User.findOneAndDelete = jest.fn().mockResolvedValue({ _id: '67ec8844b5a1f7729b6e6292' });

    const res = await request(app).delete('/users/delete');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "User deleted successfully." });
  });

  it('should return 404 if user does not exist', async () => {
    User.findOneAndDelete = jest.fn().mockResolvedValue(null);

    const res = await request(app).delete('/users/delete');

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ message: "User not found." });
  });
});

