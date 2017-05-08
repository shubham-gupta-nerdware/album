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
    
    
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = "/photosUpload/123456/1";
        fileUpload.uploadFileToUrl(file, uploadUrl);
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
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);

