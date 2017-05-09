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
    console.log(req)
    var myFile = "";
    var FilesNames = [];
    var results = {};
    var photoArray = [];
    var allFiles = {};


    var pType = 1;


    var activeFlag = 1;
    var timelineids = 1;
    var urlsString = 'localhost'

    urlsString = urlsString + ":" + "8000/";
    var folderName = (req.body.folderName) ? req.body.folderName : 'common';
    if (!fs.existsSync("uploads/" + folderName)) {
        fs.mkdirSync("uploads/" + folderName, 0777, function (err, callback) {
            if (err) {
                callback('folder created');
            }
        });
    }

    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            console.log(file)
            callback(null, './uploads');
        },
        filename: function (req, file, callback) {
            console.log(file)
            myFile = "" + uuid.v1() + path.extname(file.originalname);
            var fileDetails = {};
            FilesNames.push(urlsString + folderName + "/" + myFile);

            var photoPath = folderName + "/" + myFile;
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