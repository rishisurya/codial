const User = require('../models/user');


// //before profile
// module.exports.profile = function(request,response){
//     // response.end('<h1> User profile</h1>')
//    return response.render('profile',{
//         title:'User Profile'
//     });
// };

//after profile

module.exports.profile = function(request,response){
    if(request.cookies.user_id){
        User.findById(request.cookies.user_id)
        .then((user)=>{
            if(!user){
                return response.redirect('/user/signin');
            }
            return response.render('profile',{
                title:"user Profile",
                user : user
            })
        })
        .catch()
    }
    else{
        return response.redirect('/user/signin');
    }
};


// rendering signup page
module.exports.signup = function(request,response){
    return response.render('signup',{
        title:'Sign Up'
    });
};
//render signin page
module.exports.signin = function(request,response){
    return response.render('signin',{
        title:'Sign in'
    });
};

//get data from signup
module.exports.create = function(request,response){
    // checking passwords and confirm_passwords are same
    if(request.body.password != request.body.Confirm_password){
        return response.redirect('back');
        }// checking that eamil has already having account or not
    User.findOne({email:request.body.email})
    .then((user)=>{
        if(!user){// if not hvaing account
            User.create(request.body)//creating account
            .then((user)=>  { return response.redirect('/user/signin')})
            .catch((err)=>{console.log('Error ion creating')})
        }else 
        {return response.redirect('back')}})//if already having account
    .catch((err)=>{console.log('Error in finding the contact'); return;})
};

// signin and create a session for user
module.exports.createSession = function(request,response){
    User.findOne({email:request.body.email})
    .then((user)=> { 
        if(user){ 
            if(user.password!=request.body.password){ return response.redirect('back');}
            response.cookie('user_id',user.id);
            return response.redirect('/user/profile');
        }
        else{
            response.redirect('back');
        }

    })
    .catch((err)=>{console.log("Error in finfind user"); return;})
};

// handling signout
module.exports.signout = function(request,response){
    response.clearCookie("user_id");
    return response.redirect('/user/signin');
}


console.log('User_controller is loaded')