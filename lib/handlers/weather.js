'use strict';
const Wreck = require('@hapi/wreck');    

module.exports =  async (request, h) => {
        const { res, payload } = await Wreck.get('https://api.westjet.com/destination-service/v1/en-CA/airports/YYC');
        console.log(payload.toString());
        if(!payload){
            throw new Error("Nothing was find")
        }
        return payload
}