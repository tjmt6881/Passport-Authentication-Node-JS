const LocalStrategy = require('passport-local').Strategy;
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({
            usernameField: 'email'
        },
        (email, password, done) => {
            User.findOne({ where: { email: email } })
                .then((user) => {
                    if(!user) {
                        return done(null, false, { message: 'That Email Is Not Registered'});
                    }

                    // Match Password
                    bcrypt.compare(password, user.password, (err, isMatched) => {
                        if(err) throw err;

                        if(isMatched) {
                            return done(null, user);
                        }
                        else {
                            return done(null, false, { message: 'Password Incorrect' })
                        }
                    });
                })
                .catch((err) => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findByPk(id)
			.then((user) => {
				done(null, user);
			})
			.catch((err) => console.log(err));
	});
}