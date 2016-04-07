var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);

var morgan = require('morgan');
var ejs = require('ejs');
var ejsmate = require('ejs-mate');

//middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));


//define render engine
app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');

//import routes
var userRoutes = require('./routes/user');

//use routes
app.use(userRoutes);





http.listen(PORT, function(err){
	if(err) throw err;
	console.log('Express server is now running on PORT: ' + PORT);
});

