import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../app';


const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const userTest = {
    firstname: 'Justine',
    lastname: 'Nyampundu',
    othername: 'None',
    email: `eric${Math.floor(Math.random() * 10000) + 1}@gmail.com`,
    phonenumber: '0788474800',
    username: `eric${Math.floor(Math.random() * 10000) + 1}`,
    password: '1234567890',
    passporturl: 'wwww.facebook.com',
    isadmin: 'true'
};
const loginTest = {
  username: 'ericnyirimana',
  password: '1234567890'
};

  describe('User signup', () => {
    it('The user signup successfully', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(userTest)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).to.be.a('object');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
  });

  describe('User Login', () => {
    it('The user login successfully', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(loginTest)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });