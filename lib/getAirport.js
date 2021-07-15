'use strict';
// const Wreck = require('@hapi/wreck');


const getAirport = function (iataCode) {

    if (typeof iataCode !== 'string' || !iataCode.match(/[A-Z]{3}/) || iataCode.length !== 3 || iataCode === undefined ) {
        throw new Error('iataCode Must be a three uppercase characters');
    }
    return;
};

module.exports = getAirport;

