
const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const app = express()
const axios = require('axios');
const options = { type: 'application/json'}
require('dotenv').config()
var config = require('./config/config');
var parser = require('./lib/parser.js');

// Allow for raw posts
app.use(bodyParser.raw(options));

app.get('/', async function(req, res, next){
    res.sendFile('/usr/src/app/public/index.html');
});

app.get('/:url', async function(req, res, next){

    let url = req.params.url;

    let content = await parser.parseIt(url);

    content = "<p>" + content.join("</p><p>") + "</p>";

    if(!url.startsWith("https://www.businessinsider.com") ){
        res.status(404).send({error: "FQDN must match https://www.businessinsider.com"});
    }

    if(content){
        res.status(200).send(content);
    }else{
        res.sendFile('./public/index.html');
    }

    //let err = "404 - Endpoint not found or incorrect method used"
	//res.status(404).send({ "message": "fail", "details": `${err}`, url: url });
});

// Start the webserver on the specified by .env port
app.listen(config.app.port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${config.app.port}`)
  })




  