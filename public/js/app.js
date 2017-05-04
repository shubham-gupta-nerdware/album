var album = angular.module('album', []);
album.constant("$config", {
    "page": "index.html",
    "for": "story"
});

album.controller('albumController', function ($scope, $http, $timeout, $location, $timeout,$config) {
    var params = $location.absUrl().split('/');
    $scope.paramStoryId=params[params.length-1];
    console.log($scope.paramStoryId);
  
    
    $scope.storyDet = [];
    console.log(NODOMAIN + 'storyDetails/' + $scope.paramStoryId);

    $http.get(NODOMAIN + 'storyDetails/' + $scope.paramStoryId)
    .success(function (response) {
        console.log(response);
        
        try
        {
            $scope.error = response.error;
        } catch (err) {
            console.log('Error');
            console.log(err);
        }
        
        if ($scope.error.errorCode == 0)
        {
            $scope.storyDet = response.results[0];
            $scope.writenBy = $scope.storyDet.writenById;
            $scope.userPht = $scope.storyDet.userPht;
            $scope.asignUsrPhoto = $scope.storyDet.asignUsrPhoto;
            if ($scope.userPht)
                $scope.userPht = $scope.storyDet.userPht.replace('/upload/', '/upload/c_fill,g_center,dpr_1.5,q_auto:best,h_100,w_100/');

            if ($scope.asignUsrPhoto)
                $scope.asignUsrPhoto = $scope.storyDet.asignUsrPhoto.replace('/upload/', '/upload/c_fill,g_center,dpr_1.5,q_auto:best,h_100,w_100/');


            if ($scope.storyDet.pht){
                $scope.storyDet.coverPhtblur = $scope.storyDet.pht.replace('/upload/', '/upload/e_blur:500,w_320/');
                var actualImage = new Image();
                $scope.storyDet.coverPhtblur = $scope.storyDet.coverPhtblur.replace($scope.pattern, '');
                actualImage.src = $scope.storyDet.coverPhtblur.replace(/"/g, "").replace(/url\(|\)$/ig, "");
                actualImage.onload = function () {
                    var orImg = $('.coverSection').css('backgroundImage').replace('url(', '').replace(')', '');
                    if (orImg == 'none')
                    {
                        $('.coverSection').css({
                            'backgroundImage': 'url(' + $scope.storyDet.coverPhtblur + ')',
                            'backgroundPosition': 'center',
                            'backgroundSize': 'cover',
                            'backgroundColor': $scope.storyDet.phtCc1
                        });
                    }
                }

                $scope.storyDet.coverPht = $scope.storyDet.pht.replace($scope.pattern, '');
                $scope.storyDet.coverPht = $scope.storyDet.pht.replace('/upload/', '/upload/dpr_1.0,q_auto:good,w_1920/');
                var actualImage = new Image();
                actualImage.src = $scope.storyDet.coverPht.replace(/"/g, "").replace(/url\(|\)$/ig, "");
                actualImage.onload = function () {
                    $('.coverSection').css({
                        backgroundImage: 'url(' + $scope.storyDet.coverPht + ')',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    });
                }

                $('#cover').attr('data-img', $scope.storyDet.pht);
                $('#coverInfoCap').addClass('dn');
                $('#coverInfo,.editBtnStory').removeClass('dn');
                $('#cover').attr('data-color', $scope.storyDet.phtCc)
            } 
            
            if (response.results[0].sJson)
            {
                $scope.returnArr = JSON.parse(response.results[0].sJson);
                var toCount = 0;
                $($scope.returnArr).each(function (j, vl) {
                    $(vl.items).each(function (k, kl) {
                        if ((kl.type == "video" || kl.type == "img") && kl.imagePath && kl.dw && kl.dh)
                        {
                            toCount++;
                        }

                    })
                }).promise().then(function () {
                        angular.forEach($scope.returnArr, function (vs, j) {
                            angular.forEach(vs.items, function (vkk, j) {
                                if ((vkk.type == "video" || vkk.type == "img") && vkk.imagePath && vkk.dw && vkk.dh)
                                {
                                    if (vkk.width <= 320)
                                        var urll = vkk.imagePath.replace('/upload/', '/upload/t_video-320/');
                                    else if (vkk.width <= 480)
                                        var urll = vkk.imagePath.replace('/upload/', '/upload/t_video-480/');
                                    else if (vkk.width <= 720)
                                        var urll = vkk.imagePath.replace('/upload/', '/upload/t_video-720/');
                                    else if (vkk.width <= 1080)
                                        var urll = vkk.imagePath.replace('/upload/', '/upload/t_video-1280/');
                                    else
                                        var urll = vkk.imagePath.replace('/upload/', '/upload/t_video-1280/');

                                    isloadedImage(urll, vkk.type, vkk.width, vkk.height, toCount);

                                }
                            });
                        });
                });
                notDoneIds = [];
                $scope.onEnd = function () {
                    $timeout(function () {
                        tt = 0;
                        angular.forEach($scope.returnArr, function (value, key) {
                            angular.forEach(value.items, function (vl, k) {
                                if (vl.imagePath)
                                {
                                    vl.imagePath = vl.imagePath.replace($scope.pattern, '');
                                    if (vl.type == 'video' && vl.imagePath)
                                    {
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
                                    } else {
                                    }
                                }

                                if (vl.type == 'img' && vl.imagePath)
                                {
                                    if (vl.imagePath.indexOf('cloudinary') != -1)
                                    {
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
                                    } else {
                                        notDoneIds.push(vl.id);
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
                                } else if (vl.type == 'txt')
                                {
                                    var titleArr = $scope.storyDet.atitle;
                                    angular.forEach(titleArr, function (vz, z) {
                                        if (parseInt(vz.id) == parseInt(vl.id))
                                        {
                                            var plcClass = '';
                                            if (vz.color == '#ffffff')
                                            {
                                                plcClass = 'whitePlaceholder';
                                            }
                                            var str = '<div class="neighData">';
                                            str += '<div class="neighDataD forData forInps">';
                                            str += '<input type="text" maxlength="40" class="storyTitle fLeft ' + plcClass + '" style="color:' + vz.color + ';text-align:' + vz.align + '" onblur="savetitle(\'' + vl.id + '\')" id="div-' + vl.id + '" placeholder="Enter your title here" readonly>';
                                            str += '<div class="storyTxt fLeft editable noPlacHolder ' + plcClass + '" contentEditable="false"  id="tarea-' + vl.id + '" spellcheck="false" style="color:' + vz.color + ';text-align:' + vz.align + '" onkeypress = "common.checkLength(this,event)"></div>';
                                            str += '</div>';
                                            str += '</div>';
                                            str += '</div>';

                                            $('.' + vl.id).html(str);
                                            $('#div-' + vl.id).val(vz.text);
                                            $('.' + vl.id).css({
                                                'height': vl.height + 'px',
                                                'width': vl.width + 'px',
                                                'top': vl.top + 'px',
                                                'left': vl.left + 'px',
                                                'background-color': vz.bgcolor,
                                                'color': vz.color,
                                                'text-align': vz.align
                                            });
                                            $('.' + vl.id).attr('data-width', vl.width);
                                            $('.' + vl.id).attr('data-height', vl.height);
                                            $('.' + vl.id).attr('data-title', vz.text);
                                            $('.' + vl.id).attr('data-desc', vz.desc);
                                            $('.' + vl.id).addClass('forTxt');
                                            $('.' + vl.id).parent().addClass('forTxtPr');
                                            $('.' + vl.id).attr('data-color', vl.color);
                                            $('#tarea-' + vl.id).html(vz.desc);
                                        }
                                    });
                                } else {
                                    if (vl.imagePath)
                                    {
                                        if (vl.imagePath.indexOf('cloudinary') != -1)
                                        {
                                            var extn = vl.backImagePath.split('.');
                                            var vidextn = extn[extn.length - 1];
                                            extn.pop();
                                            var pathwoextn = extn.join('.');

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
                                        } else {
                                            notDoneIds.push(vl.id);
                                            $('.' + vl.id).css({
                                                'height': vl.height + 'px',
                                                'width': vl.width + 'px',
                                                'top': vl.top + 'px',
                                                'left': vl.left + 'px'
                                            });
                                            $('.' + vl.id).addClass('forVideo');
                                            $('.' + vl.id).addClass('videoLoading');
                                            $('.' + vl.id).attr('data-color', vl.color);
                                        }
                                    } else {
                                        notDoneIds.push(vl.id);
                                        $('.' + vl.id).css({
                                            'height': vl.height + 'px',
                                            'width': vl.width + 'px',
                                            'top': vl.top + 'px',
                                            'left': vl.left + 'px'
                                        });
                                        $('.' + vl.id).addClass('forVideo');
                                        $('.' + vl.id).addClass('videoLoading');
                                        $('.' + vl.id).attr('data-color', vl.color);
                                    }
                                }
                                $('.' + vl.id).attr('data-below', (vl.below ? vl.below : ''));
                                $('.' + vl.id).attr('data-immediate', (vl.immediate ? vl.immediate : ''));
                            });
                        });

                        if (notDoneIds.length)
                        {
                            createGallery();
                            seqloadImg(0);
                            $('#publishStory,#unpublishStory,#saveStory,#saveStory2').removeClass('disabled');
                            $scope.disabledRemoveFlag_1 = true;
                            $scope.disabledRemoveFlag_2 = true;
                            var ids = notDoneIds.join(',');
                            $http.get(NODOMAIN + 'fetchCloudLink?pid=' + ids)
                            .success(function (res) {
                                        if (res.length)
                                        {
                                            angular.forEach(res, function (vl, k) {
                                                if (vl.url)
                                                {
                                                    vl.width = $('.' + vl.pid).width();
                                                    vl.height = $('.' + vl.pid).height();

                                                    if (vl.ptype == 8)
                                                    {
                                                        vl.url = vl.url.replace($scope.pattern, '');
                                                        if (vl.width <= 320)
                                                            vl.backImagePath = vl.url.replace('/upload/', '/upload/t_video-320/');
                                                        else if (vl.width <= 480)
                                                            vl.backImagePath = vl.url.replace('/upload/', '/upload/t_video-480/');
                                                        else if (vl.width <= 720)
                                                            vl.backImagePath = vl.url.replace('/upload/', '/upload/t_video-720/');
                                                        else if (vl.width <= 1080)
                                                            vl.backImagePath = vl.url.replace('/upload/', '/upload/t_video-1280/');
                                                        else
                                                            vl.backImagePath = vl.url.replace('/upload/', '/upload/t_video-1280/');

                                                        var extn = vl.backImagePath.split('.');
                                                        var vidextn = extn[extn.length - 1];
                                                        extn.pop();
                                                        var pathwoextn = extn.join('.');

                                                        var srcpth = '<source src="' + pathwoextn + '.mp4" type="video/mp4"/>';
                                                        // srcpth += '<source src="'+pathwoextn+'.mov" type="video/mov"/>';
                                                        srcpth += '<source src="' + pathwoextn + '.webm" type="video/webm"/>';
                                                        srcpth += '<source src="' + pathwoextn + '.ogv" type="video/ogg"/>';

                                                        $('.' + vl.pid).html('<video id="' + vl.pid + '" class="video" muted loop playsinline style="width:100%;height:100%">' + srcpth + '</video><div class="videoCont"><div class="muteIcon muted"></div><div class="pauseIcon"></div><div class="mobilePlay"></div></div>');
                                                        $('.' + vl.pid).attr('data-img', vl.url);

                                                        var actualImage = new Image();
                                                        var posterURL = pathwoextn + '.jpg';
                                                        posterURL = posterURL.replace($scope.pattern, '');
                                                        actualImage.src = posterURL.replace(/"/g, "").replace(/url\(|\)$/ig, "");
                                                        actualImage.onload = function () {
                                                            $('#' + vl.pid).attr({'poster': posterURL});
                                                        };
                                                        $('.' + vl.pid).removeClass('videoLoading');
                                                        $('.' + vl.pid).css({'background-color': '#222529'});
                                                    } else {
                                                    }
                                                }
                                            });

                                            reArrange();
                                            initBehaviour();
                                            $(init);
                                            setTimeout(function () {
                                                common.setTextareaHeight();
                                            }, 200);

                                            $('#grid input,#grid .storyTxt').addClass('trans');
                                        } else {
                                            reArrange();
                                            initBehaviour();
                                            $(init);
                                            setTimeout(function () {
                                                common.setTextareaHeight();
                                            }, 200);
                                            $('#grid input,#grid .storyTxt').addClass('trans');
                                        }
                                    });
                        } 
                        else {
                            createGallery();
                            $('#publishStory,#unpublishStory,#saveStory,#saveStory2').removeClass('disabled');
                            $scope.disabledRemoveFlag_1 = true;
                            $scope.disabledRemoveFlag_2 = true;
                            reArrange()
                            seqloadImg(0);
                            initBehaviour();
                            $(init);
                            setTimeout(function () {
                                common.setTextareaHeight();
                            }, 200);
                            $('#grid input,#grid .storyTxt').addClass('trans');
                        }
                    }, 1);

                };
            }

        }

    });
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

