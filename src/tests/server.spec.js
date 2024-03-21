const CHAI = require('chai');
const should = CHAI.should();
const server = require('#SERVER');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('Server Instance', () => {
  it('should exist', () => {
    should.exist(server);
  });

  it('should have a listen method', () => {
    should.exist(server.listen);
  });
});

describe('Server Routes', () => {
  it('should respond 200 to a GET request to /', async () => {
    const response = await requestWithSupertest.get('/');
    response.status.should.be.equal(200);
  });
});
