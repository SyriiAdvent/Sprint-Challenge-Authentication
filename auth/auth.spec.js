const server = require('../api/server');
const request = require('supertest');
const db = require('../database/dbConfig');

describe('POST api/auth/', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  test('should return 201 on success', () => {
    return request(server)
      .post('/api/auth/register')
      .send({ username: 'Timmy', password: 'password' })
      .then(res => {
        expect(res.status).toBe(201);
      });
  });

  test('should successfully create user', () => {
    return request(server)
      .post('/api/auth/register')
      .send({ username: 'Timmy', password: 'password' })
      .then(res => {
        expect(res.body.message).toBe('user created successfully.');
      });
  });

  test('should login user', async () => {
    const user = {
      username: 'Timmy',
      password: 'password',
    };

    await request(server)
      .post('/api/auth/register')
      .send({ username: 'Timmy', password: 'password' })
      .then(() => {
        return request(server)
          .post('/api/auth/login')
          .send(user)
          .then(res => {
            expect(res.body.message).toBe('Permitted Access.');
          });
      });
  });
});