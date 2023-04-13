// firing EXpress
const express = require('express');

// importing cookir-parser
const cookieParser = require('cookie-parser');

const app = express()

const port = 8000;

// use layouts
const expressLayouts = require('express-ejs-layouts');

// conecting mongodb
const db = require('./config/mongoose');

// loading mongoose collection
const User = require('./models/user');

//used for session coockie and authentication password
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy'); 
const passportJwt = require('./config/passort-jwt-strategy');

// importing connectmongo
const mongoStore = require('connect-mongo')(session);
const sassMiddileware = require('node-sass-middleware');

//importing flash
const flash = require('connect-flash');

// import custom middileware
const customMware = require('./config/middleware');

app.use(sassMiddileware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'
}));



// middileware to get form data
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded());

// middileware to create cookies
app.use(cookieParser());

//middleware to use layputs in views
app.use(expressLayouts);

// extracting Style and Script files from sub pages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// acessing static files
app.use(express.static('./assets'))

// making the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));


// setting ip the views
app.set('view engine','ejs');
app.set('views','./views');

// middileware to use passport
// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new mongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

//setting flash after session as it uses session coockies
app.use(flash())

// setting custom middileware
app.use(customMware.setFlash);

app.use(passport.setAuthenticatedUser)

// use express router
app.use('/',require('./router'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running server: ${err}`)
        // return;
    }
    console.log(`the server runnning well on : ${port}`)
});