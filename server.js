var feedparser = require('feedparser');
var restify = require('restify');
var rss = require('../models/rss.js');
var db = require('../models/db.js');

var server = restify.createServer({ name: 'news-api' })
 
server.listen(8090, function () {
  console.log('%s listening at %s', server.name, server.url)
})
