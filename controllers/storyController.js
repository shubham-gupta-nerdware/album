var MongoClient = require('../config/db.js').MongoClient;
var url = require('../config/db.js').url;


var addStory = function(req, res, next){
  var storyId = req.body.storyId;
  var data = {};
  




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
    getStoryDetails : getStoryDetails
};




