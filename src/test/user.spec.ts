import { describe, it } from 'mocha';
import * as chai from 'chai';
import * as app from '../app';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;

describe('--- user route ---', () => {

    describe('GET /users', () => {
        it('should return a text', async () => {
            const res = await chai.request(app).get('/users');
            expect(res.text).to.be.eq('respond with a resource');
        });
    });
});
