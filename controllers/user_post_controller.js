module.exports.like = function(request,response){
    // response.end('<H1>User post is liked</H1>');
    return response.render('likes',{
        title:'Post Like'
    });
};

console.log('post controller is loaded')