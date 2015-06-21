app = require('../app');

app.get('/', function(req, res) {
	res.send(200,'Please see github documentation <a href="https://github.com/deniskulicek/geoLocationMessagingAPI">here</a>');
});

require('./post');