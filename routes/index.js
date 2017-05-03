console.log('Magic happe'); 
var express = require('express');
var router = express.Router();
var path = require('path');

var storyControllerObj = require('../controllers/storyController.js');

router.get('/allstories/:st/:lt', storyControllerObj.getStoryData);//version
router.get('/storyDetails/:sid', storyControllerObj.getStoryDetails);//version


module.exports = router;