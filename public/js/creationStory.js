var ph=$(window).height();

function editStory() {
    $('#addCont').velocity({translateX: ['0%', '100%']}, {duration: 100, easing: [0.275, 0.885, 0.2, 1], display: 'block'});
    $('.container').velocity({paddingRight: ['350px', '0px']}, {duration: 100, easing: [0.275, 0.885, 0.2, 1]});
    $('.uDiv, .lDiv').removeClass('dn');}


function addCoverImg(input) {
    if (input.files && input.files[0]) {
        $('#storyCoverLoader').removeClass('dn');
        var storyId = 123456789;
        var FD = new FormData(document.getElementById("storyCover"));
        $.ajax({
            url: NODOMAIN + 'photosUpload/' + storyId + '/1',
            type: 'POST',
            data: FD,
            enctype: 'multipart/form-data',
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            success: function (response) {
                console.log(response)
                $('#storyCoverLoader').addClass('dn');

                var fileDet = response.details[0];
                if (fileDet.photo_id) {
                    var storyObj = {};
                    storyObj.pid = fileDet.photo_id;
                }

                $('.coverSection').css({
                    'backgroundImage': 'url()',
                    'backgroundColor': fileDet.color_codes_first
                });

                fileDet.cloudFilePath = IMGDOMAIN + fileDet.photo_path;
                fileDet.bgcloudFilePathDull = IMGDOMAIN + fileDet.photo_path.replace('/compressed/', '/360/');

                var actualImage = new Image();
                actualImage.src = fileDet.bgcloudFilePathDull.replace(/"/g, "").replace(/url\(|\)$/ig, "");
                actualImage.onload = function () {
                    $('.coverSection').css({
                        backgroundImage: 'url(' + fileDet.bgcloudFilePathDull + ')',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    });
                };

                fileDet.bgcloudFilePath = IMGDOMAIN + fileDet.photo_path;
                var actualImage = new Image();
                actualImage.src = fileDet.bgcloudFilePath.replace(/"/g, "").replace(/url\(|\)$/ig, "");
                actualImage.onload = function () {
                    $('.coverSection').css({
                        backgroundImage: 'url(' + fileDet.bgcloudFilePath + ')',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    });
                };

                $('#cover').attr('data-img', fileDet.cloudFilePath);
                $('#cover').attr('data-color', fileDet.color_codes);
                $('#coverInfoCap').addClass('dn');
                $('#coverInfo,#story-Cont,#coverPattern').removeClass('dn');
                $('#coverInfo .neighDataD').css({'opacity': 1});
                editStory();
            },
            error: function (err) {
                common.msg(0, err);
            },
            xhr: function () {
                var xhr = $.ajaxSettings.xhr();
                if (xhr.upload) {
                    xhr.upload.onprogress = function (e) {
                        var isOnline = common.run();
                        if (!isOnline) {
                            xhr.abort();
                            common.msg(0, 'Internet connection lost. Please try again.');
                            hideLoader();
                            $('#forCoverImage').val('');
                            return;
                        }
                        var progressDone = e.position || e.loaded;
                        var progressTotal = e.totalSize || e.total;
                        if ((progressDone * 100) / progressTotal == 100) {
                            $("#storyCoverLoader .loaderLine").width(100 + "%");
                            $('#storyCoverLoader .lTxt').html('Busy Processing Your Cover Image');
                            $(".loaderLine").addClass('scaleLeft');
                            $('#storyCoverLoader .lTxt').html("It's taking a bit longer then usual, we're almost there.");
                        } else {
                            $("#storyCoverLoader .loaderLine").velocity('stop');
                            var per = ((Math.round(progressDone / 1024)) / (Math.round(progressTotal / 1024))) * 100;
                            per = per.toFixed(0);
                            $('#storyCoverLoader .lTxt').html(per + "% completed");

                            $("#storyCoverLoader .loaderLine").width(per + "%");
                        }
                    };

                }
                return xhr;
            }
        });
    }
}

function generateStory(input) {
    if (input.files && input.files[0]) {
        var storyId = 123456789;
        var totalFilesUploaded = input.files.length;
        var FD = new FormData(document.getElementById("storyPhoto"));
        var fileNameArr = [];
        $(function () {
            $.each($('#proImg')[0].files, function (i, vl) {
                fileNameArr.push(vl.name);
            });
        }).promise().then(function () {
            $.ajax({
                url: NODOMAIN + 'photosUpload/' + storyId + '/0/',
                type: 'POST',
                data: FD,
                enctype: 'multipart/form-data',
                async: true,
                cache: false,
                contentType: false,
                processData: false,
                success: function (response) {
                    var fileDetTmp = [];
                    $(function () {
                        $.each(response.details, function (k, vk) {
                            fileDetTmp.push(vk);
                            return;
                        });
                    }).promise().then(function () {
                        var fileDet = fileDetTmp;
                        var firstId;
                        var filArr = [];
                        var j = 1;
                        var data = [];
                        var randNo = randomIntFromInterval(2, 5);
                        var notIn = [];
                        if (fileDet.length) {
                            fileDet.forEach(function (vl, i) {
                                if (j <= randNo)
                                {
                                    data.push(vl);
                                    if ((j == randNo) || (i == (fileDet.length - 1)))
                                    {
                                        filArr.push(data);
                                        j = 0;
                                        randNo = randomIntFromInterval(2, 5);
                                        data = [];
                                    }
                                    j++;
                                }
                            });
                        }
                        filArr.reverse();
                        if (filArr.length) {
                            var ftime = 0;
                            var ttp = 0;
                            var obj;
                            filArr.forEach(function (vk, z) {
                                var tto = 1;
                                var str = '';
                                if (vk.length) {
                                    var gridCnt = vk.length;
                                    if (gridCnt == 5)
                                        var randGrid = randomIntFromInterval(1, 4);
                                    else if (gridCnt == 4 || gridCnt == 3)
                                        var randGrid = randomIntFromInterval(1, 3);
                                    else if (gridCnt == 1 || gridCnt == 2)
                                        var randGrid = 1;

                                    if (gridCnt == 5 && randGrid == 1)
                                        var showArr = [0, 1, 0, 1, 1];
                                    if (gridCnt == 5 && randGrid == 2)
                                        var showArr = [0, 1, 0, 1, 0];
                                    if (gridCnt == 5 && randGrid == 3)
                                        var showArr = [0, 0, 1, 0, 1];
                                    if (gridCnt == 5 && randGrid == 4)
                                        var showArr = [0, 1, 0, 0, 1];

                                    if (gridCnt == 4 && randGrid == 1)
                                        var showArr = [0, 1, 0, 1];
                                    if (gridCnt == 4 && randGrid == 2)
                                        var showArr = [0, 0, 1, 1];
                                    if (gridCnt == 4 && randGrid == 3)
                                        var showArr = [0, 1, 1, 0];

                                    if (gridCnt == 3 && randGrid == 1)
                                        var showArr = [0, 0, 1];
                                    if (gridCnt == 3 && randGrid == 2)
                                        var showArr = [0, 1, 0];
                                    if (gridCnt == 3 && randGrid == 3)
                                        var showArr = [0, 0, 0];

                                    if (gridCnt == 2 && randGrid == 1)
                                        var showArr = [0, 0];

                                    if (gridCnt == 1 && randGrid == 1)
                                        var showArr = [0];

                                    var dataid = '';
                                    vk.forEach(function (vl, i) {
                                        if (vl.photo_type == 8) {
                                            var pushData = {};
                                            pushData.pid = vl.photo_id;
                                            pushData.url = IMGDOMAIN + vl.photo_path;
                                            pushData.photo_type = 8;
                                            pushData.color_codes = '';
                                            notIn.push(pushData);
                                            if (showArr[i] == 0)
                                                dataid = vl.photo_id

                                            var dataBelow = '';
                                            if (showArr[i] == 1)
                                                dataBelow = dataid;

                                            if (i == 0) {
                                                firstId = 'img-' + vl.photo_id;
                                                str += '<div class="item forVideo photo-item ' + vl.photo_id + ' videoLoading" data-below="' + dataBelow + '" data-width="' + vl.imgWidth + '" data-height="' + vl.imgHeight + '" data-id="' + vl.photo_id + '" id="vid-' + vl.photo_id + '" data-poster="" data-img="' + vl.cloudFilePath + '">';
                                                str += '</div>';
                                            } else {
                                                str += '<div class="item forVideo photo-item ' + vl.photo_id + ' videoLoading" data-below="' + dataBelow + '" data-width="' + vl.imgWidth + '" data-height="' + vl.imgHeight + '" data-id="' + vl.photo_id + '" id="vid-' + vl.photo_id + '" data-poster="" data-img="' + vl.cloudFilePath + '">';
                                                str += '</div>';
                                            }

                                            if (tto == (vk.length)) {
                                                var gstr = '<div class="group" id="' + firstId + '">';
                                                gstr += '</div>';
                                                if (ftime == 0) {
                                                    obj = whereToUpload();
                                                    ftime = 1;
                                                }
                                                if (obj) {
                                                    $(gstr).insertBefore(obj);
                                                    obj = $('#' + firstId);
                                                } else
                                                    $('#grid').prepend(gstr);

                                                $('#' + firstId).prepend(str);
                                                ttp++;
                                            }
                                            if ((tto == vk.length) && (ttp == filArr.length)) {
                                                reArrange();
                                            }
                                            tto++;
                                        } else {
                                            var pushData = {};
                                            pushData.pid = vl.photo_id;
                                            pushData.url = IMGDOMAIN + vl.photo_path;
                                            pushData.photo_type = vl.photo_type;
                                            pushData.color_codes = vl.color_codes;
                                            notIn.push(pushData);

                                            if (showArr[i] == 0)
                                                dataid = vl.photo_id

                                            var dataBelow = '';
                                            if (showArr[i] == 1)
                                                dataBelow = dataid;

                                            if (i == 0) {
                                                firstId = 'img-' + vl.photo_id;
                                                vl.w = vl.imgWidth;
                                                vl.h = vl.imgHeight;
                                                vl.factor = vl.imgWidth / vl.imgHeight;
                                                var hexC = vl.color_codes.split(',');
                                                str += '<div class="item forImg photo-item ' + vl.photo_id + '" data-below="' + dataBelow + '" data-id="' + vl.photo_id + '" data-color="' + vl.color_codes + '" data-height="' + vl.h + '" data-width="' + vl.w + '" data-factor="' + vl.factor + '" style="background-color:' + hexC[0] + '; top: 0px; left: 0px; width: ' + vl.nw + 'px; height: ' + vl.nh + 'px; transitionq: margin 0.3s; data-img="' + vl.cloudFilePath + '" ></div>';
                                            } else {
                                                vl.w = vl.imgWidth;
                                                vl.h = vl.imgHeight;
                                                vl.factor = vl.imgWidth / vl.imgHeight;
                                                var hexC = vl.color_codes.split(',');
                                                str += '<div class="item forImg photo-item ' + vl.photo_id + '" data-below="' + dataBelow + '" data-id="' + vl.photo_id + '" data-color="' + vl.color_codes + '" data-height="' + vl.h + '" data-width="' + vl.w + '" data-factor="' + vl.factor + '" style="background-color:' + hexC[0] + '; top: 0px; left: 0px; width: ' + vl.nw + 'px; height: ' + vl.nh + 'px; transitionq: margin 0.3s; data-img="' + vl.cloudFilePath + '" ></div>';
                                            }

                                            if (tto == (vk.length)) {
                                                var gstr = '<div class="group" id="' + firstId + '">';
                                                gstr += '</div>';
                                                if (ftime == 0) {
                                                    obj = whereToUpload();
                                                    ftime = 1;
                                                }
                                                if (obj) {
                                                    $(gstr).insertBefore(obj);
                                                    obj = $('#' + firstId);
                                                } else
                                                    $('#grid').prepend(gstr);

                                                $('#' + firstId).prepend(str);
                                                ttp++;
                                            }
                                            if ((tto == vk.length) && (ttp == filArr.length)) {
                                                reArrange();
                                            }
                                            tto++;
                                        }
                                    });
                                }
                            });
                        }
                        if (notIn.length) {
                            notIn.forEach(function (vl, i) {
                                if (vl.photo_type !== 8) {
                                    var actualImage = new Image();
                                    var imgpath = vl.url;
                                    actualImage.src = imgpath.replace(/"/g, "").replace(/url\(|\)$/ig, "");
                                    actualImage.onload = function () {
                                        $('.item.' + vl.pid).css({
                                            backgroundImage: 'url(' + vl.url + ')'
                                        });
                                        $('.' + vl.pid).attr('data-img', vl.url);
                                    };
                                }
                                if (vl.photo_type == 8) {
                                    var srcpth = '<source src="' + vl.url + '" type="video/mp4"/>';
                                    var str = '<video id="' + vl.pid + '" class="video" style="width:100%;height:100%" muted autoplay onplay="videoPlaying(this)">' + srcpth + '</video><div class="videoCont"><div class="muteIcon muted"></div>';
                                    $('.' + vl.pid).html(str);
                                    $('.' + vl.pid).attr('data-img', vl.url);
                                }
                            });
                        }
                    });
                }
            });
        });
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function whereToUpload() {
    var sc = $(window).scrollTop();
    var wBottom = sc + $(window).height();
    var wht = sc + $(window).height() / 2;
    var closest;
    var nearTop = 1000000000;
    $('.group').each(function (i) {
        var gt = $(this).offset().top;
        if (gt > wht && (nearTop > (gt - wht)))
        {
            nearTop = gt - wht;
            closest = this;
        } else if (gt <= wht && (nearTop > (gt - wht)))
        {
            nearTop = wht - gt;
            closest = this;
        }
    });

    if (closest)
    {
        var offsetV = $(closest).offset().top;
        $('html, body').velocity('scroll', {duration: 50, offset: offsetV, easing: 'swing'});
    }
    return closest;
}

function reArrange(n) {
    var dt = [];
    var done = 0;
    var tto = 1;
    var retval = false;

    var svData = [];
    var groupLen = $('.group').length;
    var colorArr = [];
    colorArr.push($('#cover').attr('data-color'));

    $('.group').each(function () {

        if (!$(this).find('.item').length) {
            $(this).remove();
            reArrange();
            return false;
        } else {

            var fileDet = [];
            var fileDetTemp = [];
            var itemDet = [];
            var itemDetTemp = [];
            var wtotal = 0;
            var minH = 100000000;
            var minW = 100000000;
            var minWDT = 100000000;
            var minHT = 0;
            var minHTS = 100000000;

            var addMargin = $('#grid').width() * (2 / 100);
            var gridWidth = $('#grid').width();
            var totalWidth = (gridWidth - (addMargin * 2));
            var _G = this;

            var nestedView = 0;

            var gcnt = 0;

            $(this).find('.item').each(function () {
                if (!$(this).attr('data-below'))
                {
                    gcnt++;
                }
            });

            var done = false;
            done = true;

            if (done)
            {
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

                                if ($(this).attr('data-color'))
                                    colorArr.push($(this).attr('data-color'));
                            }
                        });


                        if (flg)
                        {
                            data['nHt'] = minWDT / data['factor'];
                            data['nWt'] = minWDT;
                            tthtd += data['nHt'];
                            data['nest'] = 1;
                        } else {
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

                        if ($(this).attr('data-color'))
                            colorArr.push($(this).attr('data-color'));

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
                var itemArr = [];
                var nextLeft = 0;

                var goin = true;
                var parentMainH = 0;
                var displayTop = 0;
                itemDet.forEach(function (vl, i) {
                    var itemData = {};

                    var vleft = 0;
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

            }
        }

        tto++;
    }).promise().then(function () {
        var cArr = [];
        var str = '<div class="clComm fLeft transition100 bgColl0 forWhite" style="background-color:#ffffff" data-colr="#ffffff" onclick="setBgColor(this)"></div>';
        if (colorArr.length)
        {
            var ctArr = colorArr.join(',');
            var ncArr = ctArr.split(',');

            var imp = {};
            $.each(ncArr, function (i, vl) {
                var imod = i % 5;
                if (imp[imod])
                    imp[imod] += "," + vl;
                else
                    imp[imod] = vl;
            });

            $.each(imp, function (i, vl) {
                var vls = vl.split(",");
                $.each(vls, function (z, vz) {
                    cArr.push(vz);
                });
            });
        }

        if (!cArr.length)
            cArr = $('#cover').attr('data-color').split(",");

        cArr = cArr.filter(onlyUnique);
        cArr = cArr.slice(0, 9);

        $.each(cArr, function (i, vl) {
            str += '<div class="clComm fLeft transition100 bgColl' + i + '" style="background-color:' + vl + '" data-colr="' + vl + '" onclick="setBgColor(this)"></div>';
        });

        if (str) {
            $('#addBGcolor').html(str);
        }
        
        retval = true;
        storyIniatialize();// all controls should be in this.
    });

    if (retval)
        return true;
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function refactor(a, b, obj) {
    if (a == 'auto') {
        var newFactor = $('.activate').attr('data-width') / $('.activate').attr('data-height');
        var facval = '';
    } else {
        var newFactor = a / b;
        var facval = a + ':' + b;
    }

    $('.shComm').removeClass('shActive');
    $(obj).addClass('shActive');
    $('.activate').attr({'data-factor': newFactor});
    $('.activate').attr({'data-facval': facval});
    reArrange(1);
}

function makeCoverImg(){
    var bg = $('.activate.forImg').attr('data-img');
    var cols = $('.activate.forImg').attr('data-color');
    if (bg !== undefined){
        $('body , html').animate({'scrollTop': 0}, 300, 'linear');
        $('.coverSection').css({
            backgroundImage: 'url(' + bg + ')',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
        });

        $('.coverSection').attr('data-img', bg);
        $('.coverSection').attr('data-color', cols);
    }
}

function deleteItem(){
    var _cthis = $('.activate');
    if (_cthis.attr('data-below')){
        _cthis.attr('data-below', '');
        _cthis.remove();
        var arrangeProm = reArrange();
        if (arrangeProm){
            resetRight();
            var adjust = reAdjust();
            if (adjust) {
                reArrange();
            }
        }
    }
    else {
        var fitem = '';
        $('.item').each(function () {
            if (parseInt(_cthis.attr('data-id')) == parseInt($(this).attr('data-below'))) {
                if (fitem) {
                    $(this).attr('data-below', fitem);
                } else {
                    $(this).attr('data-below', '');
                    fitem = $(this).attr('data-id');
                }
            }
        }).promise().then(function () {
            _cthis.remove();
            var arrangeProm = reArrange();
            if (arrangeProm)
            {
                resetRight();
                var adjust = reAdjust();
                if (adjust) {
                    reArrange();
                }
            }
        });
    }
}

function showSavebox(){
    alert('showSavebox');
    
//    var data = 
//     $.ajax({
//            url: NODOMAIN + 'addStory',
//            type: 'POST',
//            data: ,
//            async: true,
//            cache: false,
//            contentType: false,
//            processData: false,
//            success: function (response) {
//                
//            }
//        });
}

function changeCover(){
    $('.coverAddBtn').click();
}

function addText(){
    var addMargin = $('#grid').width() * (2 / 100);
    var gridWidth = $('#grid').width();
    var totalWidth = (gridWidth - (addMargin * 2));
    var title_id = common.generateId();
    
    var str = '<div class="group forTxtPr" >';
    str += '<div class="item forTxt fLeft activate Txt ' + title_id + '" style="cursor:text!important;background: rgb(255, 255, 255);" data-img="' + title_id + '" data-id="' + title_id + '" data-height="" data-width="' + totalWidth + '">';
    str += '<div class="neighData">';
    str += '<div class="neighDataD forData forInps">';
    str += '<input type="text" maxlength="40" class="storyTitle fLeft" id="div-' + title_id + '"   placeholder="Enter your title here">';
    str += '<div class="storyTxt fLeft editable" contentEditable="true"  id="tarea-' + title_id + '" placeholder="And write your story here" spellcheck="false"  onkeypress = "common.checkLength(this,event)"></div>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    $('.activate').removeClass('activate');
    var obj = whereToUpload();
    if (obj)
        $(str).insertBefore(obj);
    else{
        $('#grid').prepend(str);
        $('html, body').velocity('scroll', {duration: 50, offset: 300, easing: 'swing'});
    }

    reArrange();
    common.hManage();
}

function alignText(obj){
    var txtal = $(obj).attr('data-align');
    $('.alactive').removeClass('alactive');
    $(obj).addClass('alactive');
    $('.activate .storyTxt').css({textAlign: txtal});
    $('.activate .storyTitle').css({textAlign: txtal});
    $('.activate .storyTxt').attr('text_align',txtal);
    $('.activate .storyTitle').attr('text_align', txtal);
}

function getColor(hex){
    hex = hex.replace('#', '');
    R = parseInt(hex.substring(0, 2), 16);
    G = parseInt(hex.substring(2, 4), 16);
    B = parseInt(hex.substring(4, 6), 16);
    var computedVl = (((0.299 * R) + ((0.587 * G) + (0.114 * B))) / 255);
    return computedVl > 0.5 ? '#333333' : '#ffffff';
}

function setBgColor(obj){
    $('#forBgCols .clComm').removeClass('clCommActive');
    $(obj).addClass('clCommActive');

    var col = $(obj).attr('data-colr');
    var fontColor = getColor(col);
    
    $('.activate.forTxt').attr('data-bgcolor',col);
    $('.activate.forTxt').attr('data-fontcolor',fontColor);
    $('.activate.forTxt').css({background: col});
    $('.activate.forTxt .storyTitle').css({color: fontColor});
    $('.activate.forTxt .storyTxt').css({color: fontColor});

    if (fontColor == '#ffffff') {
        $('.activate.forTxt .storyTitle').addClass('whitePlaceholder');
        $('.activate.forTxt .storyTxt').addClass('whitePlaceholder');
    } else {
        $('.activate.forTxt .storyTitle').removeClass('whitePlaceholder');
        $('.activate.forTxt .storyTxt').removeClass('whitePlaceholder');
    }
}

function storyIniatialize(){
    $('.storyTitle').on('focus',function(){
        $('.activate').removeClass('activate');
        $(this).closest('.item').addClass('activate');
    });
    
    $('.storyTxt').click(function(e){
        $('.activate').removeClass('activate');
        $(this).closest('.item').addClass('activate');
    });
        
    $('.item').on('mousedown', function () {
        $('.activate').removeClass('activate');
        $(this).addClass('activate');
        $('#deleteBtn').removeClass('dn');
        var isImg = $(this).hasClass('forImg');
        var isText = $(this).hasClass('forTxt');
        var isVideo = $(this).hasClass('forVideo');

        if (isImg){
            $('#coverMkBtn,#forResize,#panelBack').removeClass('dn');
            $('#storyPhoto,#addTextBtn,#changeCoverBtn,#forBgCols,#forTextAlign').addClass('dn');
        } 
        else if (isText){
            $('#coverMkBtn,#storyPhoto,#addTextBtn,#changeCoverBtn,#forResize').addClass('dn');
            $('#forBgCols,#forTextAlign,#panelBack').removeClass('dn');
        }
        else if (isVideo){
            $('#coverMkBtn,#storyPhoto,#addTextBtn,#changeCoverBtn,#forBgCols,#forTextAlign,#forResize').addClass('dn');
            $('#panelBack').removeClass('dn');
        } 
    });
    
    
    $('.group,.item').unbind('mouseenter');
    
    $('.group').bind('mouseenter', function (evnt) {
        _parent = $(this);
    });
    $('.item').bind('mouseenter', function (evnt) {
        _currentItem = $(this);
    });
    
    init();
    
    
    /*
     * 1.storyPhoto
     * 2.addTextBtn
     * 3.changeCoverBtn
     * 4.forBgCols
     * 5.forResize
     * 6.forTextAlign
     * 7.coverMkBtn
     * 8.deleteBtn
     * 9.saveStory
     * 10.panelBack 
     * 11.panelCross
    */

}

function resetRight(){
    $('.activate').removeClass('activate');
    $('#forBgCols,#forTextAlign,#coverMkBtn,#deleteBtn,#forResize,#panelBack').addClass('dn');
    $('#storyPhoto,#addTextBtn,#changeCoverBtn').removeClass('dn');
}


$(document).ready(function(){
    storyIniatialize();
});


function saveStory(){
    alert('saveStory');
}


function videoPlaying(obj){
    var iid = $(obj).attr('id');
    $('.item.'+iid).removeClass('videoLoading');
    $('.item.'+iid).css({'background-color': '#222529'});
}

function submitJson(t){
    var tto = 1;
    var svData = [];
    var groupLen = $('.group').length;
    var storyObj = {};
    storyObj.storyId = 14946669326111;
    storyObj.story_heading = $('#storyMtitle').val();
    storyObj.story_heading_description = $('#storyStitle').val();
    storyObj.writen_by = 'XELPMOC';
    storyObj.writen_by_name_initials = 'X';
    storyObj.writen_by_id = '14946557868453';
    storyObj.writen_by_img = '';
    storyObj.story_cover_photo_path = $('#cover').attr('data-img');
    storyObj.story_cover_photo_code = $('#cover').attr('data-color');
    storyObj.story_cover_photo_slice_code = $('#cover').attr('data-color').split(',')[0];
    
    
    
    if ($('.group').length == 0){
        if(t==0){
            
        }
        else if(t==1){
            
        }
    }
    $('.group').each(function () {
        if (!$(this).find('.item').length) {
            if ($('.group').length == 1){
                
                storyObj.storyJson = '';

                if (tto == groupLen) {
                    
                }
            }
            
        }
        else {
            var story_photo=[];
            var fileDet = [];
            var fileDetTemp = [];
            var itemDet = [];
            var itemDetTemp = [];
            var wtotal = 0;
            var minH = 100000000;
            var minW = 100000000;
            var minWDT = 100000000;
            var minHT = 0;
            var minHTS = 100000000;

            var addMargin = $('#grid').width() * (2 / 100);
            var gridWidth = $('#grid').width();
            var totalWidth = (gridWidth - (addMargin * 2));
            var _G = this;

            var nestedView = 0;

            var gcnt = 0;

            $(this).find('.item').each(function () {
                if (!$(this).attr('data-below'))
                {
                    gcnt++;
                }
            });

            var done = false;
            done = true;

            if (done)
            {
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
                        } else {
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
                var itemArr = [];
                var imgArr = [];
                var nextLeft = 0;

                var goin = true;
                var parentMainH = 0;
                var displayTop = 0;
                itemDet.forEach(function (vl, i) {
                    var itemData = {};
                    
                     
                    var vleft = 0;
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


                    itemData['left'] = $(vl.obj).position().left;
                    itemData['top'] = $(vl.obj).position().top;
                    itemData['id'] = $(vl.obj).attr('data-id');
                    itemData['imagePath'] = $(vl.obj).attr('data-img');
                    
                   
                    
                    
                    if ($(vl.obj).hasClass('forImg'))
                    {
                        itemData['width'] = $(vl.obj).width();
                        itemData['height'] = $(vl.obj).height();
                        itemData['type'] = 'img';
                        itemData['dw'] = $(vl.obj).attr('data-width');
                        itemData['dh'] = $(vl.obj).attr('data-height');
                        itemData['factor'] = $(vl.obj).attr('data-factor');
                        itemData['facval'] = $(vl.obj).attr('data-facval');
                        itemData['color'] = $(vl.obj).attr('data-color');
                        itemData['poster'] = '';
                    } else if ($(vl.obj).hasClass('forTxt'))
                    {
                        itemData['width'] = $(vl.obj).width();
                        itemData['height'] = $(vl.obj).height();
                        itemData['type'] = 'txt';
                        itemData['dw'] = $(vl.obj).attr('data-width');
                        itemData['dh'] = $(vl.obj).attr('data-height');
                        itemData['factor'] = $(vl.obj).attr('data-factor');
                        itemData['facval'] = $(vl.obj).attr('data-facval');
                        itemData['color'] = $(vl.obj).attr('data-color');
                        itemData['poster'] = '';
                    } else if ($(vl.obj).hasClass('forVideo'))
                    {
                        itemData['width'] = $(vl.obj).width();
                        itemData['height'] = $(vl.obj).height();
                        itemData['type'] = 'video';
                        itemData['dw'] = $(vl.obj).attr('data-width');
                        itemData['dh'] = $(vl.obj).attr('data-height');
                        itemData['factor'] = $(vl.obj).attr('data-factor');
                        itemData['facval'] = $(vl.obj).attr('data-facval');
                        itemData['color'] = $(vl.obj).attr('data-color');
                        itemData['poster'] = $(vl.obj).attr('data-poster');
                    }
                    itemData['obj'] = vl.obj;
                    itemData['below'] = $(vl.obj).attr('data-below');
                    
                    if($(vl.obj).attr('data-img')!==""){
                        itemArr.push(itemData);
                    }
                    goin = false;
                    init();
                });

                itemArrTmp = [];
                $.each(itemArr, function (i, vl) {

                    if (!vl.below) {
                        itemArrTmp.push(vl);
                        $.each(itemArr, function (k, vk) {
                            if (vl.id == vk.below)
                                itemArrTmp.push(vk);
                        });
                    }
                });

                var groupData = {};
                groupData['top'] = $(this).position().top;
                groupData['left'] = $(this).position().left;
                groupData['height'] = $(this).height();
                groupData['items'] = itemArrTmp;

                if (tto == $('.group').length)
                {
                    init();
                }

                svData.push(groupData);

               // var storyObj = {};
                storyObj.storyJson = JSON.stringify(svData);
                
                if (tto == groupLen)
                {
                    var story_photo=[];
                    var story_title=[];
                    $('.item').each(function(i,vl){
                        if(!$(this).hasClass('forTxt')){
                            var photoData={};
                            photoData.photo_id=$(this).attr('data-id');
                            photoData.photo_path=$(this).attr('data-img');
                            photoData.color_codes=$(this).attr('data-color');
                            story_photo.push(photoData);
                        }
                        else {
                            var title_data ={};
                            title_data.title_id=$(this).attr('data-id');
                            title_data.title_dimensions= "";
                            title_data.title_text=$(this).find('.storyTitle').val();
                            title_data.bg_color=$(this).attr('data-bgcolor');
                            title_data.text_color=$(this).attr('data-fontcolor');
                            title_data.text_align= $(this).find('.storyTitle').css('textAlign');
                            title_data.description=$(this).find('.storyTxt').html();
                            story_title.push(title_data);
                        }
                    }).promise().then(function(){
                       storyObj.story_photo=story_photo;
                       storyObj.story_title=story_title;
                       console.log('Done traverse');
                       console.log(storyObj);
                       
                       
                       $.ajax({
                           url:NODOMAIN+'addStory',
                           data:storyObj,
                           type:'POST',
                           success:function(res){
                               console.log(res)
                           }
                       })
                       
                    });
                }
            }
        }

        tto++;
    });

}




