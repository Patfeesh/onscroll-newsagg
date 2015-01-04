//Include required libraries
var FeedParser = require('feedparser')
    , req = require('request')
    , mongoose = require('mongoose');

//Mongoose DB connection
mongoose.connect('mongodb://localhost/newsagg', function (err) {
    if (err) return console.log('Error connecting to database: ' + err);
});

//Assign mongoose connection for reference
var db = mongoose.connection;
db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected.');
});


// Article object schema
var Schema = mongoose.Schema;

//Define article object members
var articleSchema = new Schema({
    title: { type: String }
    , link: String
    , pubdate: Date
    , source: String
});

// Define Article model
var Article = mongoose.model('Article',articleSchema);

// Article object constructor
function createArticle(item, source){
    var newpost = new Article({
        title: item.title,
        link: item.link,
        pubdate: item.pubdate,
        source: source
    });
    return newpost;
};


//Retrieve articles from rss feed and parse into object model
exports.getArticles = function getArticles(req, source){

    //Optimal header parameters
    req.setMaxListeners(50);
    req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36');
    req.setHeader('accept', 'text/html,application/xhtml+xml');

    var feedparser = new FeedParser();

    //RSS stream connection error
    req.on('error', function (error) {
        console.error('Could not connect to RSS stream ' + source + '. ' + error)
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
            , item;
        while (item = stream.read()) {
            postarray.push(createArticle(item, source));
        }
    });
    return postarray;
}

Article.count({source: 'BBC News'}, function(err, c){
    console.log('Count is ' + c);
});
Article.collection.drop();
