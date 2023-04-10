const Post = require('../models/post');
module.exports.create = function(request,response){
    Post.create({
        content :request.body.content,
        user : request.user._id
    })
    .then(
        (post)=>{
            return response.redirect('back');
        }
        )
    .catch(
        (err)=>{
            console.log('Error in crating a post'); 
            return;
        }
        )
};