import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../app';

dotenv.config();

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const random = Math.floor(Math.random() * 1000) + 1;

const partiesTest = {
    id: '',
    name: 'FPROLH' + random,
    hqaddress: 'Rusororo',
    logourl: 'https://ericnyirimana.github.io/politico/UI/img/party-logo.png',
};

  describe('Political parties Creation Test', () => {
    it('Political parties creation Succeed', (done) => {
      chai.request(server)
        .post('/api/v1/parties')
        .set('auth-access', process.env.TEST_ADMIN_TOKEN)
        .send(partiesTest)
        .end((err, res) => {
          console.log(res);
          res.should.have.status(201);
          expect(res.body).to.be.a('object');
          done();
        });
    });
    it('Check political party existance', (done) => {
      chai.request(server)
        .post('/api/v1/parties')
        .set('auth-access', process.env.TEST_ADMIN_TOKEN)
        .send(partiesTest)
        .end((err, res) => {
          res.should.have.status(409);
          done();
        });
    });
    it('Get specific political parties Succeed', (done) => {
      chai.request(server)
        .get(`/api/v1/parties/${partiesTest.id}`)
        .set('auth-access', process.env.TEST_ADMIN_TOKEN)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('Get all political parties test', () => {
    it('Get all political parties Succeed', (done) => {
      chai.request(server)
        .get('/api/v1/parties')
        .set('auth-access', process.env.TEST_ADMIN_TOKEN)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('Get specific political parties test', () => {
    it('Get specific political parties Succeed', (done) => {
      chai.request(server)
        .get(`/api/v1/parties/${partiesTest.id}`)
        .set('auth-access', process.env.TEST_ADMIN_TOKEN)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });