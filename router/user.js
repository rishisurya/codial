const express = require('express');
const router = express.Router();


const passport = require('passport');
// const passportLocal = require('../config/passport-local-strategy'); 


const userController = require('../controllers/user_controller');


router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.get('/signup',userController.signup);
router.get('/signin',userController.signin);
router.post('/create',userController.create);

// router.post('/create-session',passport.authenticate('local',{failureRedirect:'/user/signin'}),userController.createSession);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/signin'
    // successRedirect:'/user/profile'
},
), userController.createSession);

router.post('/signout',userController.signout);
router.get('/signout',userController.signout);
router.post('/update/:id',passport.checkAuthentication,userController.update);


router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/signin'}), userController.createSession);


console.log('user router is loaded');
module.exports = router;