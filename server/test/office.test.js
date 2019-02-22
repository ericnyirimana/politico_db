import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../app';

dotenv.config();

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const officeTest = {
    id: '',
    type: 'fedearal',
    name: 'numbejGG'
};

  describe('Political offices Creation Test', () => {
    it('Political offices creation Succeed', (done) => {
      chai.request(server)
        .post('/api/v1/offices')
        .set('auth-access', process.env.TEST_ADMIN_TOKEN)
        .send(officeTest)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).to.be.a('object');
          expect(res.body.data[0].type).to.be.equal(officeTest.type);
          expect(res.body.data[0].name).to.be.equal(officeTest.name);
          done();
        });
    });
    it('Get specific political offices Succeed', (done) => {
      chai.request(server)
        .get(`/api/v1/offices/${officeTest.id}`)
        .set('auth-access', process.env.TEST_ADMIN_TOKEN)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
    it('Check political party existance', (done) => {
      chai.request(server)
        .post('/api/v1/offices')
        .set('auth-access', process.env.TEST_ADMIN_TOKEN)
        .send(officeTest)
        .end((err, res) => {
          res.should.have.status(409);
          done();
        });
    });
  });

  describe('Get all political offices Test', () => {
    it('Get all political offices Succeed', (done) => {
      chai.request(server)
        .get('/api/v1/offices')
        .set('auth-access', process.env.TEST_ADMIN_TOKEN)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });
