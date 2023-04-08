// https://www.passportjs.org/packages/passport-local/
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authenticate using passport
passport.use(new LocalStrategy(
    // {
    // usernameFeild : 'email',
    // passwordField: 'passwd',
    // session: false
    // },
    function(email,password,done){
        // finding the user in the db
        console.log('came');
        User.find({email:email})
        .then((user)=>{
            if(!user || user.password != password){
                console.log("Invalid username and password")
                return done(null,false);
            }else{
            return done(null,user);}
        })
        .catch((err)=>{
            console.log('Error in finding user---> passport');
            return done(err);
        })
    }
    ));
// serializing the user to decide which key to be kept in the cookies
passport.serializeUser(function(user,done){
    return done(null,user.id);
});

//deserilizing the user from the key in th cookie
passport.deserializeUser(function(id,done){
    User.findById(id)
    .then((user)=>{ return done(null,user);})
    .catch((err)=>{crossOriginIsolated.log('Error in finding user---> passport'); return done(err);})
});

console.log('passport is working');
module.exports = passport;