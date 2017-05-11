const fs = require('fs');
const uuid = require('uuid');
const multer = require('multer');
const path = require('path');
const numCPUs = require('os').cpus().length;
const sharp = require('sharp');
sharp.concurrency(numCPUs);
const getColors = require('get-image-colors');
const rgb2hex = require('rgb2hex');
const Exif        = require("simple-exiftool");

var photosUpload = function(req, res, next) {
        var myFile="";
        var FilesNames = [];
        var fileCompressPath = [];
        var results = {};
        var photoArray = [];
        var pType = (req.query.pType ? req.query.pType : 1);
        var coverPhotoType = pType;
        var coverPhotoTypeModified = pType;


        var urlsString = req.hostname;
        if (req.hostname === 'localhost') {
            urlsString = urlsString + '/album';
        }
        urlsString += '/uploads';

        

        var storage =   multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, './uploads');
            },
            
            filename: function (req, file, callback) {
                if(file.mimetype.indexOf('video') !== -1) {
                    coverPhotoType = 8;
                }
                else {
                    coverPhotoType = parseInt(coverPhotoTypeModified);
                }

                var imgData = {};
                myFile =""+ uuid.v1()+path.extname(file.originalname);
                var fileDetails = {};
                FilesNames.push(urlsString+"/"+myFile);
                
                var dTime = new Date().getTime();
                var photoId;
                var rNum = getRandomInt(1,9);
                var num = getRandomInt(1,9);
                photoId = ''+rNum+''+dTime+''+num;
                
                fileDetails.filePath = (urlsString+"/"+myFile);
                fileDetails.photId = photoId;
                imgData.name = myFile;
                imgData.id = photoId;
                imgData.ptype = coverPhotoType;
                imgData.oname = file.originalname;
                fileCompressPath.push(imgData);

                photoArray.push(fileDetails);
               
                callback(null, myFile);
            }

        });
        var maxSize = 1000*1000*1000*1000;
        var upload = multer({ storage : storage, limits: { fileSize: maxSize } }).array('userPhoto',200);

        upload(req,res,function(err) {

            if(err) {
                return res.end("Error uploading file.");
            }
            else {

                var allimgs = fileCompressPath.length;
                var promArr = [];
                var promColor = [];

                var p = new Promise(function (resolve, reject) {

                    fileCompressPath.forEach(function (vl, i) {

                        promArr.push(getUploadData(req, res, vl));
                        promColor.push(getImageColors('uploads/' + vl.name, vl.id, vl.ptype));

                        allimgs--;
                        if (allimgs == 0) {
                            resolve(promArr);
                        }
                    });
                });

                p.then(function(promArr) {
                        Promise.all(promArr).then(values => {
                            var al = values.length;
                            var allfiles = {};
                            allfiles.filePaths = [];
                            allfiles.details = [];
                            values.forEach(function(vl,i) {
                                allfiles.filePaths.push(vl.filePaths);
                                allfiles.details.push(vl.details[0]);
                                al--;
                                if(al == 0) {
                                    Promise.all(promColor).then(values => {
                                        var ac = values.length;
                                        var dt = [];
                                        values.forEach(function(vl,i) {
                                            allfiles.details.forEach(function(vz,z) {
                                                if(parseInt(vz.photo_id) == parseInt(vl.id))
                                                {
                                                    vz.color_codes = vl.color;
                                                    vz.color_codes_first = vl.color.split(',')[0];
                                                    ac--;
                                                    if(ac == 0) {
                                                        res.json(allfiles);
                                                    }
                                                }
                                            });
                                        });
                                    });
                                }
                            });
                        }, reason => {
                        });
                    });
            }
           
        });

};

