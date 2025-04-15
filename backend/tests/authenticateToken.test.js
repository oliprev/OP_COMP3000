const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

const authenticateToken = require('../functions/authenticateToken');

const app = express();
app.use(express.json());

app.get('/protected', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Access granted', user: req.user });
});

describe('GET /protected (authenticateToken middleware)', () => {
  it('should return 401 if no token is provided', async () => {
    const res = await request(app).get('/protected');

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({
      message: 'Access denied. Token not present.',
    });
  });

  it('should return 400 if token is invalid', async () => {
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    const res = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer invalidtoken');

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      message: 'Invalid token',
    });
  });

  it('should call next and return user if token is valid', async () => {
    const mockUser = { userId: '67ec8844b5a1f7729b6e6292', role: 'User' };
    jwt.verify.mockReturnValue(mockUser);

    const res = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer validtoken');

    expect(jwt.verify).toHaveBeenCalledWith('validtoken', process.env.JWT_SECRET);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      message: 'Access granted',
      user: mockUser,
    });
  });
});
