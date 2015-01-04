var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(80);
console.log('Server listening on port 80');
var FeedParser = require('feedparser')
    , request = require('request');
var mongoose = require('mongoose');

//Mongoose DB connection
mongoose.connect('mongodb://localhost/newsagg', function (err) {
    if (err) return console.log('Error connecting to database: ' + err);
});

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




// Define our streams
var source = 'BBC News';
var req = request('http://feeds.bbci.co.uk/news/rss.xml?edition=int#', {timeout: 10000, pool: false});
req.setMaxListeners(50);
// Some feeds do not response without user-agent and accept headers.
req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36');
req.setHeader('accept', 'text/html,application/xhtml+xml');


var feedparser = new FeedParser();

req.on('error', function (error) {
    console.error('Could not connect to RSS stream ' + source + '. ' + error)
});

req.on('response', function (res) {
    var stream = this;
    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
    stream.pipe(feedparser);
});

feedparser.on('error', function (error) {
    console.error(error)
});

feedparser.on('readable', function () {
    var stream = this
        , count = 0
        , item
        , postarray = [];
    while (item = stream.read()) {
        postarray.push(createArticle(item, source));
    }
    var newarray = [];
    newarray = postarray.slice(0,10);

    for( var i = 0; i < newarray.length; i++){
        newarray[i].save(function (err) {
            if (err) return console.error('Failed to save to DB: ' + err); // we should handle this
        });
    }
});
Article.count({source: 'BBC News'}, function(err, c)
{
    console.log('Count is ' + c);
});
Article.collection.drop();
