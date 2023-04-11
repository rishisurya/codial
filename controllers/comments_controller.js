const Comment = require('../models/comments');
const Post = require('../models/post');


module.exports.create = function(request,response){
    Post.findById(request.body.post)
    .then((post)=>{
        if(post){
            Comment.create({
                content: request.body.content,
                user:request.user._id,
                post:request.body.post
            })
            .then((comment)=>{
                post.comments.push(comment);
                post.save();
                response.redirect('/')
            })
            .catch((err)=>{
                console.log('Error in creating data into comment')
                return response.redirect('back');
            })
        }else{
            return response.redirect('back');}
    }).catch((err)=>{
        return response.redirect('back');
    })
};


module.exports.destroy = function(request,response){
    Comment.findById(request.params.id)
    .then((comment)=>{
        if(comment && comment.user == request.user.id){
            let postid = comment.post;
            comment.remove();
            Post.findByIdAndUpdate('postid',{$pull:{comments:request.params.id}})
            .then(()=>{return response.redirect('back')})
            .catch((err)=>{return response.redirect('back')})
        }else{return response.redirect('back')}
    })
    .catch((err)=>{return response.redirect('back')})
};