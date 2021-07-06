'use strict';

const Path = require('path');
const Joi = require('joi');
const Package = require('../../package');
const weatherRoute = {
    name: `${Package.name}_route_weather`,
    version: Package.version,
    register: async function (server, options) {

        await server.route({
            method: 'GET',
            path: '/weather/{iataCode}',
            options: {
                description: 'Weather api for YYC ',
                notes: 'offers a personalized greeting',
                tags: ['api'], // ADD THIS TAG to include the route in the OpenAPI documentation
                validate: {
                    params: Joi.object({
                        iataCode: Joi.string()
                            .required()
                            .description('IATA Airport Code')
                        })
                    },
                handler: require(Path.join(__dirname, '..', 'handlers', Path.basename(__filename)))
            }
        });
    }
};

module.exports = weatherRoute;
