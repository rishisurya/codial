const Comment = require('../models/comments');
const Post = require('../models/post');
const commentsMailer = require('../mailer/comment_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/likes');

// module.exports.create = function(request,response){
//     Post.findById(request.body.post)
//     .then((post)=>{
//         if(post){
//             Comment.create({
//                 content: request.body.content,
//                 user:request.user._id,
//                 post:request.body.post
//             })
//             .then((comment)=>{
//                 post.comments.push(comment);
//                 post.save();
//                 request.flash('success','Comment published');
//                 response.redirect('/')
//             })
//             .catch((err)=>{
//                 console.log('Error in creating data into comment')
//                 return response.redirect('back');
//             })
//         }else{
//             return response.redirect('back');}
//     }).catch((err)=>{
//         return response.redirect('back');
//     })
// };

//async await
// module.exports.create = async function(req, res){

//     try{
//         let post = await Post.findById(req.body.post);

//         if (post){
//             let comment = await Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             });

//             post.comments.push(comment);
//             post.save();
//             if (req.xhr){
                // Similar for comments to fetch the user's id!
//             comment = await comment.populate('user', 'name').execPopulate();
//                 return res.status(200).json({
//                     data: {
//                         comment: comment
//                     },
//                     message: "Post created!"
//                 });
//             }


//             req.flash('success', 'Comment published!');

//             res.redirect('/');
//         }
//     }catch(err){
//         req.flash('error', err);
//         return;
//     }
    
// };

module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            // Similar for comments to fetch the user's id!
            comment = await comment.populate('user', 'name email').execPopulate();
            
            
            // commentsMailer.newComment(comment);
            
            let job = queue.create('emails', comment).save(function(err){
                if (err){
                    console.log('Error in sending to the queue', err);
                    return;
                }
                console.log('job enqueued', job.id);

            });


            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }


            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
};


// module.exports.destroy = function(request,response){
//     Comment.findById(request.params.id)
//     .then((comment)=>{
//         if(comment && comment.user == request.user.id){
//             let postid = comment.post;
//             comment.remove();
//             request.flash('error','Comment deleted');
//             Post.findByIdAndUpdate('postid',{$pull:{comments:request.params.id}})
//             .then(()=>{ return response.redirect('back')})
//             .catch((err)=>{return response.redirect('back')})
//         }else{return response.redirect('back')}
//     })
//     .catch((err)=>{return response.redirect('back')})
// };



module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
            

            // CHANGE :: destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

            
            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('error', 'Comment deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}