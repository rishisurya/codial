const express = require('express');
var router = express.Router();

const post_api = require('../../../controllers/api/v2/posts_api');

router.use('/',post_api.index);


module.exports = router;