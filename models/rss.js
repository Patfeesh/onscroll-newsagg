var createpost = require('./createpost.js')
    , FeedParser = require('feedparser')
    , request = require('request')

    // Define our streams
    var sources = [];
    sources.push('BBC News', 'Sky News')
    var reqlink = [];
    reqlink.push('http://feeds.bbci.co.uk/news/rss.xml?edition=int#','http://feeds.skynews.com/feeds/rss/home.xml');
    var artarray = new Array();

    for( var i = 0; i < sources.length; i++) {

        var source = sources[i];
        var req = request(reqlink[i], {timeout: 10000, pool: false});
        req.setMaxListeners(50);
        // Some feeds do not response without user-agent and accept headers.
        req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36');
        req.setHeader('accept', 'text/html,application/xhtml+xml');


        var feedparser = new FeedParser();

        req.on('error', function (error) {
            console.error(error)
        });

        req.on('response', function (res) {
            var stream = this;
            if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
            stream.pipe(feedparser);
        });

        feedparser.on('error', function (error) {
            console.error('Something Went Wrong: ' + error)
        });

        feedparser.on('readable', function () {
            var stream = this
                , item;
            while (item = stream.read()) {
                artarray.push(createpost.newarticle(item, source));
                artarray.forEach(function (newpost) {
                    console.log(newpost.title);
                    console.log(newpost.link);
                    console.log(newpost.pubdate);
                    console.log(newpost.source);
                })
            }

        });
    }



