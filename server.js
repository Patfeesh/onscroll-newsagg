//Include required libraries
var restify = require('restify')
    , async = require('async')
    , mongoose = require('mongoose')
    , rss = require('./controllers/rss.js')
    , dbwork = require ('./models/dbwork.js');


// Server
var server = restify.createServer();
mongoose.connect('mongodb://localhost/newsagg', function (err) {
  if (err) return console.log('Error connecting to database: ' + err);
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get("/articles", function (req, res, next) {
  db.products.find(function (err, articles) {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(articles));
  });
  return next();
});

var sources = ['http://feeds.bbci.co.uk/news/rss.xml', 'http://feeds.skynews.com/feeds/rss/home.xml', 'https://news.ycombinator.com/rss'];

var url = 'http://feeds.bbci.co.uk/news/rss.xml';


function init(){
  rss.getArticles(url,function(err,resultarray){
    if(err) return console.log(err);
    //Operation successful, now try to save articles
    dbwork.saveArticles(resultarray,function(err,result){
      if(err) return console.log(err); //Log it
      return console.log(result); //Complete, tell the console
    });
  });
}
//Start app
init();



