//Include required libraries
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
exports.newArticle = function createArticle(item, meta){
    new Article({
        title: item.title,
        link: item.link,
        pubdate: item.pubdate,
        source: meta.title
    });
};

//Trim returned articles to 10 per source and save to articles collection
exports.saveArticles = function saveArticles(postarray,callback) {
    var newarray = [];
    newarray = postarray.slice(0, 10);

    for (var i = 0; i < newarray.length; i++) {
        newarray[i].save(function (err) {
            if (err) return callback(err);
        });
    }
    return callback(null,'DB Saves all completed');
}