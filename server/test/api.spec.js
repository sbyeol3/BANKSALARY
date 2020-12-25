const request = require('supertest');
const app = require('../app');
const message = require('../services/serverMsg');

describe('POST /signin', () => {
  it('should return 200', (done) => {
    request(app)
      .post('/signin')
      .send({
        username: 'saetbyeol',
        password: 'boostcamp',
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.message.should.eql(message.success.signin);
        done();
      });
  });
});
