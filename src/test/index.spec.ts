import { describe, it } from 'mocha';
import * as chai from 'chai';
import * as app from '../app';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;

describe('index route', () => {

    describe('GET /', () => {
        it('should return the title', async () => {
            const res = await chai.request(app).get('/');
            expect(res.text).to.contain('Express');
        });

    });

});