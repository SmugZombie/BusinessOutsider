'use strict';
const axios = require('axios');
var config = require('../config/config');
const puppeteer = require('puppeteer');

module.exports = class parser {
	static async parseIt(url){
		//console.log(getFormattedDate() + ': Initiating Scrape');
        // Launch the browser
        const browser = await puppeteer.launch({args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]});
        // Open a new tab
        const page = await browser.newPage();
        // Go to epic_url
        await page.goto(url);

        console.log(url)
        
        const data = await page.$$eval("p", elements=> elements.map(item=>item.textContent))

        console.log(data);

        browser.close();

        return data;
    }
};
