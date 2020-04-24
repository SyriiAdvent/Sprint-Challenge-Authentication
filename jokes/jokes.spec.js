const server = require('../api/server');
const request = require('supertest');
const db = require('../database/dbConfig');

describe('GET - Jokes API', () => {
  test('should return not authorized', () => {
    return request(server)
      .get('/api/jokes')
      .then(res => {
        expect(res.body.message).toBe('Unauthorized Access.');
      });
  });
  
  test('should return jokes after login', async () => {
    const user = {
      username: 'Timmy',
      password: 'password',
    };

    await request(server)
      .post('/api/auth/register')
      .send({ username: 'Timmy', password: 'password' })
      .then(() => {
        request(server)
          .post('/api/auth/login')
          .send(user)
          .then(() => {
            return request(server)
              .get('/api/jokes')
              .then(res => {
                expect(res).toBeGreaterThanOrEqual(1)
                expect(res).toBeGreaterThanOrEqual(5)
              })
          });
      })
      .catch(() => null)
  });
});