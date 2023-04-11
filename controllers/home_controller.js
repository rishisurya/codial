const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(request,response){
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


    // // nested-populating
    // Post.find({})
    // .populate('user')
    // .populate({
    //     path:'comments',
    //     populate:{
    //         path:'user'
    //     }
    // })
    //  .then((post)=>{
    //     User.find({}).then((users)=>{
    //     return response.render('home',{
    //         title:"Home Page",
    //         posts: post,
    //         users : users
    //     })}).catch((err)=>{console.log("error in finding users"); return;})
    // })
    // .catch((err)=>{
    //     console.log('Error in fetchting data drom db');
    //      return ;
    //     }
    // )

    //Async Await
    try{
        let post = await Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });

        let users = await User.find({});

        return response.render('home',{
            title:"Home Page",
            posts: post,
            users : users
        }) 
    }catch(err){ console.log('Error',err); return;}

    };


module.exports.thanks = function(request,response){
    response.end('<h1> Welcome to the Thanks page</h1>')
}



console.log('home_controller are loaded');