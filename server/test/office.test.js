import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../app';

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const officeTest = {
    type: 'fedearal',
    name: 'numbej'
};

  describe('Political offices Creation Test', () => {
    it('Political offices creation Succeed', (done) => {
      chai.request(server)
        .post('/api/v1/offices')
        .send(officeTest)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.data[0].type).to.be.equal(officeTest.type);
          expect(res.body.data[0].name).to.be.equal(officeTest.name);
          done();
        });
    });
  });

  describe('Get all political offices Test', () => {
    it('Get all political offices Succeed', (done) => {
      chai.request(server)
        .get('/api/v1/offices')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('Get specific political offices Test', () => {
      const id = 2;
    it('Get specific political offices Succeed', (done) => {
      chai.request(server)
        .get(`/api/v1/offices/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });