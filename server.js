var restify = require('restify')
  , rss = require('./controllers/rss.js');
  , createpost = require('./models/createpost.js')
  , dbwork = require ('./models/dbwork.js')

var server = restify.createServer({ name: 'news-api' });
 
server.listen(8090, function () {
  console.log('%s listening at %s', server.name, server.url)
});

