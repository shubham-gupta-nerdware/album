var fs = require('fs');
var uuid = require('uuid');
var multer = require('multer');
var path = require('path');

var randomFilePath = '';
var folder = '';
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {

        console.log("file");
        console.log(file);
        callback(null, "./uploads");


    },
    filename: function (req, file, callback) {
        console.log("file0");
        console.log(file);
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});



var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count


var photosUpload = function (req, res, next) {
    var result = {};
    var retArr = {};
    var results = [];
    var error = {};


    upload(req, res, function (err) {
        if (err) {
            result = results;
            retArr.results = result;
            error.errorCode = 1;
            error.errorMsg = "Error while uploading";
            retArr.error = error;
            res.json(retArr);
            return 1;
        }
        result = results;
        retArr.results = result;
        error.errorCode = 0;
        error.errorMsg = "File uploaded sussesfully";
        retArr.error = error;
        res.json(retArr);
        return 1;
    });


};


timelinePhotoUpload = function (req, res, next) {
    var myFile = "";
    var FilesNames = [];
    var results = {};
    var photoArray = [];
    var allFiles = {};


    var pType = 1;


    var activeFlag = 1;
    var timelineids = 1;
  var urlsString = req.hostname;
        if (req.hostname === 'localhost') {
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
        allFiles.details = photoArray;
        res.send(allFiles);
    });
};


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    photosUpload: photosUpload,
    timelinePhotoUpload: timelinePhotoUpload};