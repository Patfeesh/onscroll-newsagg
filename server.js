//Include required libraries
var restify = require('restify')
    , promise = require('bluebird')
    , async = require('async')
    , mongoose = require('mongoose')
    , rss = require('./controllers/rss.js')
    , dbwork = require('./models/dbwork.js');
    promise.promisifyAll(rss);
    promise.promisifyAll(dbwork);

//DB
var db = mongoose.connection;

// Server
var server = restify.createServer({ name: 'onscroll-newsagg' });

server.listen(8090, function () {
  console.log('%s listening at %s', server.name, server.url)
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// This function is responsible for returning all entries for the Article model
function getStories(res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // .find() without any arguments, will return all results
  // the `-1` in .sort() means descending order
  db.Article.find().sort([['date', -1]]).exec(function (arr,data) {
    res.send(data);
  });
}
server.get('/articles', getStories);


//Data
var sources = ['http://feeds.bbci.co.uk/news/rss.xml', 'http://feeds.skynews.com/feeds/rss/home.xml', 'https://news.ycombinator.com/rss'];

function init(){
  for( var i = 0; i < sources.length; i++) {
    rss.getArticlesAsync(sources[i]).then(dbwork.saveArticlesAsync);
  }
}
//Start app
init();



