

//define UserSchema
var UserSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	password: String,
	name: { type: String, default: '' }
}); 



//hash password
UserSchema.pre('save', function(next){
	if(!user.isModified('password')) return next();

	bcrypt.genSalt(10, function(err, salt){
		if(err) return next(err);
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err) return next(err);
			user.password = hash;
			next();
		});
	});
});

//compare password entered by user with hashed password in database
UserSchema.methods.comparePassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);