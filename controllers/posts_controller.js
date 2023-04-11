const Post = require('../models/post');
const Comment = require('../models/comments');



// module.exports.create = function(request,response){
//     Post.create({
//         content :request.body.content,
//         user : request.user._id
//     })
//     .then(
//         (post)=>{
//             return response.redirect('back');
//         }
//         )
//     .catch(
//         (err)=>{
//             console.log('Error in crating a post'); 
//             return;
//         }
//         )
// };

module.exports.create = async function(request,response){
    try{
        await Post.create({
            content :request.body.content,
            user : request.user._id
        })
        request.flash('success','Post published');
        return response.redirect('back');
    }catch(err){
        console.log('Error in crating a post'); 
        return;}
};

// module.exports.destroy = function(request,response){
//     Post.findById(request.params.id)
//     .then((post)=>{
//             if(post.user == request.user.id){
//                 post.remove();
//                 Comment.deleteMany({post:request.params.id}).then(()=>{return response.redirect('back');}).catch((err)=>console.log("3"))
//             }
//         else{ return response.redirect('back');}
//     })
//     .catch((err)=>{console.log(err);
//         return response.redirect('back');})
// };

module.exports.destroy = async function(request,response){
    try{
        let post = await Post.findById(request.params.id)

        if(post.user == request.user.id){
            post.remove();
            await Comment.deleteMany({post:request.params.id});
            request.flash('error','Post deleted');
            return response.redirect('back');
        } else{ return response.redirect('back');}

    }catch(err){
        console.log(err);
        return response.redirect('back');}
};


