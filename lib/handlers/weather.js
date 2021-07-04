'use strict';

const Wreck = require('@hapi/wreck');    

module.exports =  async (request, h) => {
        const method = 'GET'; // GET, POST, PUT, DELETE
        const westJetApi = `https://api.westjet.com/destination-service/v1/en-CA/airports/${request.params.iataCode}`;
        console.log(request.params," request");
        const weatherApi = 'https://www.metaweather.com/api/location/8775/';
        const readableStream = Wreck.toReadableStream('foo=bar');
        
        const wreck = Wreck.defaults({
            headers: { 'x-foo-bar': 123 },
        });
        
        // cascading example -- does not alter `wreck`
        // inherits `headers` and `agents` specified above
        // const wreckWithTimeout = wreck.defaults({
        //     timeout: 5
        // });
        
        //all attributes are optional
       const  options = {
            // baseUrl: 'https://api.westjet.com/destination-service/v1/en-CA/airports/YYC/',
            payload: readableStream || 'foo=bar' || Buffer.from('foo=bar'),
            headers: { /* http headers */ },
            redirects: 3,
            beforeRedirect: (redirectMethod, statusCode, location, resHeaders, redirectOptions, next) => next(),
            redirected: function (statusCode, location, req) {},
            // timeout: 1000,    // 1 second, default: unlimited
            maxBytes: 1048576, // 1 MB, default: unlimited
            rejectUnauthorized: true || false,
            agent: null,         // Node Core http.Agent
            // secureProtocol: 'SSLv3_method', // The SSL method to use
            // ciphers: 'DES-CBC3-SHA' // The TLS ciphers to support
        };

            const westJetApiCall = wreck.request(method, westJetApi, options);
            const resWestJet = await westJetApiCall;
            const bodyWestJet = await Wreck.read(resWestJet, options);

            const weatherApiCall = wreck.request(method, weatherApi, options)
            const resWeather = await weatherApiCall
            const bodyWeather = await Wreck.read(resWeather, options);
            if(!bodyWestJet || !bodyWeather){
                throw new Error("Nothing was found")
            }
            var airport = JSON.parse(bodyWestJet.toString())
            var weather = JSON.parse(bodyWeather.toString())
            return {
                airport,
                // weather
            }

    }