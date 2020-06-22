const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User Model
var User = require('../models');

// Login Page
router.get('/login', (req,res) => res.render('login'));

// Register Page
router.get('/register', (req,res) => res.render('register'));

// Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } =  req.body;

    let errors = [];

    // Check Empty Feilds
    if (!name || !email || !password || !password2){
        errors.push({ msg: 'Please Fill In All Fields!!!' });
    }

    // Check Password Match
    if (password !== password2){
        errors.push({ msg: 'Passwords Do Not Match!!!' });
    }

    // Check Password Minimum Length
    if (password.length < 6){
        errors.push({ msg: 'Password Must Be Greater Than 6 Characters!!!' })
    }

    if (errors.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }
    else{
        // Validation Pass
        User.findOne({ where: { email: email } })
            .then((useremail) => {
                if(useremail){
                    errors.push({ msg: 'Email Already Registered!!!' });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                }
                else{
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    
                    // Hash Password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) =>{
                            if (err) throw err;

                            // Set Password To Hashed
                            newUser.password = hash;

                            // Save User
                            newUser.save()
                                .then(() => {
                                    req.flash(
                                        'success_msg',
                                        'You Are Successfully Registered and Now You Can Log In'
                                    );
                                    res.redirect('/users/login');
                                })
                                .catch((err) => console.log(err));
                        })
                    })
                }
            })
            .catch((err) => {'Error Inserting The User On DB!!!', err});
    }
});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout Handle
router.get('/logout', (req,res) => {
    req.logOut();
    req.flash('success_msg', 'You Are Successfully Logged Out!!!');
    res.redirect('/users/login');
});


module.exports = router;