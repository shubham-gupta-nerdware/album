var MongoClient = require('../config/db.js').MongoClient;
var url = require('../config/db.js').url;


var addStory = function (req, res, next) {
    var debug = (req.body.debug ? req.body.debug : 0);
    var slashes = require('slashes');
    var homeId = validationObj.validateIDWithZero(req.body.hId);
    var homeName = req.body.hName;
    var homeListingType = req.body.hType;
    var price = req.body.price;
    var availableFrom = req.body.avlFrm;
    var completeAddress = req.body.hAddr;
    var postalCode = req.body.pstCode;
    var active_flag = (req.body.activeFlag ? req.body.activeFlag : 0);
    var homeState = (req.body.hArea ? req.body.hArea : ' ');
    var homeCity = (req.body.hCt ? req.body.hCt : ' ');
    var homeDescription = req.body.hDesc;
    var street_address = req.body.street;
    var video_link = req.body.videoLink;
    var bedRooms = req.body.hBedRm;
    var bathRooms = req.body.hBathRm;
    var features = req.body.hAmnities;
    var homeTypeId = req.body.hTypeId;
    var lat = req.body.lat;
    var lng = req.body.lng;
    var home_thought = req.body.hThought;
    var home_creator = req.body.hCreator;
    var imagesObj = req.body.imagesArr;
    var hood_id = req.body.hoodId;
    var poa_status =req.body.poa;
    
    if(poa_status == 1)
        price = 0;
    
    var results = [];
    var retArr = {};
    var error = {};
   var homedetails = { 'homeId':parseInt(homeId),'homeName':homeName,'price' : price ,'poa_status':poa_status,'home_creator':home_creator,'homeListingType' : homeListingType, 'availableFrom' :availableFrom, 'lat' : lat, 'lng' : lng, 'completeAddress' : completeAddress,'postalCode' : postalCode , 'homeCity' : homeCity ,'homeState' : homeState,'homeDescription' : homeDescription,'street_address' : street_address,'active_flag' : active_flag,'hood_id'  : hood_id,'bedRooms' : bedRooms,'bathRooms' : bathRooms ,'features' : features,'homeTypeId' : homeTypeId,'video_link' : video_link };
   
     MongoClient.connect(url, function(err, db) {
            if(err){
               error.errorCode = 0;
                error.errorMsg = 'Error while connecting';
                retArr.result = results;
                retArr.error = error;
                res.json(retArr);
                return 1;
            }else{
                  var collectionUser =db.collection('user_information');
                  var collectionhome =db.collection('home_details'); 
                    
                     
                  var creatorDetais=   collectionUser.find({userid:parseInt(home_creator)});
                  var i=0;
                  creatorDetais.each(function(err,documents){
                           
                             //homedetails.home_creator=documents;
                             if(documents!= null){
                             
                             homedetails.home_creator = documents;
                             
                             //console.log(homedetails);
                             collectionhome.update(
                             {homeId:homeId},
                             {$set:homedetails},
                             { upsert: true}
                            );
                         }
                        
                        });
                   
             
             
                error.errorCode = 0;
                error.errorMsg = 'Home Details Added Successfully';
                retArr.result = results;
                retArr.error = error;
                res.json(retArr);
                return 1;
          }
        });
    
            
        
           
            
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
                    error.errorCode = 1;
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
                    error.errorCode = 1;
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




