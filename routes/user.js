var router = require('express').Router();
var User = require('../models/user');
var passport = require('passport');
var passportConf = require('../config/passport');

router.get('/home', passportConf.isAuthenticated, function(req, res){
	User.findOne({ _id: req.user._id }, function(err, foundUser){
		if(err) return next(err);
		res.render('accounts/home',{
			user: foundUser
		});
	});
});

//passportConf.isAuthenticated to redirect users who havent logged in back to login page
router.get('/profile', passportConf.isAuthenticated, function(req, res, next){
	User.findOne({ _id: req.user._id }, function(err, foundUser){
		if(err) return next(err);
		res.render('accounts/profile', {
			user: foundUser
		});
	});
});

//REGISTER routes
router.post('/register', function(req, res, next){
	var user = new User;
	user.name = req.body.name;
	user.email = req.body.email;
	user.password = req.body.password;

	User.findOne({ email: req.body.email }, function (err, existingUser){
		if(existingUser){
			req.flash('errors', 'An account already exists with this email address');
			return res.redirect('/register');
		} else {
			user.save(function(err, user){
				if(err) return next(err);
				res.redirect('/profile');
			});
		}
	});


});

router.get('/register', function (req, res, next){
	res.render('accounts/register', { 
		errors: req.flash('errors') 
	});
});

//REGISTER routes

//LOGIN routes
router.post('/login', passport.authenticate('local-login', { 
	successRedirect: '/profile',
	failureRedirect: '/login',
	failureFlash: true

 }));


router.get('/login', function(req, res, next){
	if(req.user) return res.redirect('/');
	res.render('accounts/login', { message: req.flash('loginMessage') 
	});
});

//LOGIN routes

//LOGOUT routes

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/home');
});

//LOGOUT routes


//export route for serverjs
module.exports = router;