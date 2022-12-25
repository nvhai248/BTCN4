const bcrypt = require('bcrypt');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userM = require('../app/models/user');

module.exports = app => {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(async function (username, done) {
        try {
            const user = await userM.SearchUserByUsername(username);
            done(null, user);
        }
        catch (err) {
            done(err, null, { message: 'error server' });
        }
    });

    passport.use(new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
    },
        async (username, pw, done) => {
            try {
                const user = await userM.SearchUserByUsername(username);
                if (!user) { return done(null, false, { message: 'Incorrect username' }); }
                const cmp = await bcrypt.compare(pw, user.Password);
                if (!cmp) { return done(null, false, { message: 'Incorrect password' }); }
                return done(null, user);
            } catch (error) {
                return done(error, { message: 'error server' });
            }
        }
    ))
}

