// https://www.passportjs.org/packages/passport-local/
const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

// authentication using passport
// passport.use(
//     new LocalStrategy(
//         {
//             usernameField: "email",
//             passReqToCallback:true
//         },
//         function (req,email, password, done) {
//             User.find({ email: email })
//                 .then((user) => {
//                     if (!user || user[0].password !== password) {
//                         req.flash("error","Invalid username and Password");
//                         console.log("Invalid username and password");
//                         return done(null, false);
//                     } else {
//                         return done(null, user);
//                     }
//                 })
//                 .catch((err) => {
//                     req.flash("error",err);
//                     console.log("Error in finding user---> passport");
//                     return done(err);
//                 });
//         }
//     )
// );


passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback:true
        },
        function (req,email, password, done) {
            User.findOne({ email: email })
                .then((user) => {
                        if ( !user || user.password !== password) {
                            req.flash("error","Invalid username and Password");
                            console.log("Invalid username and password");
                            return done(null, false);
                        }
                        else {
                            return done(null, user);
                        }
                    })
                .catch((err) => {
                    req.flash("error",err);
                    console.log("Error in finding user---> passport");
                    return done(err);
                });
        }
    )
);


// serializing the user to decide which key is to be kept in the cookies
// passport.serializeUser(function (user, done) {
//     done(null, user[0].id);
// });

passport.serializeUser(function (user, done) {
    done(null, user.id);
});
//deserilizing the user from the key in th cookie
passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then((user) => {
            return done(null, user);
        })
        .catch((err) => {
            console.log("Error in finding user---> passport");
            return done(err);
        });
});


// check if the user is authenticated
passport.checkAuthentication = function(request,response,next){
       // if the user is signed in, then pass on the request to the next function(controller's action)
    if(request.isAuthenticated()){
        return next();
        
    }
       // if the user is not signed in
    return response.redirect('/user/signin');
};

passport.setAuthenticatedUser = function(request,response,next){
    if(request.isAuthenticated()){
         // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        response.locals.user = request.user;

    }
    next();
}
module.exports = passport;