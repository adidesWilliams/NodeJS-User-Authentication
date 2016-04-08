var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');



passport.use('local-login', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true //setting to true passes request object to the following validity check function 
}, function (req, email, password, done){
	User.findOne({ email: email }, function(err, user){
		if(err) return done(err);
		//failureRedirect in routes/user.js(router.post/passport.authenticate) is called if user get stuck here
		//if !user -> if user doesn't exist
		if(!user){
			return done(null, false, req.flash('loginMessage', 'Invalid username and password pair'));
		}

		//failureRedirect in routes/user.js(router.post/passport.authenticate) is called if user get stuck here
		if(!user.comparePassword(password)){
			return done(null, false, req.flash('loginMessage', 'Invalid username and password pair'));
		}

		//successRedirect in routes/user.js(router.post/passport.authenticate) is called if user makes it here
		return done(null, user);

		//return user object after authentication, which can then be accessed by req.user._id, req.user.profile.name, etc

	});
}));



//store serialzed user object at req.session.passport.user



//provide a key (ie, user._id) to tell serializeUser function what data from user object should be stored in session
//result from serializeUser function would be something like: req.session.passport.user = { _id: '' }
passport.serializeUser(function(user, done){
	done(null, user._id);

});


//deserializeUser is provided a function that takes user identifying information as first argument 
//the id is what was serialized to the session
passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		done(err, user);
	});
});


exports.isAuthenticated = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}