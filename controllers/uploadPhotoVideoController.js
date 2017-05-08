var fs = require('fs');
var uuid = require('uuid');	
var multer          = require('multer');

var randomFilePath = '';
var folder = '';
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./uploads");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});


var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count

var photosUpload = function(req, res, next){
     var result = {};
        var retArr = {};
        var results = [];
        var error = {};
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