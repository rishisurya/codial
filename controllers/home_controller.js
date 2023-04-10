const Post = require('../models/post');

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



    // // with pre-population of user of each post
    // Post.find({}).populate('user')
    //  .then((post)=>{
    //     return response.render('home',{
    //         title:"Home Page",
    //         post: post
    //     })
    // })
    // .catch((err)=>{
    //     console.log('Error in fetchting data drom db');
    //      return ;
    //     }
    // )
    // };


    // nested-populating
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
     .then((post)=>{
        return response.render('home',{
            title:"Home Page",
            posts: post
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