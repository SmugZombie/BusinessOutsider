'use strict';
const axios = require('axios');
var config = require('../config/config');
const puppeteer = require('puppeteer');

module.exports = class parser {
	static async parseIt(url){
		//console.log(getFormattedDate() + ': Initiating Scrape');
        // Launch the browser
        try {
            const browser = await puppeteer.launch({args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]});
            // Open a new tab
            const page = await browser.newPage();
    
            await page.setExtraHTTPHeaders({
                'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
                'upgrade-insecure-requests': '1',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9,en;q=0.8',
                'referer': "https://t.co/",
                'X-Forwarded-For': '66.102.0.0'
            })
    
            await page.setCacheEnabled(false);
            // Go to epic_url
            await page.goto(url);
    
            console.log(url)
            
            const data = await page.$$eval("p", elements=> elements.map(item=>item.textContent))
    
            console.log(data);
    
            browser.close();
    
            return data;
        }
        catch(e){
            console.log(e);
            return false;
        }
        
    }
};
