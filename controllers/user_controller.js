const User = require('../models/user');
const path = require('path');
const fs = require('fs');


// // before profile
// module.exports.profile = function(request,response){
//     // response.end('<h1> User profile</h1>')
//    return response.render('profile',{
//         title:'User Profile'
//     });
// };

// //final profile
module.exports.profile = function(request,response){
    
    User.findById(request.params.id).then((user)=>{
        return response.render('profile',{
            title:'User Profile',
            profile_user:user
        });
    });

};

// // before
// module.exports.update = function(request,response){
//     if(request.user.id == request.params.id){
//         User.findByIdAndUpdate(request.params.id,{name:request.body.name, email:request.body.email})
//         .then((user)=>{
//             return response.redirect('back');
//         })
//         .catch((err)=>{
//             return response.redirect('back');
//         });
//     }else{return response.status(401).send("unauthorised")}
// };


//  async await and avatar
module.exports.update = async function(request,response){
    if(request.user.id == request.params.id){    
        try{
            let user = await User.findById(request.params.id);

            User.uploadAvatar(request,response,function(err){
                if(err){console.log("Multer Error",err)}
                user.name = request.body.name;
                user.email = request.body.email;
                if(request.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                    }
                    // this is saving the path od uploded avatar into avtar field in user
                    user.avatar = User.avatarPath + '/' + request.file.filename
                }
                user.save();
                return response.redirect('back');
            });

        }catch(err){
            request.flash('error',err);
            return response.redirect('back');
        }
    }else{
        request.flash('error','unauthorized');
        return response.status(401).send("unauthorised")
        }
    };



// rendering signup page
module.exports.signup = function(request,response){
    if(request.isAuthenticated()){
        return response.redirect('/user/profile')
    };
    return response.render('signup',{
        title:'Sign Up'
    });
};
//render signin page
module.exports.signin = function(request,response){
    if(request.isAuthenticated()){
        return response.redirect('/user/profile')
    };
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
    request.flash('success','Logged in successfully!');
    return response.redirect('/');
};

// handling signout
module.exports.signout = function(request,response){
    request.logout();
    request.flash('success','Signed Out!');
    return response.redirect('/');
}


console.log('User_controller is loaded')