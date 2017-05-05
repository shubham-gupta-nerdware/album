var album = angular.module('album', []);
album.constant("$config", {
    "page": "index.html",
    "for": "story"
});

album.controller('albumController', function ($scope, $http, $timeout, $location, $timeout,$config) {
    var params = $location.absUrl().split('/');
    $scope.paramStoryId=storyid=params[params.length-1];
    $scope.storyDet = [];
   

    $http.get(NODOMAIN + 'storyDetails/' + $scope.paramStoryId)
    .success(function (response) {
        //console.log(response);
        
//        try
//        {
//            $scope.error = response.error;
//        } catch (err) {
//            console.log('Error');
//            console.log(err);
//        }
//        
//        if ($scope.error.errorCode == 0)
//        {
            response.results = response;
            $scope.storyDet = response.results;
            
            
            if($scope.storyDet.story_cover_photo_path){
                var actualImage = new Image();
                $scope.storyDet.coverPhtblur = $scope.storyDet.story_cover_photo_path.replace($scope.pattern, '');
                actualImage.src = $scope.storyDet.coverPhtblur.replace(/"/g, "").replace(/url\(|\)$/ig, "");
                actualImage.onload = function () {
                    var orImg = $('#coverPhoto').css('backgroundImage').replace('url(', '').replace(')', '');
                    if (orImg == 'none'){
                        $('#coverPhoto').css({
                            'backgroundImage': 'url(' + $scope.storyDet.coverPhtblur + ')',
                            'backgroundPosition': 'center',
                            'backgroundSize': 'cover',
                            'backgroundColor': $scope.storyDet.phtCc1
                        });
                    }
                };

                $scope.storyDet.coverPht = $scope.storyDet.story_cover_photo_path.replace($scope.pattern, '');
                $scope.storyDet.coverPht = $scope.storyDet.story_cover_photo_path.replace('/upload/', '/upload/dpr_1.0,q_auto:good,w_1920/');
                var actualImage = new Image();
                actualImage.src = $scope.storyDet.coverPht.replace(/"/g, "").replace(/url\(|\)$/ig, "");
                actualImage.onload = function () {
                    $('#coverPhoto').css({
                        backgroundImage: 'url(' + $scope.storyDet.coverPht + ')',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    });
                };
                $('#coverPhoto').attr('data-color', $scope.storyDet.story_cover_photo_code);
                $('#coverPhoto').addClass('scala coverOver');
                $('.neighDataD').addClass('opaCover');
                
            }
            
            
                        
            if ($scope.storyDet.story_json){
                $scope.returnArr = JSON.parse($scope.storyDet.story_json);
                
                
                $scope.onEndReturnArr = function(){
                    $timeout(function () {
                        $scope.titles=$scope.storyDet.story_title;
                        angular.forEach($scope.returnArr, function (value, key) {
                            angular.forEach(value.items, function (vl, k) {
                                if(vl.type == 'txt'){
                                    angular.forEach($scope.titles, function (vz, z) {
                                        if (parseInt(vz.title_id) == parseInt(vl.id)){
                                            $('.' + vl.id).css({
                                                'top': vl.top + 'px',
                                                'left': vl.left + 'px',
                                                'background-color': vz.bg_color,
                                            });
                                        }
                                    });
                                }
                                else if(vl.type == 'img' && vl.imagePath){
                                    var primeColor = vl.color.split(',');
                                    $('.' + vl.id).css({
                                        'background-repeat': ' no-repeat',
                                        'background-size': 'cover',
                                        'background-position': 'center',
                                        'height': vl.height + 'px',
                                        'width': vl.width + 'px',
                                        'top': vl.top + 'px',
                                        'left': vl.left + 'px',
                                        'background-color': primeColor[0]
                                    });
                                    $('.' + vl.id).addClass('forImg');
                                    $('.' + vl.id).attr('data-color', vl.color);                                    
                                }
                                else if(vl.type == 'video' && vl.imagePath){
                                    if (vl.width <= 320)
                                        vl.backImagePath = vl.imagePath.replace('/upload/', '/upload/t_video-320/');
                                    else if (vl.width <= 480)
                                        vl.backImagePath = vl.imagePath.replace('/upload/', '/upload/t_video-480/');
                                    else if (vl.width <= 720)
                                        vl.backImagePath = vl.imagePath.replace('/upload/', '/upload/t_video-720/');
                                    else if (vl.width <= 1080)
                                        vl.backImagePath = vl.imagePath.replace('/upload/', '/upload/t_video-1280/');
                                    else
                                        vl.backImagePath = vl.imagePath.replace('/upload/', '/upload/t_video-1280/');
                                    
                                    var extn = vl.backImagePath.split('.');
                                    extn.pop();
                                    var pathwoextn = extn.join('.');
                                    vl.pathwoextn = extn.join('.');
                                    
                                    
                                    var srcpth = '<source src="' + pathwoextn + '.mp4" type="video/mp4"/>';
                                    srcpth += '<source src="' + pathwoextn + '.webm" type="video/webm"/>';
                                    srcpth += '<source src="' + pathwoextn + '.ogv" type="video/ogg"/>';

                                    $('.' + vl.id).html('<video id="' + vl.id + '" class="video" muted loop playsinline style="width:100%;height:100%">' + srcpth + '</video><div class="videoCont"><div class="muteIcon muted"></div><div class="pauseIcon"></div><div class="mobilePlay"></div></div>');
                                    $('.' + vl.id).css({
                                        'height': vl.height + 'px',
                                        'width': vl.width + 'px',
                                        'top': vl.top + 'px',
                                        'left': vl.left + 'px'
                                    });
                                    var actualImage = new Image();
                                    var posterURL = pathwoextn + '.jpg';
                                    posterURL = posterURL.replace($scope.pattern, '');
                                    actualImage.src = posterURL.replace(/"/g, "").replace(/url\(|\)$/ig, "");
                                    actualImage.onload = function () {
                                        $('#' + vl.id).attr({'poster': posterURL});
                                    };
                                    $('.' + vl.id).addClass('forVideo');
                                    $('.' + vl.id).addClass('videoLoading');
                                    $('.' + vl.id).css({'background-color': '#222529'});
                                    $('.' + vl.id).removeClass('videoLoading');
                                    $('.' + vl.id).attr('data-color', vl.color);
                                }
                                $('.' + vl.id).attr('data-below', (vl.below ? vl.below : ''));
                                $('.' + vl.id).attr('data-immediate', (vl.immediate ? vl.immediate : ''));
                            });
                        });
                        $scope.reArrange();
                        $scope.seqloadImg(0);
                    },100);
                };
                
               
                
            }
            
            
            
            
            return;
       // }

    });
    
    
    
$scope.reArrange =function(){
    $('.group').each(function () {
        var itemDet = [];
        var itemDetTemp = [];
        var addMargin = $('#grid').width() * (2 / 100);
        var gridWidth = $('#grid').width();
        var totalWidth = (gridWidth - (addMargin * 2));
        var _G = this;
        var minHT = 0;

        $(this).find('.item').each(function () {
            if (!$(this).attr('data-below')) {
                var flg = false;
                var data = {};
                data['h'] = $(this).attr('data-height');
                data['w'] = $(this).attr('data-width');

                if ($(this).attr('data-factor'))
                    data['factor'] = $(this).attr('data-factor');
                else
                    data['factor'] = $(this).attr('data-width') / $(this).attr('data-height');

                var ttht = parseInt($(this).attr('data-height'));

                var _item = this;

                var minWDT = parseInt($(this).attr('data-width'));

                $(_G).find('.item').each(function () {
                    if ((parseInt($(this).attr('data-below')) == parseInt($(_item).attr('data-id'))) && (parseInt($(this).attr('data-id')) != parseInt($(_item).attr('data-id'))) && ($(this).attr('data-below') != '')) {
                        flg = true;
                        nestedView = 1;

                        if (minWDT > parseInt($(this).attr('data-width')))
                            minWDT = parseInt($(this).attr('data-width'));
                    }
                });

                data['flg'] = flg;
                var tthtd = 0;

                $(_G).find('.item').each(function () {
                    if ((parseInt($(this).attr('data-below')) == parseInt($(_item).attr('data-id'))) && (parseInt($(this).attr('data-id')) != parseInt($(_item).attr('data-id'))) && ($(this).attr('data-below') != '')) {
                        var data1 = {};
                        data1['h'] = $(this).attr('data-height');
                        data1['w'] = $(this).attr('data-width');

                        if ($(this).attr('data-factor'))
                            data1['factor'] = $(this).attr('data-factor');
                        else
                            data1['factor'] = $(this).attr('data-width') / $(this).attr('data-height');

                        data1['nHt'] = minWDT / data1['factor'];
                        data1['nWt'] = minWDT;
                        data1['nest'] = 1;
                        data1['child'] = 1;
                        data1['obj'] = this;

                        tthtd += data1['nHt'];
                        itemDetTemp.push(data1);
                    }
                });


                if (flg)
                {
                    data['nHt'] = minWDT / data['factor'];
                    data['nWt'] = minWDT;
                    tthtd += data['nHt'];
                    data['nest'] = 1;
                }
                else {
                    tthtd = parseInt($(this).attr('data-height'));
                    data['nHt'] = ttht;
                    data['nWt'] = data['nHt'] * data['factor'];
                    data['nest'] = 0;
                }

                data['tthtd'] = tthtd;
                data['child'] = 0;
                data['obj'] = this;

                var _item = this;
                var ddth = data['nHt'];

                $(_G).find('.item').each(function () {
                    if ((parseInt($(this).attr('data-below')) == parseInt($(_item).attr('data-id'))) && (parseInt($(this).attr('data-id')) != parseInt($(_item).attr('data-id'))) && ($(this).attr('data-below') != '')) {

                        if ($(this).attr('data-factor'))
                            var ftr = $(this).attr('data-factor');
                        else
                            var ftr = $(this).attr('data-width') / $(this).attr('data-height');
                        var innerHt = minWDT / ftr;
                        ddth += innerHt;
                    }
                });

                if (parseInt(minHT) < ddth)
                    minHT = ddth;

                itemDet.push(data);
            }
        });

        var itemDet = itemDet.concat(itemDetTemp);
        var ttwidth = 0;
        itemDet.forEach(function (vl, i) {

            if (vl.nest == 0)
            {
                vl.nHt = minHT;
                vl.nWt = vl.nHt * vl.factor;
            } else if (vl.child == 0) {

                vl.nHt = (minHT * vl.nHt) / vl.tthtd;
                vl.nWt = vl.nHt * vl.factor;
                itemDet.forEach(function (vk, z) {
                    if ((parseInt($(vk.obj).attr('data-below')) == parseInt($(vl.obj).attr('data-id'))) && (parseInt($(vk.obj).attr('data-id')) != parseInt($(vl.obj).attr('data-id'))) && ($(vk.obj).attr('data-below') != '')) {
                        vk.nHt = (minHT * vk.nHt) / vl.tthtd;
                        vk.nWt = vk.nHt * vk.factor;
                    }
                });
            }
            if (vl.child == 0)
                ttwidth += vl.nWt;


        });

        itemDet.forEach(function (vl, i) {
            vl.nw = (totalWidth * vl.nWt) / ttwidth;
            vl.nh = vl.nw / vl.factor;

        });

        var tleft = 0;
     
        var parentMainH = 0;
        itemDet.forEach(function (vl, i) {
            if (!vl.child)
            {
                var parentHeight = vl.nh;
                var dispTop = 0;
                $(vl.obj).css({'width': vl.nw + 'px', 'height': vl.nh + 'px', 'left': tleft + "px", 'top': "0px"});
                dispTop = vl.nh;
                itemDet.forEach(function (vk, z) {
                    if ((parseInt($(vk.obj).attr('data-below')) == parseInt($(vl.obj).attr('data-id'))) && (parseInt($(vk.obj).attr('data-id')) != parseInt($(vl.obj).attr('data-id'))) && ($(vk.obj).attr('data-below') != '')) {
                        $(vk.obj).css({'width': vk.nw + 'px', 'height': vk.nh + 'px', 'left': tleft + "px", 'top': dispTop + "px"});
                        dispTop += vk.nh;
                        parentHeight += vk.nh;
                    }
                });
                tleft += vl.nw;

                if (parentMainH < parentHeight)
                    parentMainH = parentHeight;

                $(vl.obj).parent().height(parseInt(parentMainH) + 'px');
            }
        });
    });
    
};
    
$scope.seqloadImg = function(jdx) {
    var group_length = $('.group').length;
    if (jdx < group_length) {
        if ($('.group').eq(jdx).find('.forImg').length != 0) {
            $('.group').eq(jdx).find('.forImg').each(function () {
                var th = $(this);
                acImage = $(this).attr('data-img');
                if (acImage && !$(th).hasClass('iloaded')) {
                    if ($(this).outerWidth(true) <= 320)
                        acImage = (acImage ? acImage.replace('/upload/', '/upload/w_320,dpr_1.5,q_auto:low/') : '');
                    else if ($(this).outerWidth(true) <= 480)
                        acImage = (acImage ? acImage.replace('/upload/', '/upload/w_480,dpr_1.5,q_auto:low/') : '');
                    else if ($(this).outerWidth(true) <= 720)
                        acImage = (acImage ? acImage.replace('/upload/', '/upload/w_720,dpr_1.5,q_auto:low/') : '');
                    else if ($(this).outerWidth(true) <= 1080)
                        acImage = (acImage ? acImage.replace('/upload/', '/upload/w_1080,dpr_1.5,q_auto:low/') : '');
                    else
                        acImage = (acImage ? acImage.replace('/upload/', '/upload/w_1080,dpr_1.5,q_auto:low/') : '');
                    $(th).attr('act-image', acImage);
                    var str = '<div class="dummyImg transition300 nfadeIn" style="background-image: url(' + acImage + ') ; background-repeat: no-repeat ; background-position : center ; background-size: cover">';
                    if (!$(th).hasClass('iloaded')) {
                        $(th).addClass('iloaded');
                        $(th).empty().append(str);
                    }
                }
            });
        } 
        else {
            seqloadImg(jdx + 1);
        }
    }
}
    
    
    
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
