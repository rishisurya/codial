const Post = require('../../../models/post');
const Comment = require('../../../models/comments');


module.exports.index = async function(req,res){

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });


    return res.json(200,{
        message:"List of Posts in v1",
        posts:posts
    })
};

module.exports.destroy = async function(request,response){
    try{
        let post = await Post.findById(request.params.id)

            post.remove();
            await Comment.deleteMany({post:request.params.id});

            return response.json(200,{
                message:"posts and associuared comment are deleted"
            });

    }catch(err){
        console.log(err);
        return response.json(500,{
            message:"internal server error"
        });
    }
};