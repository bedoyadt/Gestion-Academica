const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

// SIGNUP
router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

// SINGIN
router.get('/signin', (req, res) => {
    res.render('auth/signin');
});
//id_alumno	nombre_alumnos	email	password
router.post('/signin', (req, res, next) => {
    req.check('email', 'Se requiere Email').notEmpty();
    req.check('password', 'Se requiere contraseña').notEmpty();
    const errors = req.validationErrors();
    if (errors.length > 0) {
        req.flash('message', errors[0].msg);
        res.redirect('/signin');
    }
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});


router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});
//funcion para contatecnos



module.exports = router;