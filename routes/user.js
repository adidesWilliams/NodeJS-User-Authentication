var router = require('express').Router();

router.get('/register', function (req, res, next){
	res.render('accounts/register');

});

router.get('/login', function(req, res, next){
	res.render('accounts/login');
});


//export route for serverjs
module.exports = router;