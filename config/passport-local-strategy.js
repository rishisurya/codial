// https://www.passportjs.org/packages/passport-local/
const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

// authentication using passport
passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
        },
        function (email, password, done) {
            console.log(email);
            console.log(password);
            User.find({ email: email })
                .then((user) => {
                    console.log("inside then");
                    console.log(user);
                    console.log(user[0].password);
                    console.log(password);
                    if (!user || user[0].password !== password) {
                        console.log("Invalid username and password");
                        return done(null, false);
                    } else {
                        return done(null, user);
                    }
                })
                .catch((err) => {
                    console.log("Error in finding user---> passport");
                    return done(err);
                });
        }
    )
);

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user[0].id);
});

//deserilizing the user from the key in th cookie
passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then((user) => {
            console.log(user);
            return done(null, user);
        })
        .catch((err) => {
            crossOriginIsolated.log("Error in finding user---> passport");
            return done(err);
        });
});

module.exports = passport;