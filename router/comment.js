const express = require('express');
const router = express.Router();
const passport = require('passport');

const comment_controller =  require('../controllers/comments_controller');

router.post('/create',passport.checkAuthentication,comment_controller.create);
module.exports = router;