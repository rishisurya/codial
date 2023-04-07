// firing EXpress
const express = require('express');
const port = 8000;
const app = express()
// conecting mongodb
const db = require('./config/mongoose');
// loading mongoose collection
const User = require('./models/user');
// importing cookir-parser
const cookieParser = require('cookie-parser');

// use layouts
const expressLayouts = require('express-ejs-layouts');

// middileware to get form data
app.use(express.urlencoded());
// middileware to create cookies
app.use(cookieParser());


app.use(expressLayouts);
// extracting Style and Script files from sub pages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// acessing static files
app.use(express.static('./assets'))

// use express router
app.use('/',require('./router'));

// setting ip the views
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in running server: ${err}`)
        return;
    }
    console.log(`the server runnning well on : ${port}`)
});