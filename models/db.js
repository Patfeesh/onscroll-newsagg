var mongoose = require('mongoose')

initdb = function initDB(){
    db.on('error', console.error);
    db.once('open', function() {

    });
};
var articleSchema = new mongoose.Schema({
    title: { type: String }
    , link: String
    , pubdate: Date
    , source: String
});
module.exports = articleSchema;
mongoose.connect('mongodb://localhost/onscroll');
