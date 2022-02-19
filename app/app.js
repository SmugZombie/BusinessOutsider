
const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const app = express()
const axios = require('axios');
const options = { type: 'application/json'}
require('dotenv').config()
var config = require('./config/config');
var parser = require('./lib/parser.js');
const fs = require('fs').promises;

if(config.app.env != "PROD"){
    config.public.path = config.public.dev_directory;
}else{
    config.public.path = config.public.prod_directory;
}

function checkValidDomain(url){
	try{
		let ALLOWED_DOMAINS = JSON.parse(config.app.allowed_domains);
//		if(url in ALLOWED_DOMAINS){
//			return true;
//		}

		for(let i = 0; i<ALLOWED_DOMAINS.length; i++){
			if(url.startsWith(ALLOWED_DOMAINS[i])){
				return true;
			}
		}

		return false;
	}catch(e){
		console.error(e);
	}
}

// Allow for raw posts
app.use(bodyParser.raw(options));

app.get('/', async function(req, res, next){
    let body = await renderFile("header.html") + await renderFile("home.html") + await renderFile("footer.html");
    res.status(200).send(body);
});

app.get('/examples', async function(req,res,next){
    res.status(200).send(JSON.parse(config.app.example_links));
});

app.get('/favicon.ico', async function(req,res,next){
    res.status(200).send("");
});

app.get('/testing', async function(req,res,next){
    console.log("/testing called");
    let body = await renderHeader();
    body += "<p>" + "Hello World" + "</p>";
    body += await renderFooter();


    res.status(200).send(body);
});

app.get('/:url', async function(req, res, next){
    let url = req.params.url;
    console.log(url);

//    if(!url.startsWith("https://www.businessinsider.com") && !url.startsWith("https://www.wsj.com") && !url.startsWith("https://www.nytimes.com")){
	if(!checkValidDomain(url)){
        //res.sendFile(config.public.path + 'badurl.html');
	console.log("URL NOT ALLOWED");
        let body = await renderHeader();
        body += await renderFile("badurl.html");
        body += await renderFooter();

        res.status(200).send(body);
        return;
    }


    console.log("URL ALLOWED");
    let body = await renderHeader();
    body += await renderDisplay();
    body += await renderFooter();

    res.status(200).send(body);
    return;
});

app.get('/puller/:url', async function(req, res, next){

    let url = req.params.url;

    //if(!url.startsWith("https://www.businessinsider.com") && !url.startsWith("https://www.wsj.com") && !url.startsWith("https://www.nytimes.com") ){
    if(!checkValidDomain(url)){
    	res.sendFile(config.public.path + 'badurl.html');
	return;
    }

    let content = await parser.parseIt(url);

    if(Array.isArray(content)){

        if(content){
            res.status(200).send(content);
        }else{
            res.status(404).send("Invalid URL or Server Error");
        }
    }

});

let renderHeader = async function(){
    return await fs.readFile(config.public.path + 'static/' + "header.html", 'utf8' );
}

let renderFooter = async function(){
    return await fs.readFile(config.public.path + 'static/' + "footer.html", 'utf8' );
}

let renderDisplay = async function(){
    return await fs.readFile(config.public.path + 'static/' + "display.html", 'utf8' );
}

let renderFile = async function(file){
    return await fs.readFile(config.public.path + 'static/' + file, 'utf8' );
}

// Start the webserver on the specified by .env port
app.listen(config.app.port, '0.0.0.0', () => {
    console.log(`Example app listening at http://0.0.0.0:${config.app.port}`)
  })




  
