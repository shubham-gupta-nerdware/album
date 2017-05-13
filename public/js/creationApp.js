var album = angular.module('createAlbum', []);
album.constant("$config", {
    "page": "createStory.html",
    "for": "createStory"
}); 


album.controller('albumController', function ($scope, $http, $timeout, $location, $timeout,$config,$window) {
    var params = $location.absUrl().split('/');
    $scope.paramStoryId=storyid=params[params.length-1];
    $scope.storyDet = [];
    $scope.isMobile= false;
    $scope.files = []; 
   
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