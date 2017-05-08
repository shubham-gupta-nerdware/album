var fs = require('fs');
var uuid = require('uuid');	
var multer          = require('multer');
 var Storage = multer.diskStorage({
                        destination: function (req, file, callback) {
                            callback(null, folder);
                        },
                        filename: function (req, file, callback) {
                            callback(null, randomFilePath);
                        }
                    });

var folder = '';
var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count

var randomFilePath = '';
var photosUpload = function(req, res, next){
        var result = {};
        var retArr = {};
        var results = [];
        var error = {};

		var myFile="";
        var FilesNames = [];
        var pushFileNames = [];
        var fileCompressPath = [];
        var colorImages= [];
        var results = {};
        var photoArray = [];
        var allFiles = {};
        var pType = req.params.pType;
        var activeFlag = 1;
        var storyId = req.params.storyId;
		var urlsString = req.hostname;
        if (req.hostname === 'localhost') {
            urlsString = urlsString + '/album';
        }
        urlsString += '/uploads/';
        var folderName = (req.body.folderName)?req.body.folderName:'common';
        if (!fs.existsSync("uploads/" + folderName)) {
            fs.mkdirSync("uploads/" + folderName, 0777, function (err,callback) {
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

            randomFilePath =""+ uuid.v1();
        var randomFolderName = randomFilePath.split("-").pop();
        uploadedFolder  += "/"+randomFolderName;

        if (!fs.existsSync("uploads/"  +uploadedFolder)) {
            fs.mkdirSync("uploads/"  +uploadedFolder, 0777, function (err,callback) {
                if (err) {
                    callback('folder created');
                }
            });
        }
        folder = uploadedFolder;
        console.log('Folder Name : ');
        console.log(uploadedFolder);
        upload(req, res, function (err) {
        if (err) {
                     result=results;
                    retArr.results = result;
                    error.errorCode = 1;
                    error.errorMsg = "Error while uploading";
                    retArr.error = error;
                    res.json(retArr);
                    return 1;
                }
                    result=results;
                   retArr.results = result;
                    error.errorCode = 0;
                    error.errorMsg = "File uploaded sussesfully";
                    retArr.error = error;
                    res.json(retArr);
                    return 1;
    });


};

module.exports={photosUpload:photosUpload};