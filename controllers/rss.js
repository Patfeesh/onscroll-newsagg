//Include required libraries
var FeedParser = require('feedparser')
    , request = require('request')
    , dbwork = require('../models/dbwork.js')

//Retrieve articles from rss feed and parse into object model
exports.getArticles = function getArticles(url, callback){
    var req = request(url);
    //Optimal header parameters
    req.setMaxListeners(50);
    req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36');
    req.setHeader('accept', 'text/html,application/xhtml+xml');

    var feedparser = new FeedParser();

    //RSS stream connection error
    req.on('error', function (error) {
        console.error('Could not connect to RSS stream ' + '. ' + error)
    });

    //Pass to feedparser if correct response
    req.on('response', function (res) {
        var stream = this;
        if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
        stream.pipe(feedparser);
    });

    //Handle feedparser errors
    feedparser.on('error', function (error) {
        console.error(error)
    });

    //Convert readable events to object models and push to array whilst stream contains more data
    var postarray = [];
    feedparser.on('readable', function () {
        var stream = this
            , meta = this.meta
            , item;
        while (item = stream.read()) {
            postarray.push(dbwork.newArticle(item, meta));
        }

    });
    return callback(null,postarray);
}
