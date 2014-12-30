var articleSchema = require('./db.js');
var mongoose = require('mongoose')
exports.newarticle = function createArticle(item){
        var newarticle = new Article({
            title: item.title,
            link: item.link,
            pubdate: item.pubdate
        });
        return newarticle;
};

var Article = mongoose.model('Article',articleSchema);
