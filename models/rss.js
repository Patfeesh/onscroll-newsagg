var createpost = require('./createpost.js')
    , FeedParser = require('feedparser')
    , request = require('request')
    , fs = require('fs');

exports.articles = function getRSS() {

    var req = [];
    req.push(request('http://feeds.skynews.com/feeds/rss/home.xml'));
    req.push(request('http://feeds.bbci.co.uk/news/rss.xml?edition=int#'));
    req.push(request('https://news.ycombinator.com/rss'));
    var feedparser = new FeedParser()
        , artarray = [];

    for (var i = 0; i < req.length; i++) {
        req[i].on('error', function (error) {
            error.log(error)
        });
        req[i].on('response', function (res) {
            var stream = this;

            if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

            stream.pipe(feedparser);
        });

        feedparser.on('error', function (error) {
            error.log('Something Went Wrong: ' + error)
        });
        feedparser.on('readable', function () {
            // This is where the action is!
            var stream = this
                , item
            while (item = stream.read()) {
                artarray.push(createpost.newarticle(item));
            }
        });
    }
    return artarray;
};
