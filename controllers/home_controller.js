const Posts = require('../models/post');

module.exports.home = function(request,response){
    // console.log(request.cookies);
    // to alter cookies
    //response.cookie('surya',100);

// no preporpulating
    // Posts.find({})
    // .then((Posts)=> response.render('home',{
    //     title:"Home Page",
    //     posts: Posts
    // })).catch((err)=>console.log('Error in fetching from db'))

    // with preporlation of user of each post
    Posts.find({}).populate('user')
    .then((posts)=>{
        return response.render('home',{
            title:"Home Page",
            posts : posts
        })
    })
    .catch((err)=>{
        console.log('Error in fetchting data drom db');
         return ;
        }
    )
    };


module.exports.thanks = function(request,response){
    response.end('<h1> Welcome to the Thanks page</h1>')
}



console.log('home_controller are loaded');