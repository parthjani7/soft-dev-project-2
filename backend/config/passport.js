// Load the module dependencies
const passport = require('passport');
const mongoose = require('mongoose');
// Define the Passport configuration method
module.exports = function() {
    const User = require("../models/user.model"); // Load the 'User' model
	// Use Passport's 'serializeUser' method to serialize the user id
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	// Use Passport's 'deserializeUser' method to load the user document
	passport.deserializeUser((id, done) => {
		User.findOne({
			_id: id
		}, '-password -salt', (err, user) => {
			done(err, user);
		});
    });
    require('./strategies/local.js')(); // Load Passport's strategies configuration files
};