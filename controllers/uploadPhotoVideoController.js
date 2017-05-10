var fs = require('fs');
var uuid = require('uuid');
var multer = require('multer');
var path = require('path');
var sharp = require('sharp');
const getColors = require('get-image-colors')
var rgb2hex = require('rgb2hex');
const Filter = require('node-image-filter');

var timelinePhotoUpload = function (req, res, next) {
    var myFile = "";
    var FilesNames = [];
    var results = {};
    var photoArray = [];
    var allFiles = {};
    var pType = 1;
    var activeFlag = 1;
    var timelineids = 1;
  var urlsString = req.hostname;
        if (req.hostname === 'localhost' || req.hostname === '192.168.1.47') {
            urlsString = urlsString + '/album';
        }
        urlsString += '/uploads';
        
  
    var folderName = '';
    if (!fs.existsSync("uploads/" + folderName)) {
        fs.mkdirSync("uploads/" + folderName, 0777, function (err, callback) {
            if (err) {
                callback('folder created');
            }
        });
    }
        var d   = new Date();
        var yy  = d.getFullYear();
        var mm  = d.getMonth()+1;
        var dd  = d.getDate();
        var h   = d.getHours();
        var m   = d.getMinutes();
        var uploadedFolder = "";
         uploadedFolder = folderName;
        if (!fs.existsSync("uploads/" + uploadedFolder)) {
            fs.mkdirSync(uploadedFolder, 0777, function (err,callback) {
                if (err) {
                    callback('folder created');
                }
            });
        }
        uploadedFolder  += "/"+yy;
        if (!fs.existsSync("uploads/" +uploadedFolder)) {
            fs.mkdirSync("uploads/" +uploadedFolder, 0777, function (err,callback) {
                if (err) {
                    callback('folder created');
                }
            });
        }
        uploadedFolder  += "/"+mm;
        if (!fs.existsSync("uploads/" + uploadedFolder)) {
            fs.mkdirSync("uploads/" +uploadedFolder, 0777, function (err,callback) {
                if (err) {
                    callback('folder created');
                }
            });
        }
        uploadedFolder  += "/"+dd;
        if (!fs.existsSync("uploads/"  +uploadedFolder)) {
            fs.mkdirSync("uploads/"  +uploadedFolder, 0777, function (err,callback) {
                if (err) {
                    callback('folder created');
                }
            });
        }
        uploadedFolder  += "/"+h;
        if (!fs.existsSync("uploads/"  +uploadedFolder)) {
            fs.mkdirSync("uploads/"  +uploadedFolder, 0777, function (err,callback) {
                if (err) {
                    callback('folder created');
                }
            });
        }
        // var randomFilePath =""+ uuid.v1();
        // var randomFolderName = randomFilePath.split("-").pop();
        // uploadedFolder  += "/"+randomFolderName;
        // if (!fs.existsSync("uploads/"  +uploadedFolder)) {
        //     fs.mkdirSync("uploads/"  +uploadedFolder, 0777, function (err,callback) {
        //         if (err) {
        //             callback('folder created');
        //         }
        //     });
        // }
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            
            callback(null, './uploads');
        },
        filename: function (req, file, callback) {
        
            myFile = "" + uuid.v1() + path.extname(file.originalname);
            var fileDetails = {};
            FilesNames.push(urlsString + folderName + "/" + myFile);
            var photoPath =urlsString+ folderName + "/" + myFile;
            if (timelineids)
            {
                var tids = [1];
                tids.forEach(function (vk, i) {
                    var dTime = new Date().getTime();
                    var photoId;
                    var rNum = getRandomInt(1, 9);
                    photoId = '' + rNum + '' + dTime;
                    fileDetails.photId = photoId;
                    fileDetails.filePath = (urlsString + folderName + "/" + myFile);
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
    timelinePhotoUpload: timelinePhotoUpload};