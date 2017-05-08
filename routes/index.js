var express = require('express');
var router = express.Router();
var path = require('path');

var storyControllerObj = require('../controllers/storyController.js');

router.get('/allstories/:lt/:st', storyControllerObj.getStoryData);//version
router.get('/storyDetails/:storyId', storyControllerObj.getStoryDetails);//version


var uploadPhotoVideoControllerObj =  require('../controllers/uploadPhotoVideoController.js');
router.post('/photosUpload/:storyId/:ptype', uploadPhotoVideoControllerObj.photosUpload);//version


module.exports = router;