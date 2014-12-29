var mongoose = require('mongoose')
var feedparser = require('feedparser')
var restify = require('restify')

var server = restify.createServer({ name: 'news-api' })
 
server.listen(8090, function () {
  console.log('%s listening at %s', server.name, server.url)
})
