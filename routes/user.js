var router = require('express').Router();
var User = require('../models/user');
var passport = require('passport');

router.get('/', function(req, res){
	res.json("Hello from the home page");
});

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
				res.redirect('/');
			});
		}
	});


});

router.get('/register', function (req, res, next){
	res.render('accounts/register', { 
		errors: req.flash('errors') 
	});
});





router.get('/login', function(req, res, next){
	res.render('accounts/login');
});




//export route for serverjs
module.exports = router;