var getImageColors = function(fileName, id, ptype) {

    var prom = new Promise(function(resolve, reject) {
        if(ptype == 8)
        {
            var dt = {};
            dt.id = id;
            dt.color = '';
            resolve(dt);
        }
        else {
            
            var hexcode = [];
            getColors(fileName).then(colors => {
                colors.forEach( function(vz, k) {
                    var hexdata = (rgb2hex('rgb('+vz._rgb[0]+','+vz._rgb[1]+','+vz._rgb[2]+')'));
                    hexcode.push(hexdata.hex);
                    
                });
            }).then(function(){
                hexcode = hexcode.slice(0, 5);
                var hexList = hexcode.join(',');
                var dt = {};
                dt.id = id;
                dt.color = hexList;
                resolve(dt);
                
            });
        }
    });
    return prom;
};


var getUploadData = function(req, res, vl) {

        var prom = new Promise(function(resolve, reject) {
            var tot = 0;
            var allFiles = {};
            var fNames = [];
            var pArray = [];
            if(vl.ptype == 8) {
                var fileDetails = {};
                fNames.push('uploads/'+vl.name);
                Exif('uploads/'+vl.name, function(error, metadata) {
                if(metadata.Rotation == 90)
                {
                    var vht = metadata.ImageWidth;
                    var vwt = metadata.ImageHeight;
                }
                else {
                    var vht = metadata.ImageHeight;
                    var vwt = metadata.ImageWidth;
                }

                fileDetails.filePath = "uploads/"+vl.name;
                fileDetails.photId = vl.id;
                fileDetails.actualPath = "uploads/"+vl.name;
                fileDetails.photo_type = 8;
                fileDetails.hexCode = '';
                fileDetails.cloudFilePath = '';
                fileDetails.imgWidth = vwt;
                fileDetails.imgHeight = vht;
                fileDetails.rotation = '';
                fileDetails.poster = '';
                fileDetails.oname = vl.oname;
                pArray.push(fileDetails);
                
                    allFiles.filePaths = fNames;
                    allFiles.details =  pArray.reverse();
                    // return allFiles;
                    resolve(allFiles);
                
                tot++;
            });
            }
            else{
                var output = 'uploads/versions/compressed/'+vl.name;
                var image = sharp('uploads/'+vl.name);
                image
                    .metadata()
                    .then(function(metadata) {
                        if(metadata.width>1920) {
                            metadata.width = 1920;
                        }
                        return image
                        .resize(metadata.width)
                        .toFile(output, function(err, info) {

                            var fileDetails = {};
                            fNames.push(output);

                            fileDetails.photo_path = (output);
                            fileDetails.photo_id = vl.id;

                            fileDetails.photo_type = vl.ptype;
                            fileDetails.color_code = '';
                            fileDetails.color_code_first = '';

                            fileDetails.imgWidth = info.width;
                            fileDetails.imgHeight = info.height;
                            pArray.push(fileDetails);

                                allFiles.filePaths = fNames;
                                allFiles.details =  pArray.reverse();
                                resolve(allFiles);
                            tot++;

                        });
                    })
                    .then(function(data) {
                        var image = sharp('uploads/'+vl.name);
                        var sizes = [
                            {path: 'uploads/versions/240/', w: 240},
                            {path: 'uploads/versions/360/', w: 360},
                            {path: 'uploads/versions/480/', w: 480},
                            {path: 'uploads/versions/720/', w: 720},
                            {path: 'uploads/versions/1080/', w: 1080},
                            {path: 'uploads/versions/1280/', w: 1280},
                            {path: 'uploads/versions/1440/', w: 1440},
                            {path: 'uploads/versions/1920/', w: 1920}
                        ];


                        sizes.forEach(function (size, i) {
                            image
                            .metadata()
                            .then(function (metadata) {
                                return image
                                    .resize(size.w)
                                    .toFile(size.path + vl.name, function (err, info) {
                                });
                            }).catch(function (msg) {
                                console.log(msg);
                                return 1;
                            })
                            .then(function(){
                               // console.log('process completed');
                            });
                        });
                    });
            }
    });
    return prom;
};



componentToHex = function(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};

rgbToHex = function(arr) {
    return "#" + componentToHex(parseInt(arr[0])) + componentToHex(parseInt(arr[1])) + componentToHex(parseInt(arr[2]));
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    photosUpload: photosUpload
};