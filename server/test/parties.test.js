import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../app';
import { parties } from '../helpers';

const partiesMaxID = parties.length;

const expect = chai.expect;

chai.use(chaiHttp);

const random = Math.floor(Math.random() * 1000) + 1;

const partiesTest = {
    name: 'FPROLH' + random,
    hqAddress: 'Rusororo',
    logoUrl: 'https://ericnyirimana.github.io/politico/UI/img/party-logo.png',
};

  describe('Political parties Creation Test', () => {
    it('Political parties creation Succeed', (done) => {
      chai.request(server)
        .post('/api/v1/parties')
        .send(partiesTest)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.data[0].type).to.be.equal(partiesTest.type);
          expect(res.body.data[0].hqAddress).to.be.equal(partiesTest.hqAddress);
          expect(res.body.data[0].logoUrl).to.be.equal(partiesTest.logoUrl);
          done();
        });
    });
    it('Check political party existance', (done) => {
      chai.request(server)
        .post('/api/v1/parties')
        .send(partiesTest)
        .end((err, res) => {
          res.should.have.status(409);
          done();
        });
    });
  });

  describe('Get all political parties test', () => {
    it('Get all political parties Succeed', (done) => {
      chai.request(server)
        .get('/api/v1/parties')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('Get specific political parties test', () => {
      const id = 2;
    it('Get specific political parties Succeed', (done) => {
      chai.request(server)
        .get(`/api/v1/parties/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
    it('Get specific political parties Succeed', (done) => {
      chai.request(server)
        .get('/api/v1/parties/badrequest')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('Update parties Creation Test', () => {
    const id = 2;
    it('Political parties creation Succeed', (done) => {
      chai.request(server)
        .patch(`/api/v1/parties/${id}`)
        .send(partiesTest)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.data[0].name).to.be.equal(partiesTest.name);
          done();
        });
    });
  });

  describe('Delete a party', () => {
    const id = 2;
    it('Party deletion succeed', (done) => {
      chai.request(server)
        .delete(`/api/v1/parties/${partiesMaxID}`)
        .send(partiesTest)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });