const bcrypt = require('bcrypt');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userM = require('../app/models/user');

module.exports = app => {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (token, done) {
        done(null, token);
    });

    passport.deserializeUser(async function (token, done) {
        try {
            const user = await userM.searchCustomerByToken(token);
            done(null, user.UserID);
        }
        catch (err) {
            done(err, null, { message: 'error server' });
        }
    });

    passport.use(new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
    },
        async (token, done) => {
            try {
                const user = await userM.searchCustomerByToken(token);
                if (!user) {
                    return done(null, false, { message: 'Incorrect username' });
                }
                return done(null, token);
            } catch (error) {
                return done(error, { message: 'error server' });
            }
        }
    ))
}

