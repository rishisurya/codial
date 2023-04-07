const express = require('express');
const router = express.Router();
const postController = require('../controllers/user_post_controller');

router.get('/like',postController.like);

console.log('post router is loaded')
module.exports = router;