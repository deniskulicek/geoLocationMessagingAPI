var express  = require('express');
var mongoose = require('mongoose');
var app      = module.exports = express();
var keys = require('./keys');

/* Mongoose connection to MongoDB */
mongoose.connection.on('open', function(ref){
	console.log('Connected to mongo server successfully!');
});

mongoose.connection.on('error', function(err){
	console.log('Error: ', err.message, ' - Killing server!');
	server.close();
});

mongoose.connect(keys.mongoose_connection_string);

// All environments
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());

app.all('*', function(req, res, next){ //Allow X-domain requests
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.use(app.router);

require('./routes');

var server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});