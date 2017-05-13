var MongoClient = require('../config/db.js').MongoClient;
var url = require('../config/db.js').url;
var validationCheck = require('../middleCheck/validationCheck.js');
var validationCheckObj = new validationCheck();

var getStoryId=function(req, res, next){
  var storyId = validationCheckObj.generateId();
  res.json({results: {storyId:storyId}, error:{errorCode : 0 , errorMsg:"Successfully created storyId"}}); 
};

var addStory = function(req, res, next){
    
    console.log(req.body);
    
   var db = req.app.locals.db;
  var storyId = req.body.storyId;
  var data = {};
  data['story_id'] = parseInt(storyId);
  
  var result = {};
        var retArr = {};
        var results = [];
        var error = {};
  if(validationCheckObj.checkEmpty(req.body.writen_by)) {
      data['writen_by'] = req.body.writen_by;
    }

    if(validationCheckObj.checkEmpty(req.body.writen_by_name_initials)) {
      data['writen_by_name_initials'] = req.body.writen_by_name_initials;
    }


    if(validationCheckObj.checkEmpty(req.body.writen_by_img)) {
      data['writen_by_img'] = req.body.writen_by_img;
    }


    if(validationCheckObj.checkEmpty(req.body.storyJson)) {
      data['story_json'] = req.body.storyJson;
    }


     if(validationCheckObj.checkEmpty(req.body.story_heading)) {
      data['story_heading'] = req.body.story_heading;
    }

     if(validationCheckObj.checkEmpty(req.body.story_heading_description)) {
      data['story_heading_description'] = req.body.story_heading_description;
    }

    if(validationCheckObj.checkEmpty(req.body.story_cover_photo_path)) {
      data['story_cover_photo_path'] = req.body.story_cover_photo_path;
    }

    if(validationCheckObj.checkEmpty(req.body.story_cover_photo_code)) {
      data['story_cover_photo_code'] = req.body.story_cover_photo_code;
    }

    if(validationCheckObj.checkEmpty(req.body.story_cover_photo_slice_code)) {
      data['story_cover_photo_slice_code'] = req.body.story_cover_photo_slice_code;
    }

      if(validationCheckObj.checkEmpty(req.body. story_photo)) {
      data[' story_photo'] = req.body. story_photo;
    }

    if(validationCheckObj.checkEmpty(req.body.story_title)) {
      data['story_title'] = req.body.story_title;
    }

     var collectionstory = db.collection('story_details');
      collectionstory.update(
            { channelId : data['storyId'] },
            {$set:data},
            { upsert: true }    
         ); 
                    result.storyId=storyId;
                    retArr.result = result;
                    error.errorCode = 0;
                    error.errorMsg = "Story added Successfully";
                    retArr.error = error;
                    res.json(retArr);
                    return 1;
};


var getStoryData = function(req, res, next ){
  var db = req.app.locals.db;
        var result = {};
        var retArr = {};
        var results = [];
        var error = {};
   var st = parseInt(req.params.st);
   var lt = parseInt(req.params.lt);
   // MongoClient.connect(url, function(err, db) {
        db.collection('story_details', function(err, collection) {
            if (err)
                return console.log('error opening users collection, err = ', err);
            collection.find().limit(st).skip(lt).toArray(function (err, results) {
                if (err)
                    return console.log('error initiating find on users, err = ', err);
                else{
                   result=results;
                   retArr.results = result;
                    error.errorCode = 0;
                    error.errorMsg = "Data fetched Successfully";
                    retArr.error = error;
                    res.json(retArr);
                    return 1;
                }
            });
          
        });
   //});
};



var getStoryDetails = function(req, res, next ){
      
     console.log(req.hostname);
    var sid = req.params.storyId;
    
   // MongoClient.connect(url, function(err, db) {
      var db = req.app.locals.db;
      var result = {};
        var retArr = {};
        var results = [];
        var error = {};

        var collectionstory = db.collection('story_details');
        var creatorDetais=   collectionstory.find({story_id:parseInt(sid)});
        var i=0;
        creatorDetais.each(function(err,documents){
           
            if (err)
                return console.log('error opening users collection, err = ', err);
            else{
                if(documents){
                    result=documents;
                    retArr.results = result;
                    error.errorCode = 0;
                    error.errorMsg = "Data fetched Successfully";
                    retArr.error = error;
                    res.json(retArr);
                    return 1;
                }else{
                    
                    retArr.results = result;
                    error.errorCode = 0;
                    error.errorMsg = "No Data Found";
                    retArr.error = error;
                    res.json(retArr);
                    return 1; 
                }
               
               
             return 1;
             //db.close();
            }
        });
    //});
};


module.exports = {
    addStory : addStory,
    getStoryData : getStoryData,
    getStoryDetails : getStoryDetails,
    getStoryId : getStoryId

};




