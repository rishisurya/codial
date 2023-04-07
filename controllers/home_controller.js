
module.exports.home = function(request,response){
    console.log(request.cookies);
    // to alter cookies
    //response.cookie('surya',100);
    return response.render('home',{
        title:'Home Page'
    });
};

module.exports.thanks = function(request,response){
    response.end('<h1> Welcome to the Thanks page</h1>')
}



console.log('home_controller are loaded');