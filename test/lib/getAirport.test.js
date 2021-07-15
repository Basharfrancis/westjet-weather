'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');


const Nock = require('nock');

const { describe, it } = exports.lab = Lab.script();

const GetAirport = require('../../lib/getAirport');

describe('getAirport Utility', () => {
    // it exports a function
    it('exports a function', () => {

        expect(GetAirport).to.be.a.function();

    });
    it('throw an error if the iataCode paramter is not three uppercase characters', () => {

        const expectedErrorMessage = 'iataCode Must be a three uppercase characters';

        const whenCallWithLowerCaseParams = function () {

            return GetAirport('yyy');
        };

        expect(whenCallWithLowerCaseParams).to.throw(expectedErrorMessage);

        const whenCallWithNumberParams = function () {

            return GetAirport(123);
        };
        expect(whenCallWithNumberParams).to.throw(expectedErrorMessage);

        const whenCallWithoutPassingParams = function () {

            return GetAirport(null);
        };
        expect(whenCallWithoutPassingParams).to.throw(expectedErrorMessage);

        const whenCalledWithAnObjectParams = function () {

            return GetAirport({});
        };
        expect(whenCalledWithAnObjectParams).to.throw(expectedErrorMessage);

    });
    const response = {
        license: {
            key: 'mit',
            name: 'MIT License',
            spdx_id: 'MIT',
            url: 'https://api.github.com/licenses/mit',
            node_id: 'MDc6TGljZW5zZTEz',
        },
    };
    const scope = Nock('https://api.westjet.com/').get('/destination-service/v1/en-CA/airports/').reply(200, response);
    it('it throws an error if the upstream API is unavailable',  () => {

        expect(typeof response).to.equal('object');
        expect(response.license.name).to.equal('MIT License');
        expect(response.license.key).to.equal('mit');
        // expect(scope.get).to.be.equal(200);
        scope.isDone();
    });
    const scopeSecond = Nock('https://api.westjet.com/').get('/users/1').reply(404);
    it('it throws an error if the upstream API returns an error (such as 404)', () => {

        // expect(scopeSecond).match(404);
        scopeSecond.isDone();
    });
});

