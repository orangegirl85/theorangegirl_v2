const User = require('../models').User;
const LocalStrategy = require('passport-local').Strategy;

const strategyOptions = {
    usernameField: 'email'
};

exports.login = new LocalStrategy(strategyOptions, (email, password, done) => {

    const searchUser = {
        email
    };



    User.findOne({
        where: searchUser
    }).then(user => {
        //if (err) return done(err);

        if (!user) return done(null, false, {
            message: 'Wrong email/password'
        });

        user.comparePasswords(password, (err, isMatch) => {
            if (err) return done(err);

            if (!isMatch) return done(null, false, {
                message: 'Wrong email/password'
            });

            return done(null, user);
        });
    })
});

exports.register = new LocalStrategy(strategyOptions, (email, password, done) => {
    const searchUser = {
        email
    };

    User.findOne({
        where: searchUser
    }).then(user => {
        if (user) return done(null, false, {
            message: 'email already exists'
        });

        User.create({
            email,
            password,
            displayName: 'aaa'
        }).then(user => {
            done(null, user);
        });

    })

});

// NOTE: Need to protect all API calls (other than login/logout) with this check
exports.ensureAuthenticated = (req, res, next) => {
    console.log('Calling: ensureAuthenticated.....');
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.send(401);
    }
}

exports.ensureAdmin = (req, res, next) => {
    // ensure authenticated user exists with admin role, otherwise send 401 response status
    console.log('Calling: ensureAdmin.....');
    if (req.user && req.user.role == 'ADMIN') {
        return next();
    } else {
        return res.send(401);
    }
}