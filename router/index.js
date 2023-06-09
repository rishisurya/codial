const express = require('express');
var router = express.Router();

const homeController = require('../controllers/home_controller');

router.use('/user',require('./user'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comment'));
router.use('/likes', require('./likes'));

router.get('/',homeController.home);
router.get('/thanks',homeController.thanks);

router.use('/api',require('./api'))



console.log('Index Router is loaded')
module.exports = router;