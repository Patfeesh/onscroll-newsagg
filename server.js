//Include required libraries
var restify = require('restify')
    , async = require('async')
    , angular = require('angular')
    , feedparser = require('feedparser')
    , request = require('request')
    , mongoose = require('mongoose')
    , rss = require('./controllers/rss.js')
    , dbwork = require ('./models/dbwork.js');


var server = restify.createServer({ name: 'onscroll-newsagg' });
 
server.listen(8090, function () {
  console.log('%s listening at %s', server.name, server.url)
});

