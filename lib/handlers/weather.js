'use strict';

const Wreck = require('@hapi/wreck');    

module.exports =  async (request, h) => {
        const method = 'GET'; // GET, POST, PUT, DELETE
        const westJetApi = `https://api.westjet.com/destination-service/v1/en-CA/airports/${request.params.iataCode}`;
        // console.log(request.params," request");
        // const weatherApi = 'https://www.metaweather.com/api/location/';
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
            // first call

            const westJetApiCall = wreck.request(method, westJetApi, options);
            const resWestJetAPICall = await westJetApiCall;
            const bodyWestJet = await Wreck.read(resWestJetAPICall, options);
            const JsonResponseWestJetAPI = JSON.parse(bodyWestJet)
            const latitude = JsonResponseWestJetAPI.airport.latitude
            const longitude = JsonResponseWestJetAPI.airport.longitude
            console.log(JsonResponseWestJetAPI.airport.latitude)

            // second call

            const weatherAPI = `https://www.metaweather.com/api/location/search/?lattlong=${latitude},${longitude}`;
            console.log(weatherAPI,"lattitude , longtiude");

            const weatherAPICall =  wreck.request(method, weatherAPI, options)
            const resWeather = await weatherAPICall
            const bodyWeather = await Wreck.read(resWeather, options);
            const JsonResponseWeatherAPI = JSON.parse(bodyWeather)



            // last call
            
            const whereToFindMyLocation = `https://www.metaweather.com/api/location/${JsonResponseWeatherAPI[0].woeid}`
            const whereToFindMyLocationAPICall = wreck.request(method, whereToFindMyLocation, options)
            const resWhereToFindMyLocation = await whereToFindMyLocationAPICall
            const bodyWhereToFindMyLocation = await Wreck.read(resWhereToFindMyLocation, options)
            const JsonResponseWhereToFindMyLocation = JSON.parse(bodyWhereToFindMyLocation)

            if(!bodyWestJet || ! bodyWeather || !JsonResponseWhereToFindMyLocation){
                throw new Error("Nothing was found")
            }
            const airport = JsonResponseWestJetAPI.airport
            const weather = JsonResponseWhereToFindMyLocation
            return {
                airport,
                weather
            }

    }