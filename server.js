
// imports for server
var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var keys = require('./config/keys');

//imports for render engine
var ejs = require('ejs');
var ejsmate = require('ejs-mate');

//imports to use flash
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');

var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local');
//imports for Schema/models
var User = require('./models/user');

var mongoose = require('mongoose');
var bodyParser = require('body-parser');



var morgan = require('morgan');
//middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cookieParser());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: keys.secret,
	
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


//define render engine
app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');

//import routes
var userRoutes = require('./routes/user');

//use routes
app.use(userRoutes);



//Connect to mongoDB
mongoose.connect(keys.database, function(err){
	if(err){
		console.log(err);
	} else {
		console.log("Yay! MongoDB connection established!");
	}
});


//Start server
http.listen(PORT, function(err){
	if(err) throw err;
	console.log('Express server is now running on PORT: ' + PORT);
});

