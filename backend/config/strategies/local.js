// Load the module dependencies
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');
const session = require('express-session');
// Create the Local strategy configuration method
module.exports = function() {
	// Use the Passport's Local strategy 
	passport.use(new LocalStrategy({ usernameField: "email"},function(email, password, done) {
		// Use the 'User' model 'findOne' method to find a user with the current username
		User.findOne({
            email: email,
            password: password
		}, (err, user) => {
			// If an error occurs continue to the next middleware
			if (err) {
				return done(err);
			}
			// If a user was not found, continue to the next middleware with an error message
			if (!user) {
				return done(null, false, {
					message: 'Unknown user'
				});
            }
            session.user = user;
			return done(null, user);
		});
	}));
};