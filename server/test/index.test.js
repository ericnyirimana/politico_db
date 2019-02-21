import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../app';
import db from '../models/db';

dotenv.config();

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const adminTest = {
    firstname: 'erick',
    lastname: 'nyirimana',
    othername: 'None',
    email: process.env.TEST_ADMIN_EMAIL,
    phonenumber: '0781575931',
    username: process.env.TEST_ADMIN_USERNAME,
    password: process.env.TEST_ADMIN_PASS,
    passporturl: 'wwww.facebook.com',
    isadmin: 'true'
};

const userTest = {
  firstname: 'Justine',
  lastname: 'Nyampundu',
  othername: 'None',
  email: 'nyampundu@gmail.com',
  phonenumber: '0788474802',
  username: 'nyampundu',
  password: '1234567890',
  passporturl: 'wwww.facebook.com',
  isadmin: 'false'
};

// before((done) => {
//   chai.request(server)
//       .post('/api/v1/auth/signup')
//       .type('application/x-www-form-urlencoded')
//       .send(adminTest)
//       .end((err, res) => { 
//         console.log(res);
//           process.env.TEST_ADMIN_TOKEN = res.body.token;
//           done();
//       });
// });

// after((done) => {
//   db.query('DELETE FROM users; DELETE FROM office; DELETE FROM party; DELETE FROM candidate; DELETE FROM petition; DELETE FROM votes;')
//       .then(res => done()).catch((err) => {
//           console.log(err.message);
//           done();
//       });
// });
  describe('User signup', () => {
    it('The user signup successfully, returned 201', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(userTest)
        .end((err, res) => {
          console.log(res);
          res.should.have.status(201);
          expect(res.body).to.be.a('object');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
    // it('Check the user existance, returned 400', (done) => {
    //   chai.request(server)
    //     .post('/api/v1/auth/signup')
    //     .set('Content-Type', 'application/x-www-form-urlencoded')
    //     .send(userTest)
    //     .end((err, res) => {
    //       res.should.have.status(400);
    //       expect(res.body).to.be.a('object');
    //       done();
    //     });
    // });
  });

  // describe('User Login', () => {
  //   it('The user login successfully, returned 200', (done) => {
  //     chai.request(server)
  //       .post('/api/v1/auth/login')
  //       .set('Content-Type', 'application/x-www-form-urlencoded')
  //       .send({
  //         username: userTest.username,
  //         password: userTest.password,
  //       })
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         expect(res.body).to.be.a('object');
  //         done();
  //       });
  //   });
  //   it('The user login unauthorized, returned 401', (done) => {
  //     chai.request(server)
  //       .post('/api/v1/auth/login')
  //       .set('Content-Type', 'application/x-www-form-urlencoded')
  //       .send({
  //         username: 'testtotest',
  //         password: '123409842',
  //       })
  //       .end((err, res) => {
  //         res.should.have.status(401);
  //         expect(res.body).to.be.a('object');
  //         done();
  //       });
  //   });
  // });

  // describe('Endpoint not found', () => {
  //   it('Should return 404 status', (done) => {
  //     chai.request(server)
  //       .get('/api/v1/auth/hrye')
  //       .end((err, res) => {
  //         res.should.have.status(404);
  //         done();
  //       });
  //   });
  // });