module.exports.like = function(request,response){
    // response.end('<H1>User post is liked</H1>');
    return response.render('likes',{
        title:'Post Like'
    });
};

module.exports.comment = function(request,response){
    // response.end('<H1>User post is liked</H1>');
    return response.render('likes',{
        title:'coments added'
    });
};

module.exports.report = function(request,response){
// TODO 
};

console.log('post controller is loaded')