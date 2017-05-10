const fs = require('fs');
const uuid = require('uuid');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const getColors = require('get-image-colors');
const rgb2hex = require('rgb2hex');
const Filter = require('node-image-filter');


//media type - img , video --server side
//photo type - user , cover , logo , normal img

var photosUpload = function (req, res, next) {
    var myFile = "";
    var FilesNames = [];
    var results = {};
    var photoArray = [];
    var allFiles = {};
    var pType = 1;
    var activeFlag = 1;
    var timelineids = 1;
    
    
    
  var urlsString = req.hostname;
    if (req.hostname === 'localhost' || req.hostname.indexOf('192.168.') !== -1) {
        urlsString = urlsString + '/album';
    }
    urlsString += '/uploads';
        
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './uploads');
        },
        
        filename: function (req, file, callback) {
            myFile = "" + uuid.v1() + path.extname(file.originalname);
            var fileDetails = {};
            FilesNames.push(urlsString + "/" + myFile);
            var photoPath =urlsString+ + "/" + myFile;
            if (timelineids)
            {
                var tids = [1];
                tids.forEach(function (vk, i) {
                    var dTime = new Date().getTime();
                    var photoId;
                    var rNum = getRandomInt(1, 9);
                    photoId = '' + rNum + '' + dTime;
                    fileDetails.photId = photoId;
                    fileDetails.filePath = (urlsString + "/" + myFile);
                    photoArray.push(fileDetails);
                    callback(null, myFile);
                });
            }
        }
    });
    var upload = multer({storage: storage}).array('userPhoto', 100);
    upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        allFiles.filePaths = FilesNames;
        
        FilesNames.forEach(function(vl,i){
            var tvl=vl.split('album/uploads/');
            
            console.log(vl)
            var image = sharp('uploads/'+tvl[1]);
            var hexcode = [];
            
 
            getColors('uploads/'+tvl[1]).then(colors => {
                colors.forEach( function(vz, k) {
                    var hexdata = (rgb2hex('rgb('+vz._rgb[0]+','+vz._rgb[1]+','+vz._rgb[2]+')'));
                    hexcode.push(hexdata.hex);
                });
            }).then(function(){
                console.log(hexcode);
            });
            
            
            var sizes = [
                {path: 'uploads/versions/240/',w: 240},
                {path: 'uploads/versions/360/',w: 360},
                {path: 'uploads/versions/480/',w: 480},
                {path: 'uploads/versions/720/',w: 720},
                {path: 'uploads/versions/1080/',w: 1080},
                {path: 'uploads/versions/1280/',w: 1280},
                {path: 'uploads/versions/1440/',w: 1440},
                {path: 'uploads/versions/1920/',w: 1920}
            ];
           
            sizes.forEach(function(size){
                image
                .metadata()
                .then(function(metadata) {
                    if(metadata.width>1920) {
                        var nw = 1920;
                    }
                    else
                        var nw = metadata.width;
                    return image
                    .resize( size.w)
                    .toFile(size.path+tvl[1], function(err, info) {
                        console.log("err");
                        console.log(err);
                        console.log("info");
                        console.log(info);
                    });

                }).catch(function (msg) {
                    console.log(msg);
                    return 1;
                });
            });
        });
        allFiles.details = photoArray;
    });
    
};



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    photosUpload: photosUpload};