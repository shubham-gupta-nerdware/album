var album = angular.module('createAlbum', []);
album.constant("$config", {
    "page": "createStory.html",
    "for": "createStory"
});


album.controller('albumController', function ($scope, $http, $timeout, $location, $timeout,$config,$window,fileUpload) {
    var params = $location.absUrl().split('/');
    $scope.paramStoryId=storyid=params[params.length-1];
    $scope.storyDet = [];
    $scope.isMobile= false;
    $scope.files = []; 
    
    
    
    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };

     // NOW UPLOAD THE FILES.
     $scope.uploadFiles = function () {

         var request = {
             method: 'POST',
             url: NODOMAIN + 'timelinePhotoUpload/123456/1',
             data: formdata,
             enctype: 'multipart/form-data',
             headers: {
                 'Content-Type': undefined
             }
         };
         

         // SEND THE FILES.
         $http(request)
             .success(function (d) {
                 alert(d);
             })
             .error(function () {
             });
     }
    
    
    
    
    
    
    
    
    
    
    
    
    $scope.upload=function(){
        var FD = new FormData(document.getElementById("storyCover1"));
        $http.post(NODOMAIN + 'timelinePhotoUpload/123456/1', FD, {
            transformRequest: angular.identity,
            headers: {'Content-Type': 'multipart/form-data'}
        })
        .success(function(res){
            console.log(res)
        })
        .error(function(res){
             console.log(res)
        });


//        console.log(FD)
//        $.ajax({
//            url: NODOMAIN + 'timelinePhotoUpload/123456/1',
//            type: 'POST',
//            data: FD,
//            enctype: 'multipart/form-data',
//            async: true,
//            cache: false,
//            contentType: false,
//            processData: false,
//            success: function (response) {
//                console.log(response)
//            }
//            , error: function (err) {
//                common.msg(0, err);
//            }
//
//        });
    };
    
  
    
    
});

album.directive("repeatEnd", function () {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            if (scope.$last) {
                scope.$eval(attrs.repeatEnd);
            }
        }
    };
});

album.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

album.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

album.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity
            //headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);


//album.directive('ngFileModel', ['$parse', function ($parse) {
//    return {
//        restrict: 'A',
//        link: function (scope, element, attrs) {
//            var model = $parse(attrs.ngFileModel);
//            var isMultiple = attrs.multiple;
//            var modelSetter = model.assign;
//            element.bind('change', function () {
//                var values = [];
//                angular.forEach(element[0].files, function (item) {
//                    var value = {
//                       // File Name 
//                        name: item.name,
//                        //File Size 
//                        size: item.size,
//                        //File URL to view 
//                        url: URL.createObjectURL(item),
//                        // File Input Value 
//                        _file: item
//                    };
//                    values.push(value);
//                });
//                scope.$apply(function () {
//                    if (isMultiple) {
//                        modelSetter(scope, values);
//                    } else {
//                        modelSetter(scope, values[0]);
//                    }
//                });
//            });
//        }
//    };
//}]);





album.directive('ngFileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.ngFileModel);
            var isMultiple = attrs.multiple;
            var modelSetter = model.assign;
            element.bind('change', function () {
                var values = [];
                angular.forEach(element[0].files, function (item) {
                    var value = {
                       // File Name 
                        name: item.name,
                        //File Size 
                        size: item.size,
                        //File URL to view 
                        url: URL.createObjectURL(item),
                        // File Input Value 
                        _file: item
                    };
                    values.push(value);
                    console.log(values)
                });
                scope.$apply(function () {
                    if (isMultiple) {
                        modelSetter(scope, values);
                    } else {
                        modelSetter(scope, values[0]);
                    }
                });
            });
        }
    };
}]);



//angular.module('fupApp', [])


album.directive('ngFiles', ['$parse', function ($parse) {

            function fn_link(scope, element, attrs) {
                var onChange = $parse(attrs.ngFiles);
                element.on('change', function (event) {
                    onChange(scope, { $files: event.target.files });
                });
            };

            return {
                link: fn_link
            }
        } ]);
    
//    
//album.controller('fupController', function ($scope, $http) {
//
//     var formdata = new FormData();
//     $scope.getTheFiles = function ($files) {
//         angular.forEach($files, function (value, key) {
//             formdata.append(key, value);
//         });
//     };
//
//     // NOW UPLOAD THE FILES.
////     $scope.uploadFiles = function () {
////
////         var request = {
////             method: 'POST',
////             url: NODOMAIN + 'timelinePhotoUpload/123456/1',
////             data: formdata,
////             headers: {
////                 'Content-Type': undefined
////             }
////         };
////
////         // SEND THE FILES.
////         $http(request)
////             .success(function (d) {
////                 alert(d);
////             })
////             .error(function () {
////             });
////     }
//    });