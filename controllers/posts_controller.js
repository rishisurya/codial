const Post = require('../models/post');
const Comment = require('../models/comments');

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

module.exports.destroy = function(request,response){
    Post.findById(request.params.id)
    .then((post)=>{
            if(post.user == request.user.id){
                post.remove();
                Comment.deleteMany({post:request.params.id}).then(()=>{return response.redirect('back');}).catch((err)=>console.log("3"))
            }
        else{ return response.redirect('back');}
    })
    .catch((err)=>{console.log(err);
        return response.redirect('back');})
};


