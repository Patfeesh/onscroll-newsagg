// Import mongoose db interface language
var mongoose = require('mongoose');

// Article object constructor
exports.newarticle = function createArticle(item, source){
        var newpost = new Article({
            title: item.title,
            link: item.link,
            pubdate: item.pubdate,
            source: source
        });
        return newpost;
};

// Article object schema
var articleSchema = new mongoose.Schema({
    title: { type: String }
    , link: String
    , pubdate: Date
    , source: String
});

// Define Article model
var Article = mongoose.model('Article',articleSchema);
