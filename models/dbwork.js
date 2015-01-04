var mongoose = require('mongoose')

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
exports.newArticle = function createArticle(item, source){
    new Article({
        title: item.title,
        link: item.link,
        pubdate: item.pubdate,
        source: source
    });
};