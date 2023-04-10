const express = require('express');
var router = express.Router();

const homeController = require('../controllers/home_controller');

router.use('/user',require('./user'));
router.use('/posts',require('./posts'));


router.get('/',homeController.home);
router.get('/thanks',homeController.thanks);



console.log('Index Router is loaded')
module.exports = router;