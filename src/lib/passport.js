const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');
//id_alumno	nombre_alumnos	email	password
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    const rows = await pool.query('SELECT * FROM alumnos WHERE email = ?', [email]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password)
        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido ' + user.nombre_alumnos));
        } else {
            done(null, false, req.flash('message', 'Contraseña incorrecta'));
        }
    } else {
        return done(null, false, req.flash('message', 'El nombre de usuario no existe.'));
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {

    const { nombre_alumnos } = req.body;
    let newUser = {
        nombre_alumnos,
        email,
        password
    };
    newUser.password = await helpers.encryptPassword(password);
    // Saving in the Database
    const result = await pool.query('INSERT INTO alumnos SET ? ', newUser);
    newUser.id_alumno = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id_alumno);
});

passport.deserializeUser(async(id_alumno, done) => {
    const rows = await pool.query('SELECT * FROM alumnos WHERE id_alumno = ?', [id_alumno]);
    done(null, rows[0]);
});