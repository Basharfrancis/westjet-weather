'use strict';

const { setWorldConstructor } = require('@cucumber/cucumber');
const AirportWeatherAPIProduct = require('../../lib');

class CustomWorld {

    constructor() {

        this.api = new AirportWeatherAPIProduct();
    }

    async readyApiForTesting() {

        await this.api.init();
    }

    isApiReady() {

        return (this.api.server) ? true : false;
    }
}

setWorldConstructor(CustomWorld);
