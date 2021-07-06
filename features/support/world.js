'use strict';

const { setWorldConstructor } = require('@cucumber/cucumber');
const AirportWeatherAPI = require('../../lib');

class CustomWorld {

    constructor() {

        this.api = new AirportWeatherAPI();
    }

    async readyApiForTesting() {

        await this.api.init();
    }

    isApiReady() {

        return (this.api.server) ? true : false;
    }
}

setWorldConstructor(CustomWorld);
