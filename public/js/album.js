//<script type="text/javascript" src="../js/album.js"></script>
var $groups_all;
var $griditems_all;
var storyOwner = '';
var userlocalId = common.readFromStorage('userIID');
var userqueryId = common.getParameterByName('userid');
var last_sel = 0;
var current_sel = 0;
var pattern = '';
var l=0;
var ttl;
var storyLoaded= false;
var myEvent = window.attachEvent || window.addEventListener;
var chkevent = window.attachEvent ? 'onbeforeunload' : 'beforeunload';
var isMobile = true;


function deactivateScroll() {
    $('#header').removeClass('pointNone');
    $('.uDiv,.lDiv').unbind('mouseover');
    $('.uDiv,.lDiv').unbind('mouseleave');
    $('.lDiv, .uDiv ').removeClass('hover');
    moveBodyUp();
    moveBodyDown();
}

function moveBodyUp() {
    var sc = $('body').scrollTop();
    var wH = $(document).height() - 100;
    var fl = $('.lDiv').hasClass('hover');
    if (sc < wH && fl){
        var sc1 = sc + 100;
        $('body,html').animate({scrollTop: sc1}, 50, 'linear');
        setTimeout(function () {
            moveBodyUp();
        }, 50);
    }
    else{
        $('body,html').stop();
        return false;
    }
    return false;
}

function moveBodyDown(x, y){
    var sc = $('body').scrollTop();
    var fl = $('.uDiv').hasClass('hover');
    if (sc > 0 && fl){
        var sc1 = sc - 100;
        $('body,html').animate({scrollTop: sc1}, 50, 'linear');
        setTimeout(function () {
            moveBodyDown(x, y);
        }, 50);
    }
    else{
        $('body,html').stop();
        return false;
    }
    return false;
}


function activateScroll(){
    $('#header').addClass('pointNone');
    $('.uDiv').on('mouseover', function (e) {
        $(this).addClass('hover');
        moveBodyDown();
    });
    $('.uDiv').on('mouseleave', function (e) {
        $(this).removeClass('hover');
        moveBodyDown();
    });
    $('.lDiv').on('mouseover', function (e) {
        $(this).addClass('hover');
        moveBodyUp();
    });
    $('.lDiv').on('mouseleave', function (e) {
        $(this).removeClass('hover');
        moveBodyUp();
    });
}

function checkVidinview() {
    if (!$('#gallery').hasClass('galleryOpen') && !isMobile) {
        var sc = $(window).scrollTop();
        var wHeight = $(window).height();
        if (!edit) {
            $('#grid').find('.forVideo').each(function (i, v) {
                var _this = this;
                if ((parseInt($(this).offset().top) <= (sc + wHeight)) && (parseInt($(this).offset().top) + $(this).height() >= (sc))) {
                    var vid = $(_this).find('.video').attr('id');
                    if (vid) {
                        var st = document.getElementById(vid).readyState;
                        if (st == 4) {
                            if (!$(_this).hasClass('paused')) {
                                $(_this).find('.video').get(0).play();
                            }
                        }
                    }
                } else {
                    var vid = $(_this).find('.video').attr('id');
                    if (vid){
                        var st = document.getElementById(vid).readyState;
                        if (st == 4) {
                            $(this).find('.video').get(0).pause();
                        }
                    }
                }
            });
        }
        else {
            $('#grid').find('.video').each(function () {
                $(this).get(0).pause();
            });
        }
    }
}

function readAllFunction(){
    if($(window).width()>1024){
      isMobile= false;
    }
    else{
        isMobile= true;
    }

    $('.actionWrapper').niceScroll({cursorcolor: "#000000", touchbehavior: isTouch, cursorwidth: "4px", autohidemode: false, cursorborder: "0px solid #fff", cursoropacitymin: "1", cursoropacitymax: "1", railpadding: {top: 2, right: 2, left: 2, bottom: 2}, horizrailenabled: false});
    init();

    $(window).scroll(function () {
        if(!isMobile)
            checkVidinview();
    });
    
}




$(document).ready(function () {
    readAllFunction();
});




function completedPageload(){
    $('#pageLoader').addClass('dn');
    var data;
    $('#cover').addClass('scala');
    $('.coverOver').addClass('cloadin');
    $('.neighDataD').addClass('opaCover');

    setTimeout(function () {
        if ($('#grid').children().length > 1) {
            $('#pageLoader').addClass('dn');
            data = $('#cover').attr('data-img');
            if (data)
            {
               $('.forStryCounts').removeClass('nfadeinDown');
               $('.storyOwner,.stryHomeIcon,.stryNeighIcon').removeClass('nfadescale');
            }
        }

    }, 100);

    data = $('#cover').attr('data-img');
    if (data){
        $('#storyFooter').removeClass('dn');
    }
    storyOwner = $('.storyOwner').attr('data-uid');
    $('#grid').find('.video').prop({'muted': true});
    $('#grid').find('.muteIcon').addClass('muted');
}


function slideDown(){
    disableScroll();
    var sc = $('#cover').height();
    $('html, body').velocity('scroll', {duration: 1000, offset: sc, easing: 'swing', complete: function () {
            enableScroll();
        }
    });
}


function resetRight(){
    $('.activate').removeClass('activate');
    $('#forBgCols,#forTextCols,#forTextAlign,#coverMkBtn,#deleteBtn,#forResize,.hback,#saveTxt').addClass('dn');
    $('#storyPhoto,#addTextBtn,#storyVideo,#changeCoverBtn,#homeTagDiv,#neighTagDiv,#aHome,#aNeighbour').removeClass('dn');

    $('.fContopen').siblings('.f_select').velocity({translateX: [-40, 0], opacity: [0, 1]}, {duration: 0, display: 'none'});
    $('.fContopen').find('.f_options').each(function (i) {
        var k = i * 40 + 100;
        $(this).velocity({translateX: [40, 0], opacity: [0, 1]}, {duration: 300, display: 'none', delay: k, complete: function () {
                $('.fContopen').css({'display': 'none'}).removeClass('fContopen');
            }
        });
    });
    $('.slSelect').each(function (i) {
        var k = i * 40 + 100;
        $(this).velocity({translateX: [0, -40], opacity: [1, 0]}, {duration: 0, display: 'block', delay: 0});
    });
}



var lastVid = "";
function initBehaviour(){}



var edit = false;
var dragPos = '';
var odragPos = '';
var _this;
var prevUI;
var _parent;

var groupLeft;
var groupTop;
var ht;
var wt;

var uiLeft;
var uiTop;
var uht;
var uwt;

var _currentItem;
var _lastElement = '';
var _translateItem;
var _translateStatus;


var pr11;
var divMargin = 0;
var rtCnt = 0;

var option = {
    containment: '#grid',
    helper: "clone",
    appendTo: 'body',
    opacity: 0.1,
    scrollSensitivity: 150,
    scrollSpeed: 30,
    cancel: ".editable,.storyTitle",
    scroll: false,
    cursorAt: {top: 0, left: 0},
    start: function (event, ui) {
        $(ui.helper).addClass("ui-draggable-helper1");
        activateScroll();
    },
    drag: function (event, ui) {

        $(ui.helper.context).addClass('dragging');
        $('.drag_follow').removeClass('dn');
        var addMargin = $('#grid').width() * (2 / 100);
        var gridThreshold = $('#grid').offset().top;
        var x = event.pageX;
        var y = event.pageY - gridThreshold;

        prevUI = ui;

        $('body').bind('mousemove', function (evnt) {
            if (_parent)
            {
                groupLeft = parseInt($(_parent).position().left);
                groupTop = parseInt($(_parent).position().top);
                ht = parseInt($(_parent).height());
                wt = parseInt($(_parent).width());
            }

            if (_currentItem)
            {
                uiLeft = parseInt(_currentItem.context.offsetLeft);

                if (_currentItem.parent()) {

                    uiTop = parseInt(_currentItem.parent().position().top + _currentItem.position().top);
                    uht = parseInt(_currentItem.context.offsetHeight);
                    uwt = parseInt(_currentItem.context.offsetWidth);
                }
            }

            var isVideo = $(_currentItem).hasClass('forVideo');
            var isTxt = $(_currentItem).hasClass('forTxt');
            var hasMore = $(_parent).find('.item').length;

            if ($(_currentItem).attr('data-below')){
                var curId = $(_currentItem).attr('data-below');
                var addMHT = 1;
            } 
            else {
                var curId = $(_currentItem).attr('data-id');
                var addMHT = 0;
            }

            if ($(ui.helper.context).hasClass('forVideo')){
                if (parseInt(y) >= parseInt(groupTop + ht - 10) && parseInt(y) <= parseInt(groupTop + ht + 10)){
                    if (dragPos != 'bottom'){
                        dragPos = 'bottom';
                    }
                }
                
                else if (parseInt(y) >= parseInt(groupTop - 10) && parseInt(y) <= parseInt(groupTop + 10)){
                    if (dragPos != 'top'){
                        dragPos = 'top';
                    }
                }
                
                else if (parseInt(x) >= parseInt(uiLeft + addMargin + uwt - 40) && parseInt(x) <= parseInt(uiLeft + addMargin + uwt + 40) && !isTxt){
                    if (dragPos != 'UIright'){
                        dragPos = 'UIright';
                    }
                    
                } 
                else if (parseInt(x) <= parseInt(uiLeft + addMargin + 40) && parseInt(x) >= parseInt(uiLeft + addMargin - 40) && !isTxt){
                    if (dragPos != 'UIleft'){
                        dragPos = 'UIleft';
                    }
                    
                } 
                else if (parseInt(y) >= parseInt(uiTop + uht - 40) && parseInt(y) <= parseInt(uiTop + uht + 40) && parseInt(x) >= parseInt(uiLeft) && x <= parseInt(uiLeft + uwt) && hasMore > 1){
                    if (parseInt($(_currentItem).attr('data-id')) != parseInt($(ui.helper.context).attr('data-id'))){
                        if (dragPos != 'UIbottom'){
                            dragPos = 'UIbottom';
                        }
                    }
                }
                else if (parseInt(y) >= parseInt(uiTop - 40) && parseInt(y) <= parseInt(uiTop + 40) && parseInt(x) >= parseInt(uiLeft) && x <= parseInt(uiLeft + uwt) && hasMore > 1){
                    if (parseInt($(_currentItem).attr('data-id')) != parseInt($(ui.helper.context).attr('data-id'))){
                        if (dragPos != 'UItop'){
                            dragPos = 'UItop';
                        }
                    }
                } 
                else if ((parseInt(x) > parseInt(uiLeft + addMargin + 40)) && (parseInt(x) < parseInt(uiLeft + uwt + addMargin - 40)) && (parseInt(y) >= (uiTop + 40)) && (parseInt(y) <= (uiTop + uht - 40)) && !isTxt){
                    if (dragPos != 'UIswap'){
                        dragPos = 'UIswap';
                    }
                } 
                else{
                    dragPos = '';
                }
            } 
            else if ($(ui.helper.context).hasClass('forTxt')) {
                if (parseInt(y) >= parseInt(groupTop + ht - 10) && parseInt(y) <= parseInt(groupTop + ht + 10)){
                    if (dragPos != 'TVbottom'){
                        dragPos = 'TVbottom';
                    }
                }
                else if (parseInt(y) >= parseInt(groupTop - 10) && parseInt(y) <= parseInt(groupTop + 10)){
                    if (dragPos != 'TVtop'){
                        dragPos = 'TVtop';
                    }
                } 
                else{
                    dragPos = '';
                }
            } 
            else {
                if (parseInt(y) >= parseInt(groupTop + ht - 10) && parseInt(y) <= parseInt(groupTop + ht + 10)){
                    if (dragPos != 'bottom'){
                        dragPos = 'bottom';
                    }
                }
                else if (parseInt(y) >= parseInt(groupTop - 10) && parseInt(y) <= parseInt(groupTop + 10)){
                    if (dragPos != 'top'){
                        dragPos = 'top';
                    }
                }
                else if (parseInt(x) >= parseInt(uiLeft + addMargin + uwt - 40) && parseInt(x) <= parseInt(uiLeft + addMargin + uwt + 40) && !isTxt){
                    if (dragPos != 'UIright'){
                        dragPos = 'UIright';
                    }
                } 
                else if (parseInt(x) <= parseInt(uiLeft + addMargin + 40) && parseInt(x) >= parseInt(uiLeft + addMargin - 40) && !isTxt){
                    if (dragPos != 'UIleft'){
                        dragPos = 'UIleft';
                    }
                }
                else if (parseInt(y) >= parseInt(uiTop + uht - 40) && parseInt(y) <= parseInt(uiTop + uht + 40) && hasMore > 1){
                    if (parseInt($(_currentItem).attr('data-id')) != parseInt($(ui.helper.context).attr('data-id'))){
                        if (dragPos != 'UIbottom'){
                            dragPos = 'UIbottom';
                        }
                    }
                } 
                else if (parseInt(y) >= parseInt(uiTop - 40) && parseInt(y) <= parseInt(uiTop + 40) && hasMore > 1){
                    if (parseInt($(_currentItem).attr('data-id')) != parseInt($(ui.helper.context).attr('data-id'))){
                        if (dragPos != 'UItop'){
                            dragPos = 'UItop';
                        }
                    }
                } 
                else if ((parseInt(x) > parseInt(uiLeft + addMargin + 40)) && (parseInt(x) < parseInt(uiLeft + uwt + addMargin - 40)) && (parseInt(y) >= (uiTop + 40)) && (parseInt(y) <= (uiTop + uht - 40)) && !isTxt){
                    if (dragPos != 'UIswap'){
                        dragPos = 'UIswap';
                    }
                } 
                else{
                    dragPos = '';
                }
            }

        });

        switch (dragPos) {
            case 'UIright':
            case 'UIleft':
            case 'bottom':
            case 'top':
            case 'TVbottom':
            case 'TVtop':
            case 'TVright':
            case 'TVleft':
            case 'UIbottom':
            case 'UItop':
                $('.swapImg').removeClass('swapImg');
                if (odragPos != dragPos)
                {
                    if (dragPos == 'bottom' || dragPos == 'top')
                    {
                        if (!$(_currentItem).parent().hasClass('moved'))
                        {
                            showDragLine(dragPos);
                            odragPos = dragPos;
                        }
                    } else {
                        if (!$(_currentItem).hasClass('moved')) {
                            showDragLine(dragPos);
                            odragPos = dragPos;
                        }
                    }
                }
                break;
            case 'UIswap':
                if (odragPos != dragPos)
                {
                    showDragLine(dragPos, ui);
                    odragPos = dragPos;
                }
                break;

            default:
                $('.swapImg').removeClass('swapImg');
                $('.moved').css({'transform': 'translateX(0px)'});
                $('.moved').css({'transform': 'translateY(0px)'});
                $('.moved').removeClass('moved');
                purgeLinesyle();
                $('.drag-line').appendTo('#grid');
                break;
        }
    },
    stop: function (event, ui) {
        deactivateScroll();
        purgeLinesyle();
        $('.drag-line').appendTo('#grid');
        $(_currentItem).removeClass('swapImg');
        $('.dragging').removeClass('dragging');
        $('.drag_follow').addClass('dn');
        $('body').unbind('mousemove');
        $('.item').unbind('mouseover');
        if (dragPos == 'UIswap'){
            ui.helper.context.style.height = uht + "px";
            ui.helper.context.style.width = uwt + "px";
            ui.helper.context.style.left = uiLeft + "px";
            ui.helper.context.style.top = "0px";
            var changeDt = [];
            var uiBelow = $(ui.helper.context).attr('data-below');
            var cBelow = $(_currentItem).attr('data-below');
            if (parseInt($(_currentItem).attr('data-below')) == parseInt($(ui.helper.context).attr('data-id'))){
                $(_currentItem).attr('data-below', '');
                $('.item').each(function () {
                    if (parseInt($(ui.helper.context).attr('data-id')) == parseInt($(this).attr('data-below'))) {
                        $(this).attr('data-below', $(_currentItem).attr('data-id'));
                    }
                    else if (parseInt($(ui.helper.context).attr('data-id')) == parseInt($(this).attr('data-id'))){
                        $(this).attr('data-below', $(_currentItem).attr('data-id'));
                    }
                });
            } 
            else if (parseInt($(_currentItem).attr('data-id')) == parseInt($(ui.helper.context).attr('data-below'))){
                $(ui.helper.context).attr('data-below', '');
                $('.item').each(function () {
                    if (parseInt($(_currentItem).attr('data-id')) == parseInt($(this).attr('data-below'))) {
                        $(this).attr('data-below', $(ui.helper.context).attr('data-id'));
                    }
                    else if (parseInt($(_currentItem).attr('data-id')) == parseInt($(this).attr('data-id'))){
                        $(this).attr('data-below', $(ui.helper.context).attr('data-id'));
                    }
                });
            }
            else if ($(_currentItem).attr('data-below') && $(ui.helper.context).attr('data-below')) {
                var tmpCh = $(_currentItem).attr('data-below');
                $(_currentItem).attr('data-below', $(ui.helper.context).attr('data-below'));
                $(ui.helper.context).attr('data-below', tmpCh);
            }
            else if (!$(_currentItem).attr('data-below') && !$(ui.helper.context).attr('data-below')) {
                var uiId = $(ui.helper.context).attr('data-id');
                var cId = $(_currentItem).attr('data-id');
                var uiChilds = [];
                var cChilds = [];
                $('.item').each(function () {
                    if (parseInt(uiId) == parseInt($(this).attr('data-below'))) {
                        uiChilds.push(this);
                    }
                });

                $('.item').each(function () {
                    if (parseInt(cId) == parseInt($(this).attr('data-below'))) {
                        cChilds.push(this);
                    }
                });

                $.each(uiChilds, function (i, vl) {
                    $(vl).attr('data-below', cId);
                });
                
                $.each(cChilds, function (i, vl) {
                    $(vl).attr('data-below', uiId);
                });
            } 
            else if (!$(_currentItem).attr('data-below')){
                var tmpCh = $(ui.helper.context).attr('data-below');
                var newid = $(ui.helper.context).attr('data-id');
                $('.item').each(function () {
                    if (parseInt($(_currentItem).attr('data-id')) == parseInt($(this).attr('data-below'))) {
                        $(this).attr('data-below', newid);
                    }
                });
                $(_currentItem).attr('data-below', tmpCh);
                $(ui.helper.context).attr('data-below', '');
            } 
            else if (!$(ui.helper.context).attr('data-below')){
                var tmpCh = $(_currentItem).attr('data-below');
                var newid = $(_currentItem).attr('data-id');
                $('.item').each(function () {
                    if (parseInt($(ui.helper.context).attr('data-id')) == parseInt($(this).attr('data-below'))) {
                        $(this).attr('data-below', newid);
                    }
                });
                $(ui.helper.context).attr('data-below', tmpCh);
                $(_currentItem).attr('data-below', '');
            }

            var newUi = $(ui.helper.context).clone();
            $(newUi).insertAfter(_currentItem);
            $(_currentItem).insertAfter($(ui.helper.context));
            $(ui.helper.context).remove();
            var arrangeProm = reArrange();
            if (arrangeProm){
                init();
                var adjust = reAdjust();
                if (adjust) {
                    reArrange();
                    init();
                }
            }
        }
        else if (dragPos == 'UIright'){
            ui.helper.context.style.height = uht + "px";
            ui.helper.context.style.width = uwt + "px";
            ui.helper.context.style.left = uiLeft + "px";
            ui.helper.context.style.top = "0px";

            if ($(_currentItem).attr('data-below')) 
                var curId = $(_currentItem).attr('data-below');
            else 
                var curId = $(_currentItem).attr('data-id');

            var elet;

            $('#grid .item').each(function (i) {
                if (parseInt(curId) == parseInt($(this).attr('data-below'))) {
                    elet = this;
                }
            }).promise().then(function () {
                if ($(ui.helper.context).attr('data-below'))
                    $(ui.helper.context).attr('data-below', '');
                else {
                    var fitem = '';
                    $('#grid .item').each(function () {
                        if (parseInt($(ui.helper.context).attr('data-id')) == parseInt($(this).attr('data-below'))) {
                            if (fitem) {
                                $(this).attr('data-below', fitem);
                            } else {
                                $(this).attr('data-below', '');
                                fitem = $(this).attr('data-id');
                            }
                        }
                    });
                }

                if (elet)
                    $(ui.helper.context.outerHTML).insertAfter(elet);
                else
                    $(ui.helper.context.outerHTML).insertAfter(_currentItem);

                $(ui.helper.context).remove();
            }).then(function () {
                var arrangeProm = reArrange();
                if (arrangeProm)
                {
                    init();
                    var adjust = reAdjust();
                    if (adjust) {
                        reArrange();
                        init();
                    }
                }
            });
        } 
        else if (dragPos == 'UIleft'){
            ui.helper.context.style.height = uht + "px";
            ui.helper.context.style.width = uwt + "px";
            ui.helper.context.style.left = uiLeft + "px";
            ui.helper.context.style.top = "0px";
            if ($(_currentItem).attr('data-below')) 
                var curId = $(_currentItem).attr('data-below');
            else 
                var curId = $(_currentItem).attr('data-id');
            var elet = $('.' + curId);

            if ($(ui.helper.context).attr('data-below'))
                $(ui.helper.context).attr('data-below', '');
            else {
                var fitem = '';
                $('.item').each(function () {
                    if (parseInt($(ui.helper.context).attr('data-id')) == parseInt($(this).attr('data-below'))) {
                        if (fitem) {
                            $(this).attr('data-below', fitem);
                        } else {
                            $(this).attr('data-below', '');
                            fitem = $(this).attr('data-id');
                        }
                    }
                });
            }


            if (elet)
                $(ui.helper.context.outerHTML).insertBefore(elet);
            else
                $(ui.helper.context.outerHTML).insertBefore(_currentItem);

            $(ui.helper.context).remove();
            var arrangeProm = reArrange();
            if (arrangeProm){
                init();
                var adjust = reAdjust();
                if (adjust) {
                    reArrange();
                    init();
                }
            }
        }
        
        if (dragPos == 'UIbottom'){
            ui.helper.context.style.height = uht + "px";
            ui.helper.context.style.width = uwt + "px";
            ui.helper.context.style.left = uiLeft + "px";
            ui.helper.context.style.top = "0px";

            if ($(ui.helper.context).attr('data-below'))
                $(ui.helper.context).attr('data-below', '');
            else {
                var fitem = '';
                $('.item').each(function () {
                    if (parseInt($(ui.helper.context).attr('data-id')) == parseInt($(this).attr('data-below'))) {
                        if (fitem) {
                            $(this).attr('data-below', fitem);
                        } else {
                            $(this).attr('data-below', '');
                            fitem = $(this).attr('data-id');
                        }
                    }
                });
            }

            if ($(_currentItem).attr('data-below'))
                $(ui.helper.context).attr('data-below', $(_currentItem).attr('data-below'));
            else
                $(ui.helper.context).attr('data-below', $(_currentItem).attr('data-id'));

            $(ui.helper.context.outerHTML).insertAfter(_currentItem);
            $(ui.helper.context).remove();
            var arrangeProm = reArrange();
            if (arrangeProm){
                init();
                var adjust = reAdjust();
                if (adjust) {
                    reArrange();
                    init();
                }
            }

        }

        if (dragPos == 'UItop'){
            ui.helper.context.style.height = uht + "px";
            ui.helper.context.style.width = uwt + "px";
            ui.helper.context.style.left = uiLeft + "px";
            ui.helper.context.style.top = "0px";

            if ($(ui.helper.context).attr('data-below'))
                $(ui.helper.context).attr('data-below', '');
            else {
                var fitem = '';
                $('.item').each(function () {
                    if (parseInt($(ui.helper.context).attr('data-id')) == parseInt($(this).attr('data-below'))) {
                        if (fitem) {
                            $(this).attr('data-below', fitem);
                        } else {
                            $(this).attr('data-below', '');
                            fitem = $(this).attr('data-id');
                        }
                    }
                });
            }

            if ($(_currentItem).attr('data-below')){
                $(ui.helper.context).attr('data-below', $(_currentItem).attr('data-below'))
                $(ui.helper.context.outerHTML).insertBefore(_currentItem);
                $(ui.helper.context).remove();
                var arrangeProm = reArrange();
                if (arrangeProm){
                    init();
                    var adjust = reAdjust();
                    if (adjust) {
                        reArrange();
                        init();
                    }
                }
            }
            else {
                $('.item').each(function () {
                    if (parseInt($(_currentItem).attr('data-id')) == parseInt($(this).attr('data-below'))){
                        $(this).attr('data-below', $(ui.helper.context).attr('data-id'));
                    }
                }).promise().then(function () {
                    $(_currentItem).attr('data-below', $(ui.helper.context).attr('data-id'));
                    $(ui.helper.context.outerHTML).insertBefore(_currentItem);
                    $(ui.helper.context).remove();
                    var arrangeProm = reArrange();
                    if (arrangeProm){
                        init();
                        var adjust = reAdjust();
                        if (adjust) {
                            reArrange();
                            init();
                        }
                    }
                });
            }
        }
        else if (dragPos == 'TVright'){
            if ($(ui.helper.context).attr('data-id') != $(_currentItem).attr('data-id')) {
                ui.helper.context.style.height = uht + "px";
                ui.helper.context.style.width = uwt + "px";
                ui.helper.context.style.left = uiLeft + "px";
                ui.helper.context.style.top = "0px";

                $(ui.helper.context).attr('data-below', '');
                var str = ui.helper.context.outerHTML;
                var id = $(ui.helper.context).attr('data-id');
                $('.' + id).remove();
                $(str).insertAfter($(_currentItem));
                var arrangeProm = reArrange();
                if (arrangeProm){
                    init();
                    var adjust = reAdjust();
                    if (adjust) {
                        reArrange();
                        init();
                    }
                }
            }
        } 
        else if (dragPos == 'TVleft')
        {
            if ($(ui.helper.context).attr('data-id') != $(_currentItem).attr('data-id')) {
                ui.helper.context.style.height = uht + "px";
                ui.helper.context.style.width = uwt + "px";
                ui.helper.context.style.left = uiLeft + "px";
                ui.helper.context.style.top = "0px";
                $(ui.helper.context).attr('data-below', '');
                var str = ui.helper.context.outerHTML;
                var id = $(ui.helper.context).attr('data-id');
                $('.' + id).remove();
                $(str).insertBefore($(_currentItem));
                var arrangeProm = reArrange();
                if (arrangeProm){
                    init();
                    var adjust = reAdjust();
                    if (adjust) {
                        reArrange();
                        init();
                    }
                }
            }
        }
        else if (dragPos == 'bottom'){
            ui.helper.context.style.height = uht + "px";
            ui.helper.context.style.width = uwt + "px";
            ui.helper.context.style.left = uiLeft + "px";
            ui.helper.context.style.top = "0px";

            if ($(ui.helper.context).attr('data-below'))
                $(ui.helper.context).attr('data-below', '');
            else {
                var fitem = '';
                $('.item').each(function () {
                    if (parseInt($(ui.helper.context).attr('data-id')) == parseInt($(this).attr('data-below'))) {
                        if (fitem) {
                            $(this).attr('data-below', fitem);
                        } else {
                            $(this).attr('data-below', '');
                            fitem = $(this).attr('data-id');
                        }
                    }
                });
            }

            var str = '<div class="group newest" style="height: ' + ui.helper.context.style.width + 'px;">';
            str += ui.helper.context.outerHTML;
            str += '</div>';
            $(str).insertAfter($(_parent));
            $(ui.helper.context).remove();
            var arrangeProm = reArrange();
            if (arrangeProm){
                init();
                var adjust = reAdjust();
                if (adjust) {
                    reArrange();
                    init();
                }
            }
        } 
        else if (dragPos == 'top'){
            ui.helper.context.style.height = uht + "px";
            ui.helper.context.style.width = uwt + "px";
            ui.helper.context.style.left = uiLeft + "px";
            ui.helper.context.style.top = "0px";

            if ($(ui.helper.context).attr('data-below'))
                $(ui.helper.context).attr('data-below', '');
            else {
                var fitem = '';
                $('.item').each(function () {
                    if (parseInt($(ui.helper.context).attr('data-id')) == parseInt($(this).attr('data-below'))) {
                        if (fitem) {
                            $(this).attr('data-below', fitem);
                        } else {
                            $(this).attr('data-below', '');
                            fitem = $(this).attr('data-id');
                        }
                    }
                });
            }

            var str = '<div class="group newest" style="height: ' + ui.helper.context.style.width + 'px;">';
            str += ui.helper.context.outerHTML;
            str += '</div>';
            $(str).insertBefore($(_parent));
            $(ui.helper.context).remove();
            var arrangeProm = reArrange();
            if (arrangeProm){
                init();
                var adjust = reAdjust();
                if (adjust) {
                    reArrange();
                    init();
                }
            }
        }
        else if (dragPos == 'TVbottom')
        {
            var tcl = '';
            if ($(ui.helper.context).hasClass('forTxt')) {
                tcl = 'forTxtPr';
                ui.helper.context.style.width = "100%";
                var txt1 = $(ui.helper.context).find('.storyTitle').val();
                var txt2 = $(ui.helper.context).find('.storyTxt').html();
            }
            else{
                ui.helper.context.style.height = uht + "px";
                ui.helper.context.style.width = uwt + "px";
            }

            ui.helper.context.style.left = uiLeft + "px";
            ui.helper.context.style.top = "0px";

            $(ui.helper.context).attr('data-below', '');
            var str = '<div class="group newG ' + tcl + '" >';
            str += ui.helper.context.outerHTML;
            str += '</div>';

            var id = $(ui.helper.context).attr('data-id');
            $('.' + id).remove();
            $(str).insertAfter($(_parent));
            $('.newG').find('.storyTitle').val(txt1);
            $('.newG').find('.storyTxt').html(tx);
            $('.newG').removeClass('newG');
            common.hManage();
            var arrangeProm = reArrange();
            if (arrangeProm){
                init();
                var adjust = reAdjust();
                if (adjust) {
                    reArrange();
                    init();
                }
            }
        }
        else if (dragPos == 'TVtop') {
            var tcl = '';
            if ($(ui.helper.context).hasClass('forTxt')) {
                tcl = 'forTxtPr';
                var addMargin = $('#grid').width() * (2 / 100);
                var gridWidth = $('#grid').width();
                var totalWidth = (gridWidth - (addMargin * 2));
                ui.helper.context.style.width = "100%";
                var txt1 = $(ui.helper.context).find('.storyTitle').val();
                var txt2 = $(ui.helper.context).find('.storyTxt').html();
            }
            else {
                ui.helper.context.style.height = uht + "px";
                ui.helper.context.style.width = uwt + "px";
            }
            ui.helper.context.style.left = uiLeft + "px";
            ui.helper.context.style.top = "0px";

            $(ui.helper.context).attr('data-below', '');

            var str = '<div class="group newG ' + tcl + '">';
            str += ui.helper.context.outerHTML;
            str += '</div>';

            var id = $(ui.helper.context).attr('data-id');
            $('.' + id).remove();
            $(str).insertBefore($(_parent));
            $('.newG').find('.storyTitle').val(txt1);
            var tx = $.trim(txt2);
            $('.newG').find('.storyTxt').html(tx);
            $('.newG').removeClass('newG');
            common.hManage();
            var arrangeProm = reArrange();
            if (arrangeProm){
                init();
                var adjust = reAdjust();
                if (adjust) {
                    reArrange();
                    init();
                }
            }
        }

        $('.moved').css({'transform': 'translateX(0px)'});
        $('.moved').css({'transform': 'translateY(0px)'});
        $('.moved').removeClass('moved');
        dragPos = '';
        setTimeout(function(){
            var sTp = $('.activate').offset().top - 100;
            var sc = $('body').scrollTop();

            if (sTp > sc && sTp < (ph + sc)){
                //
            } else
               $('body').animate({'scrollTop': sTp}, 300);
        },100);
    }
};

function reAdjust() {
    var retval = false;
    $('.group').each(function () {
        var cnt = 0;
        var _G = this;
        $(this).find('.item').each(function () {
            if (!$(this).attr('data-below')) {
                cnt++;
            }
        }).promise().then(function () {
            if (cnt == 1)
            {
                var newG = _G;
                var itemlen = $(_G).find('.item').length - 1;
                var itcnt = 1;
                var str = '';
                $(_G).find('.item').each(function () {
                    if ($(this).attr('data-below')) {
                        $(this).attr('data-below', '');
                        var ggid = $(this).attr('data-id');
                        var gid = 'img-' + ggid;

                        str += '<div class="group" id="' + gid + '">';
                        str += $(this).context.outerHTML;
                        str += '</div>';
                        $(this).remove();
                    }
                }).promise().then(function () {
                    $(str).insertAfter($(_G));
                    retval = true;
                });
            }
        });

    });

    if (retval)
        return true;
    else
        return false;
}

function init() {
    if (edit) {
        $('#grid .item').draggable(option);
    }
}

function addG(_G, gcnt) {
    var tt = 0;
    if (gcnt == 1){
        $(_G).find('.item').each(function () {
            if ($(this).attr('data-below')){
                $(this).attr('data-below', '');
                var ggid = $(this).attr('data-id');
                var gid = 'img-' + ggid;
                var str = '<div class="group" id="' + gid + '">';
                str += '</div>';
                $(str).insertAfter($(_G));
                $('#img-' + ggid).html($(this).context.outerHTML);
                $(this).remove();
            }
            tt++;
        });
        if (tt == $(_G).find('.item').length){
            return true;
        }
    } else {
        return true;
    }
}


var galleryinvoked = 0;
function reArrange(n){
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
            if ($('.group').length == 1){
                var storyObj = {};
                storyObj.storyId = storyid;
                storyObj.storyJson = '';
                storyObj.userid = common.readFromStorage("userIID");

            }
            $(this).remove();
            reArrange();
            return false;
        }
        else {
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
                    itemArr.push(itemData);
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

                var storyObj = {};
                storyObj.storyId = storyid;
                storyObj.storyJson = JSON.stringify(svData);
                storyObj.userid = common.readFromStorage("userIID");
            }
        }

        tto++;
    }).promise().then(function () {
        var cArr = [];
        var str = '<div class="clComm fLeft transition100 bgColl0 forWhite" style="background-color:#ffffff" data-colr="#ffffff"></div>';
        if (colorArr.length){
            var ctArr = colorArr.join(',');
            var ncArr = ctArr.split(',');
            var imp = {};
            $.each(ncArr, function (i, vl) {
                var imod = i % 5
                if (imp[imod])
                    imp[imod] += "," + vl;
                else
                    imp[imod] = vl;
            });

            $.each(imp, function (i, vl) {
                var vls = vl.split(",");
                $.each(vls, function (z, vz) {
                    cArr.push(vz);
                })
            });
        }

        if (!cArr.length)
            cArr = $('#cover').attr('data-color').split(",");
        cArr = cArr.filter(onlyUnique);
        cArr = cArr.slice(0, 9);

        $.each(cArr, function (i, vl) {
            str += '<div class="clComm fLeft transition100 bgColl' + i + '" style="background-color:' + vl + '" data-colr="' + vl + '"></div>';
        });
        if (str){
            $('#addBGcolor').html(str);
            $('#forBgCols .clComm').unbind('click');
            $('#forBgCols .clComm').bind('click', function () {
                $('#forBgCols .clComm').removeClass('clCommActive');
                $(this).addClass('clCommActive');
                var col = $(this).attr('data-colr');
                var fontColor = getColor(col);
                var storyObj = {};
                var divid = $('.activate.forTxt .storyTitle').attr('id');
                var didarr = divid.split('-');
                storyObj.bg_color = col;
                storyObj.text_color = fontColor;
                $('.activate.forTxt').css({background: col});
                $('.activate.forTxt .storyTitle').css({color: fontColor});
                $('.activate.forTxt .storyTxt').css({color: fontColor});
                if (fontColor == '#ffffff'){
                    $('.activate.forTxt .storyTitle').addClass('whitePlaceholder');
                    $('.activate.forTxt .storyTxt').addClass('whitePlaceholder');
                }
                else {
                    $('.activate.forTxt .storyTitle').removeClass('whitePlaceholder');
                    $('.activate.forTxt .storyTxt').removeClass('whitePlaceholder');
                }

            });
        }

        $('.group').bind('mouseenter', function (evnt) {
            _parent = $(this);
        });
        $('.item').bind('mouseenter', function (evnt) {
            _currentItem = $(this);
        });

        initBehaviour();
        if (!$('.coverDownArrow').hasClass('fstR')) {
            if ($('#grid').children().length <= 1) {
                $('.coverDownArrow').addClass('nScale');
            } else {
                $('.coverDownArrow').removeClass('nScale');
            }
        }

        retval = true;
    });
    if (retval)
        return true;
}

function moveDown(type) {
    var dht = $(document).height();
    if(type == 1)
        dht = 0;
    $('body').animate({scrollTop: dht}, 500);
}


function changeCover(){
    moveDown(1);
    $('.coverAddBtn').click();
}

function checkCoverImg(){
    var data = $('#cover').attr('data-img');
    if (data){
        $('#coverInfoCap').addClass('dn');
        $('#coverInfo,.editBtnStory,#coverPattern').removeClass('dn');
        $('#coverInfo .neighDataD').css({'opacity': 1});
    } else {
        $('#coverInfoCap').removeClass('dn');
        $('#coverInfo,.editBtnStory1').addClass('dn');
        $('#coverInfo .neighDataD').css({'opacity': 0});
    }
}


function closeThis() {alert('close This');}
function deleteThis(){ alert('close This'); }

var tiArr = [];

function addDescription(title_id){
    var addMargin = $('#grid').width() * (2 / 100);
    var gridWidth = $('#grid').width();
    var totalWidth = (gridWidth - (addMargin * 2));

    var str = '<div class="group forTxtPr" >';
    str += '<div class="item forTxt fLeft activate Txt ' + title_id + '" style="cursor:text!important;background: rgb(255, 255, 255);" data-img="' + title_id + '" data-id="' + title_id + '" data-height="" data-width="' + totalWidth + '">';
    str += '<div class="neighData">';
    str += '<div class="neighDataD forData forInps">';
    str += '<input type="text" maxlength="40" class="storyTitle fLeft" id="div-' + title_id + '" onblur="savetitle(' + title_id + ')""  placeholder="Enter your title here">';
    str += '<div class="storyTxt fLeft editable" contentEditable="true"  id="tarea-' + title_id + '" placeholder="And write your story here" spellcheck="false"  onkeypress = "common.checkLength(this,event)"></div>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    var obj = whereToUpload();
    if (obj)
        $(str).insertBefore(obj);
    else {
        $('#grid').prepend(str);
        $('html, body').velocity('scroll', {duration: 50, offset: 300, easing: 'swing'});
    }

    //reArrange();
    common.hManage();
    //init();
}


function removeEmpty(obj){
    $(obj).removeClass('empty');
}




function refactor(a, b) {
    if (a == 'auto') {
        var newFactor = $('.activate').attr('data-width') / $('.activate').attr('data-height');
        var facval = '';
    } else {
        var newFactor = a / b;
        var facval = a + ':' + b;
    }

    $('.activate').attr({'data-factor': newFactor});
    $('.activate').attr({'data-facval': facval});
    reArrange(1);
}


function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function purgeLinesyle(){
  $('.drag-line').removeClass('dragLeft dragTop dragBottom dragLeft sOffsetbot sOffsettop');
  $('.groupHighlight').removeClass('groupHighlight');
}

function showDragLine(p, ui){
    purgeLinesyle();
    if (p == 'UIbottom'){
        $('.moved').css({'transform': 'translateY(0px)'});
        $('.moved').css({'transform': 'translateX(0px)'});
        $('.moved').removeClass('moved');
        if (_currentItem.parent()) {
            var uiTop = parseInt($(_currentItem).position().top + _currentItem.parent().position().top);
           $('.drag-line').appendTo($(_currentItem));
        }
        else {
          $('.drag-line').appendTo($(_currentItem));
        }
            
        if ($(_currentItem).attr('data-below')){
            var curId = $(_currentItem).attr('data-below')
        }
        else {
            var curId = $(_currentItem).attr('data-id');
            _lastElement = $('.' + curId);
        }

            var firstEle = $('.' + curId);
            $(_currentItem).closest('.group').addClass('groupHighlight');
            var translateAmt = 5;
            if(!_currentItem.next('.item').attr('data-below')){
                $('.drag-line').addClass('sOffsetbot');
                   translateAmt = 10;
            }

                
            $('.drag-line').addClass('dragBottom');
            $('.item').each(function () {
                if (parseInt(curId) == parseInt($(this).attr('data-below'))) {
                    if ($(_currentItem).position().top >= $(this).position().top) {
                        $(this).css({'transform': 'translateY(-5px)'});
                        $(this).addClass('moved');
                    } else {
                        $(this).css({'transform': 'translateY(5px)'});
                        $(this).addClass('moved');
                    }
                } else if (parseInt(curId) == parseInt($(this).attr('data-id'))) {
                    if ($(_currentItem).position().top >= $(this).position().top) {
                        $(this).css({'transform': 'translateY(-5px)'});
                        $(this).addClass('moved');
                    } else {
                        $(this).css({'transform': 'translateY(5px)'});
                        $(this).addClass('moved');
                    }
                }
            }).promise().then(function () {
                $(_currentItem).css({'transform': 'translateY(-'+translateAmt+'px)'});
                $(_currentItem).addClass('moved');
            });
    }
    
    if (p == 'UItop'){
        $('.moved').css({'transform': 'translateY(0px)'});
        $('.moved').css({'transform': 'translateX(0px)'});
        $('.moved').removeClass('moved');
        if (_currentItem.parent()) {
           $('.drag-line').appendTo($(_currentItem));
        }
        else {
          $('.drag-line').appendTo($(_currentItem));
        }
        
        $(_currentItem).closest('.group').addClass('groupHighlight');
            if ($(_currentItem).attr('data-below'))
                var curId = $(_currentItem).attr('data-below');
            else 
                var curId = $(_currentItem).attr('data-id');
            
            $('.drag-line').addClass('dragTop');
            var translateAmt = 5;
            if(!_currentItem.attr('data-below')){
                $('.drag-line').addClass('sOffsettop');
                translateAmt = 10;
            }
                
            $('.item').each(function(){
                if (parseInt(curId) == parseInt($(this).attr('data-below'))) {
                    if ($(_currentItem).position().top > $(this).position().top) {
                        $(this).css({'transform': 'translateY(-5px)'});
                        $(this).addClass('moved');
                    } else {
                        $(this).css({'transform': 'translateY(+5px)'});
                        $(this).addClass('moved');
                    }
                } else if (parseInt(curId) == parseInt($(this).attr('data-id'))) {
                    if ($(_currentItem).position().top >= $(this).position().top) {
                        $(this).css({'transform': 'translateY(-5px)'});
                        $(this).addClass('moved');
                    } else {
                        $(this).css({'transform': 'translateY(+5px)'});
                        $(this).addClass('moved');
                    }
                }
            }).promise().then(function () {
                $(_currentItem).css({'transform': 'translateY('+translateAmt+'px)'});
                $(_currentItem).addClass('moved');
            });
    }
    if (p == 'UIswap'){
        if (parseInt($(_currentItem).attr('data-id')) == parseInt($(ui.helper.context).attr('data-id'))){
            $('.moved').css({'transform': 'translateX(0px)'});
            $('.moved').css({'transform': 'translateY(0px)'});
            $('.moved').removeClass('moved');
            return false;
        }
        $('.moved').css({'transform': 'translateX(0px)'});
        $('.moved').css({'transform': 'translateY(0px)'});
        $('.moved').removeClass('moved');
        $(_currentItem).addClass('swapImg');
    }
    
    if (p == 'UIright' || p == 'TVright'){
       $('.drag-line').appendTo($(_currentItem).parent());
       var currRight= $(_currentItem).position().left + $(_currentItem).outerWidth(true) -2;

        $('.drag-line').addClass('dragLeft');
        $('.drag-line').css({'left':currRight});
        $('.moved').css({'transform': 'translateY(0px)'});
        $('.moved').css({'transform': 'translateX(0px)'});
        $('.moved').removeClass('moved');
        if (_currentItem.parent()){
            var uiTop = parseInt(_currentItem.parent().position().top);
        } else {
            var uiTop = 0;
        }
        
        var uiLeft = parseInt(_currentItem.context.offsetLeft);
        var uht = parseInt(_currentItem.context.offsetHeight);
        var uwt = parseInt(_currentItem.context.offsetWidth);
        divMargin = 10;
        _lastElement = '';
        if ($(_currentItem).attr('data-below')){
            var curId = $(_currentItem).attr('data-below')
        }
        else {
            var curId = $(_currentItem).attr('data-id');
            _lastElement = $('.' + curId);
        }

        var dragHt = 0;
        $('.item').each(function () {
            if (parseInt(curId) == parseInt($(this).attr('data-below'))){
                dragHt += $(this).outerHeight(true);
                $(this).addClass('moved');
                _lastElement = this;
            }
            else if (parseInt(curId) == parseInt($(this).attr('data-id'))){
                dragHt += $(this).outerHeight(true);
                $(this).addClass('moved');
            }
        }).promise().then(function () {
            $('.moved').prevAll('.item').addClass('moved');
            $('.moved').css({'transform': 'translateX(-5px)'});
            $(_lastElement).nextAll('.item').addClass('moved').css({'transform': 'translateX(+5px)'});
        });
    }
    
    if (p == 'UIleft' || p == 'TVleft'){
        purgeLinesyle();
        $('.moved').css({'transform': 'translateY(0px)'});
        $('.moved').css({'transform': 'translateX(0px)'});
        $('.moved').removeClass('moved');
        $('.drag-line').appendTo($(_currentItem).parent());
        var currRight= $(_currentItem).position().left  -2;
        $('.drag-line').addClass('dragLeft');
        $('.drag-line').css({'left':currRight});
        if (_currentItem.parent())
            var uiTop = parseInt(_currentItem.parent().position().top);
         else 
            var uiTop = 0;
        
        _lastElement = '';
        if ($(_currentItem).attr('data-below'))
            var curId = $(_currentItem).attr('data-below')
        else {
            var curId = $(_currentItem).attr('data-id');
            _lastElement = $('.' + curId);
        }
        var firstEle = $('.' + curId);
        firstEle.prevAll('.item').addClass('moved').css({'transform': 'translateX(-5px)'});
        firstEle.addClass('moved').css({'transform': 'translateX(+5px)'});
        firstEle.nextAll('.item').addClass('moved').css({'transform': 'translateX(+5px)'});
    }
    
    if (p == 'bottom'){
      purgeLinesyle();
        $('.moved').css({'transform': 'translateY(0px)'});
        $('.moved').css({'transform': 'translateX(0px)'});
        $('.moved').removeClass('moved');
        $(_currentItem).closest('.group').addClass('groupHighlight');
        $('.drag-line').appendTo($(_currentItem).parent());
        $('.drag-line').addClass('dragBottom');
        $(_parent).addClass('moved')
        $(_parent).css({'transform': 'translateY(-5px)'});

        $(_parent).prevAll('.group').addClass('moved')
        $(_parent).prevAll('.group').css({'transform': 'translateY(-5px)'});

        $(_parent).nextAll('.group').addClass('moved');
        $(_parent).nextAll('.group').css({'transform': 'translateY(+5px)'});
    }
    
    if (p == 'top'){
        $('.moved').css({'transform': 'translateY(0px)'});
        $('.moved').css({'transform': 'translateX(0px)'});
        $('.moved').removeClass('moved');
        $('.drag-line').appendTo($(_currentItem).parent());
        $(_currentItem).closest('.group').addClass('groupHighlight');
        $('.drag-line').addClass('dragTop');
        $(_parent).addClass('moved')
        $(_parent).css({'transform': 'translateY(+5px)'});

        $(_parent).nextAll('.group').addClass('moved')
        $(_parent).nextAll('.group').css({'transform': 'translateY(+5px)'});

        $(_parent).prevAll('.group').addClass('moved')
        $(_parent).prevAll('.group').css({'transform': 'translateY(-5px)'});
    }
    if (p == 'TVbottom'){
        $('.moved').css({'transform': 'translateX(0px)'});
        $('.drag-line').appendTo($(_currentItem).parent());
        $('.drag-line').addClass('dragBottom');
        $(_parent).nextAll('.group').addClass('moved');
        $(_parent).nextAll('.group').css({'transform': 'translateY(10px)'});
        $('.drag-line').addClass('dragBottom');
    }
    
    if (p == 'TVtop'){
        $('.moved').css({'transform': 'translateX(0px)'});
        $('.drag-line').appendTo($(_currentItem).parent());
        $('.drag-line').addClass('dragBottom');
        $('.drag-line').addClass('dragTop');
        $(_parent).prevAll('.group').addClass('moved')
        $(_parent).prevAll('.group').css({'transform': 'translateY(-10px)'});
    }
    _translateItem = _currentItem;
    _translateStatus = p;
}



$(window).on('resize', function () {
    reArrange();
    refactorGallery();
});

function refactorGallery() {
    var winWd2 = $(window).width();
    var winHt2 = $(window).height();
    $('#gallery').find('.galN').each(function () {
        var datFactor = $(this).attr('data-factor');
        var ht2 = $(this).attr('data-height');
        var wd2 = $(this).attr('data-width');
        var tp2 = $(this).offset().top - $(window).scrollTop();
        var lt2 = $(this).offset().left;
        var htRatio2 = winHt2 / ht2;
        var wdRatio2 = winWd2 / wd2;
        if (htRatio2 > wdRatio2) {
            var fWd2 = wdRatio2 * wd2;
            var fHt2 = wdRatio2 * ht2;
            var offLt2 = (winWd2 - fWd2) / 2;
            var offTp2 = (winHt2 - fHt2) / 2;
            var tranX2 = offLt2 - lt2;
            var tranY2 = offTp2 - tp2;
            $(this).css({'width': fWd2, 'height': fHt2, 'left': offLt2, 'top': offTp2});
        } else {
            var fWd2 = htRatio2 * wd2;
            var fHt2 = htRatio2 * ht2;
            var offLt2 = (winWd2 - fWd2) / 2;
            var offTp2 = (winHt2 - fHt2) / 2;
            $(this).css({'width': fWd2, 'height': fHt2, 'left': offLt2, 'top': offTp2});
        }
    });
}

var lastScrollTop = 0;
$(window).scroll(function (event) {
    var st = $(this).scrollTop();
    if (st > lastScrollTop) {
        $('#header').addClass('fadeOutup');
    } else {
        $('#header').removeClass('fadeOutup');
    }
    lastScrollTop = st;
    check_if_in_view();
});


$(document).mousemove(function (e) {
    if (!$('#drag_follow').hasClass('dn')) {
        var sc = $('body').scrollTop();
        $('#drag_follow').css({
            left: e.pageX + 20,
            top: e.pageY - sc
        });
    }
    var vertical = e.pageY - $(document).scrollTop();
    if (vertical < 100) {
        $('#header , .shadow_head').removeClass('fadeOutup');
    } else {
        $('.shadow_head').addClass('fadeOutup');
    }
});



var ctr_down = false;
var shft_down = false;
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

Array.prototype.min = function (i) {
    return Math.min.apply(null, this);
};

Array.prototype.max = function (i) {
    return Math.max.apply(null, this);
};

function getColor(hex){
    hex = hex.replace('#', '');
    R = parseInt(hex.substring(0, 2), 16);
    G = parseInt(hex.substring(2, 4), 16);
    B = parseInt(hex.substring(4, 6), 16);
    var computedVl = (((0.299 * R) + ((0.587 * G) + (0.114 * B))) / 255);
    return computedVl > 0.5 ? '#333333' : '#ffffff';
}

function removeLoader(){
    $('#pageLoader').addClass('fadeout ');
    completedPageload();
}

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e){
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();

    e.returnValue = false;
}

function preventDefaultForScrollKeys(e){
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll(){
    if (window.addEventListener)
        window.addEventListener('DOMMouseScroll', preventDefault, false);

    window.onwheel = preventDefault;
    window.onmousewheel = document.onmousewheel = preventDefault;
    window.ontouchmove = preventDefault;
    document.onkeydown = preventDefaultForScrollKeys;
}


function enableScroll(){
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);

    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}

function publish(){
    var isOnline = common.run();
    if(!isOnline){
        common.msg(0,'Internet connection lost. Please try again.');
        return;
    }
    var tReqFlag = $('#coverInfo').hasClass('ng-hide');
    if (!tReqFlag)
    {
        var stTitle = $('#storyMtitle').val().trim();
        if (stTitle == "")
        {
            common.msg(0, 'Please enter title of your story');
            hideSavebox();
            return false;
        }
    }

    var submitFlag=true;
    if(submitFlag){
        var userid = common.readFromStorage("userIID");
        var storyObj = {};
        var purl = NODOMAIN + 'publishStory/'+storyID+common.generatesalt()+'/1/'+common.getid();

        $.ajax({
        url: purl,
        headers: {'x-access-token': sessionStorage.browser, 'x-oo': sessionStorage.bex, 'X-Key': sessionStorage.xkey,'H-Key':common.gid()},
        type:'POST',
        data:JSON.stringify(storyObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (res) {
            if (res.error['errorCode'] == 0)
            {
                common.msg(1, 'Story Published successfully');

                if (neighHoodId !== '' && neighStoryType == '1')
                {
                    var url = DOMAIN + 'index.php?action=addNeighbourhood&hoodId=' + neighHoodId + '&userid=' + userid + '';
                } else
                {
                    var url = DOMAIN + 'index.php?action=storyAdd1&storyid=' + storyID + '&userid=' + userid + '';
                }

                window.location.href = url;
            }

        }
        , error: function (err) {
            if (err)
                common.msg(0, 'Error in publishing story, please try again');

        }

    });
    }else{
        common.msg(0, 'Error in publishing story, please try again');
    }

}

function bnGallery(){
    var $allImageitems = $('.forImg');
    var $allTextitems = $('.forTxt');
    var $allViditems = $('.forVideo');
    var $allGriditems = $('#grid').find('.item');
    var $allGridvideos = $('#grid').find('.video');

    $($allImageitems).click(function () {
        if ($('#grid').hasClass('editModeOff'))
        {
            var dtimg = $(this).attr('data-img');
            var acImg = $(this).attr('act-image');
            if (dtimg != undefined && dtimg != "undefined" && dtimg != null && dtimg != "null" && typeof dtimg != "undefined" && dtimg !== "")
            {

                $('#galClblk').removeClass('dn');
                $('#grid .item').addClass('pointNone');
                var dataId = $(this).attr('data-id');
                $('.galleryHD').removeClass('dn');
                dtimg = dtimg.replace('/upload/', '/upload/w_1920,h_1080,c_fit,dpr_1.0,q_auto:best/');
                $('#zoomOut').css({'background': 'url(' + dtimg + ')no-repeat', 'background-size': 'cover', 'background-position': 'center'});
                $(this).addClass('galCenter');
                $('#zoom').empty();
                $(this).clone().appendTo('#zoom');

                var ht = $(this).outerHeight(true);
                var wd = $(this).outerWidth(true);
                var tp = $(this).offset().top - $(window).scrollTop();
                var lt = $(this).offset().left;
                var winWd = $(window).width();
                var winHt = $(window).height();
                var htRatio = winHt / ht;
                var wdRatio = winWd / wd;
                if (htRatio > wdRatio)
                {
                    var fWd = wdRatio * wd;
                    var fHt = wdRatio * ht;
                    var offLt = (winWd - fWd) / 2;
                    var offTp = (winHt - fHt) / 2;
                    var tranX = offLt - lt;
                    var tranY = offTp - tp;

                    $('#zoom').addClass('isanimating').css({'width': wd, 'height': ht, 'left': lt, 'top': tp})
                            .velocity('stop').velocity({width: [fWd, wd], height: [fHt, ht], translateX: [tranX, 0], translateY: [tranY, 0]}, {duration: 400, easing: [0.275, 0.885, 0.2, 1], display: 'block', complete: function () {
                            var actualImage = new Image();
                            dtimg = dtimg.replace(pattern, '');
                            actualImage.src = dtimg.replace(/"/g, "").replace(/url\(|\)$/ig, "");
                            actualImage.onload = function () {

                                $('.galItem .' + dataId).css({'background-image': 'url(' + dtimg + ')'});
                                $('#gallery').find('.'+dataId).addClass('gsLoaded');
                                $('.galleryHD').addClass('hdLoaded');
                            }
                        }}).removeClass('isanimating');
                } else
                {
                    var fWd = htRatio * wd;
                    var fHt = htRatio * ht;
                    var offLt = (winWd - fWd) / 2;
                    var offTp = (winHt - fHt) / 2;
                    var tranX = offLt - lt;
                    var tranY = offTp - tp;
                    $('#zoom').addClass('isanimating').css({'width': wd, 'height': ht, 'left': lt, 'top': tp})
                            .velocity('stop').velocity({width: [fWd, wd], height: [fHt, ht], translateX: [tranX, 0], translateY: [tranY, 0]}, {duration: 400, easing: [0.275, 0.885, 0.2, 1], display: 'block', complete: function () {
                            var actualImage = new Image();
                            dtimg = dtimg.replace(pattern, '');
                            actualImage.src = dtimg.replace(/"/g, "").replace(/url\(|\)$/ig, "");
                            actualImage.onload = function () {

                                $('.galItem .' + dataId).css({'background-image': 'url(' + dtimg + ')'});
                                $('#gallery').find('.'+dataId).addClass('gsLoaded');
                                $('.galleryHD').addClass('hdLoaded');
                            }
                        }}).removeClass('isanimating');
                }
                showGallery();
            }
        }

    });


    $($allViditems).click(function () {
        if ($('#grid').hasClass('editModeOff')) {
            $('#galClblk').removeClass('dn');
            var source = $(this).find('source').attr('src');
            $(this).addClass('galCenter');

            var ht = $(this).height();
            var wd = $(this).width();
            var tp = $(this).offset().top - $(window).scrollTop();
            var lt = $(this).offset().left;
            var winWd = $(window).width();
            var winHt = $(window).height();
            var htRatio = winHt / ht;
            var wdRatio = winWd / wd;
            if (htRatio > wdRatio)
            {
                var fWd = wdRatio * wd;
                var fHt = wdRatio * ht;
                var offLt = (winWd - fWd) / 2;
                var offTp = (winHt - fHt) / 2;
                var tranX = offLt - lt;
                var tranY = offTp - tp;
                $('#zoomV').css({'width': wd, 'height': ht, 'left': lt, 'top': tp})
                        .velocity('stop').velocity({width: [fWd, wd], height: [fHt, ht], translateX: [tranX, 0], translateY: [tranY, 0]}, {duration: 400, easing: [0.275, 0.885, 0.2, 1]}).velocity({opacity: [0, 1]}, {duration: 600, easing: [0.275, 0.885, 0.2, 1], display: 'block', complete: function () {
                        $('#zoomV').css({'display': 'none', 'opacity': '1'});
                    }});

            } else
            {
                var fWd = htRatio * wd;
                var fHt = htRatio * ht;
                var offLt = (winWd - fWd) / 2;
                var offTp = (winHt - fHt) / 2;
                var tranX = offLt - lt;
                var tranY = offTp - tp;
                $('#zoomV').css({'width': wd, 'height': ht, 'left': lt, 'top': tp, 'display': 'block'})
                        .velocity('stop').velocity({width: [fWd, wd], height: [fHt, ht], translateX: [tranX, 0], translateY: [tranY, 0]}, {duration: 400, easing: [0.275, 0.885, 0.2, 1]}).velocity({opacity: [0, 1]}, {duration: 600, easing: [0.275, 0.885, 0.2, 1], display: 'block', complete: function () {
                        $('#zoomV').css({'display': 'none', 'opacity': '1'});
                    }});
            }
            showGallery();
        }
    });

    $($allTextitems).click(function () {
        if ($('#grid').hasClass('editModeOff'))
        {
            $('#galClblk').removeClass('dn');
            $('#grid .item').addClass('pointNone');
            setTimeout(function () {
                $('#grid .item').removeClass('pointNone');
            }, 600);

            $(this).addClass('galCenter');
            showGallery();
        }
    });

    bindLazyscroller();

    function showGallery(){
        $('#gallery').addClass('galleryOpen');
        $($allGriditems).each(function (i) {
            if ($(this).hasClass('galCenter')) {
                gc = i + 1;
                var tr = gc * (-100);
                $('#imGen').velocity({translateX: [tr + '%']}, {duration: 0});
                $('#imGen').attr('galleryPos', gc);
                if ($('#imGen').find('.galN ').eq(gc).hasClass('forVideo')) {
                    setTimeout(function () {
                        $('#imGen').find('.galN ').eq(gc).find('.video').get(0).play();
                    }, 100);
                    $('.galVontrol').removeClass('noVid ');
                    $('.gallery_play').removeClass('mutedTog');
                    $('.gallery_play2').removeClass('pauseTog');
                } else {
                    $('.galVontrol').addClass('noVid ');
                    $('.gallery_play').addClass('mutedTog');
                    $('.gallery_play2').addClass('pauseTog');
                }

            }
        });

        $('#gallery').velocity('stop').velocity({opacity: [1, 0]}, {duration: 600, easing: [0.275, 0.885, 0.2, 1], display: 'block', complete: function () {
                $('.galItem').css({'display': 'inline-block'});
                $('#zoom').css({'display': 'none'});

                $('.gallery_control').velocity({opacity: [1, 0], translateY: [0, 20]}, {duration: 600, easing: [0.275, 0.885, 0.2, 1], complete: function () {
                        $('#galClblk').addClass('dn');
                    }});

            }
        });

        $($allGridvideos).each(function (i) {
            $(this).get(0).pause();
        });
    }


    function bindLazyscroller() {
        $groups_all = $('.group');
    }

    function gallery_close() {
        $('#galClblk').removeClass('dn');
        $('#gallery').removeClass('galleryOpen');
        var th = "";
        var omoff = 0;
        var icVid = false;
        var winHt = $(window).height();
        $('.gallery_forward , .gallery_back ').removeClass('galFaded');
        $('.galleryHD').removeClass('hdLoaded');
        $('.galleryHD').addClass('dn');
        var pos = $('#imGen').attr('galleryPos');
        var idg = $('#galItem' + pos).find('.galN').attr('data-id');
        if (pos == 0)
        {
            $("#cScroll").animate({scrollTop: 0}, 0);
            $('.gallery_back').removeClass('galFaded');
        } else
        {
            var yet_offset = 0;
            var $currentGridItem = $('#grid').find('.' + idg);
            icVid = $currentGridItem.hasClass('forVideo');
            omoff = $currentGridItem.offset().top;
            var htB = $currentGridItem.height();
            var wdB = $currentGridItem.width();
            yet_offset = htB - winHt;
            var mainoffset = $currentGridItem.offset().top + $currentGridItem.height() - $(window).height();
            $("#cScroll").animate({scrollTop: mainoffset + 25}, 0);

            if (!icVid)
            {
                var scHt = $currentGridItem.height();
                var imm = $currentGridItem.attr('data-img');
                var htB = $currentGridItem.outerHeight(true);
                var wdB = $currentGridItem.outerWidth(true);
                var oHt = $('.galItem').eq(pos).find('.galN').outerHeight(true);
                var oWd = $('.galItem').eq(pos).find('.galN').outerWidth(true);
                var tpO = $('.galItem').eq(pos).find('.galN').offset().top;
                var ltO = $('.galItem').eq(pos).find('.galN').offset().left;
                var ratX = htB / oHt;
                var ratY = wdB / oWd;
                var tpB = $currentGridItem.offset().top;
                var ltB = $currentGridItem.offset().left;

                var scaleCh = (1 - ratY) * oHt;
                var tranY = -(scaleCh);
                var tranX = (ltO - ltB);

                $('#zoomOut').css({'width': oWd, 'height': oHt, 'left': ltB, 'bottom': '0px', 'top': 'initial', 'transform': 'translateY(' + tpO + 'px) translateX(' + tranX + 'px)', 'display': 'block'})
                        .velocity({scaleX: [ratX, 1], scaleY: [ratY, 1], translateX: [0, tranX], translateY: [0], opacity: [0, 1]}, {duration: 500, delay: 200, easing: [0.275, 0.885, 0.2, 1], display: 'block'});
            }
        }

        $('#gallery').velocity('stop').velocity({opacity: [0, 1]}, {duration: 600, easing: [0.275, 0.885, 0.2, 1], delay: 200, display: 'none', complete: function () {
                $('#galClblk').addClass('dn');
                $('.galItem').css({'display': 'none'});
                $('#grid .item').removeClass('pointNone');
                $('#zoomOut').css({'display': 'none', 'left': '', 'top': '', 'transform': 'scale(1)', width: '', height: ''});
                $('.gallery_control').velocity({opacity: [0], translateY: [20]}, {duration: 0, complete: function () {}});
                $('.item').removeClass('galCenter');
                $('#imGen').find('.forVideo').each(function (i) {
                    var th = $(this);
                    $(this).find('.video').get(0).pause();
                    $(th).find('.video').prop({'muted': true});
                });
                checkVidinview();
            }
        });
    }

    $('#gallery_close').click(function () {
        gallery_close();
    });
    
    var hasActive = false;
    $(document).keyup(function (event) {
        if (event.keyCode == 46) {
            $('#grid').find('.item').each(function () {
                if ($(this).hasClass('activate')) {
                    if (!$(this).hasClass('forTxt')) {
                        hasActive = true;
                    } else {
                        hasActive = false;
                    }
                }
            });
            if (hasActive) {
                showDelete();
            }
        } else if (event.keyCode == 27) {
            if ($('#gallery').hasClass('galleryOpen')) {
                gallery_close();
            }
        } else if (event.keyCode == 37) {
            if ($('#gallery').hasClass('galleryOpen')) {
                galleryBack();
            }
        } else if (event.keyCode == 39) {
            if ($('#gallery').hasClass('galleryOpen')) {
                galleryForward();

            }
        }
    });

}

function coverRatio(){
    var str2 = '';
    str2 += '<div class="galItem"  id="galItem0"></div>';
    $('#imGen').prepend(str2);
    $('#cover').clone().attr('id', 'galcover').addClass('forImg galN').appendTo('#galItem0');
    $('#coverInfo').clone().appendTo('#galcover');
}

function createGallery(){
    $('#imGen').empty();
    coverRatio();
    var winWd2 = $(window).width();
    var winHt2 = $(window).height();
    $('#grid').find('.item').each(function (i) {
        i = i + 1;
        str = '';
        str += '<div class="galItem"  id="galItem' + i + '"></div>';
        $('#imGen').append(str);
        var datFactor = $(this).attr('data-factor');
        var ht2 = $(this).attr('data-height');
        var wd2 = $(this).attr('data-width');
        if (datFactor != undefined && datFactor != "undefined" && datFactor != null && datFactor != "null" && typeof datFactor != "undefined" && isNaN(datFactor) == false && datFactor !== "") {
            wd2 = ht2 * datFactor;
        }

        var htRatio2 = winHt2 / ht2;
        var wdRatio2 = winWd2 / wd2;
        if (htRatio2 > wdRatio2) {
            var fWd2 = wdRatio2 * wd2;
            var fHt2 = wdRatio2 * ht2;
            var offLt2 = (winWd2 - fWd2) / 2;
            var offTp2 = (winHt2 - fHt2) / 2;
            $(this).clone().removeClass('item').addClass('galN').css({'width': fWd2, 'height': fHt2, 'left': offLt2, 'top': offTp2}).appendTo('#galItem' + i);
        } else {
            var fWd2 = htRatio2 * wd2;
            var fHt2 = htRatio2 * ht2;
            var offLt2 = (winWd2 - fWd2) / 2;
            var offTp2 = (winHt2 - fHt2) / 2;
            $(this).clone().removeClass('item').addClass('galN').css({'width': fWd2, 'height': fHt2, 'left': offLt2, 'top': offTp2}).appendTo('#galItem' + i);
        }
    });
    $('#imGen').find('.forTxt').each(function () {
        var col = $(this).css('background-color');
        $(this).closest('.galItem').css('background-color', col);
    });
    bnGallery();
}



function galleryBack(){
    $('#zoomOut').css({'background': 'transparent', 'background-size': 'cover', 'background-position': 'center'});
    var imgNo = $('#imGen').find('.galN').length;
    var pos = $('#imGen').attr('galleryPos');
    if (pos > 0) {
        pos--;
        $('#gallery_back').addClass('dn');
        $('.gallery_forward').removeClass('galFaded');
        $('#imGen').find('.galN').each(function () {
            if ($(this).hasClass('forVideo')) {
                if ($(this).find('.video').readyState == 4) {
                    $(this).find('.video').get(0).pause();
                    $(this).find('.video').prop({'muted': true});
                }

                $('.gallery_play').removeClass('mutedTog');
                $('.gallery_play2').removeClass('pauseTog');

            }
        });
        var tr = pos * (-100);
        $('#zoom').css({'display': 'none'});

        $('#imGen').velocity({translateX: [tr + '%']}, {duration: 300, easing: 'swing', complete: function () {

                $('#gallery_back').removeClass('dn');
                $('#imGen').attr('galleryPos', pos);

                if ($('#imGen').find('.galItem').eq(pos).find('.galN').hasClass('forVideo')) {
                    $('#imGen').find('.galItem ').eq(pos).find('.video').get(0).play();

                    $('.galleryHD').addClass('dn');
                    $('.galVontrol').removeClass('noVid');
                    $('.gallery_play').removeClass(' mutedTog');
                    $('.gallery_play2').removeClass('pauseTog');
                } else if ($('#imGen').find('.galItem').eq(pos).find('.galN').hasClass('forImg')) {
                    $('.galleryHD').removeClass('dn');
                    if (!$('#imGen').find('.galItem').eq(pos).hasClass('gsLoaded')) {
                        $('.galleryHD').removeClass('hdLoaded');
                    } else {
                        $('.galleryHD').addClass('hdLoaded');
                    }
                    var dtimg = '';
                    var dtimg1 = '';
                    var dtimg2 = '';
                    $('.galVontrol').addClass('noVid');
                    $('.gallery_play').addClass(' mutedTog');
                    $('.gallery_play2').addClass('pauseTog');
                    if ($('#imGen').find('.galItem').eq(pos).find('.galN').length)
                    {
                        var dataId = $('#imGen').find('.galItem').eq(pos).find('.galN').attr('data-id');
                        dtimg = $('#imGen').find('#galItem' + pos).find('.galN').attr('data-img');
                        var acImg = $('#imGen').find('#galItem' + pos).find('.galN').attr('act-image');
                        dtimg = dtimg.replace('/upload/', '/upload/w_1920,h_1080,c_fit,dpr_1.0,q_auto:best/');
                        $('#zoomOut').css({'background': 'url(' + dtimg + ')no-repeat', 'background-size': 'cover', 'background-position': 'center'});
                        if (pos > 1) {

                            dtimg1 = $('#imGen').find('.galItem').eq(pos - 1).find('.galN').attr('data-img');
                            dtimg1 = dtimg1.replace('/upload/', '/upload/w_1920,h_1080,c_fit,dpr_1.0,q_auto:best/');
                        }
                        if (pos > 2) {
                            dtimg2 = dtimg2.replace('/upload/', '/upload/w_1920,h_1080,c_fit,dpr_1.0,q_auto:best/');
                            dtimg2 = $('#imGen').find('.galItem').eq(pos - 2).find('.galN').attr('data-img');
                        }
                    }
                    var flegs1 = $('#imGen').find('.galItem').eq(pos).hasClass('gsLoaded');
                    if (dtimg && !flegs1)
                    {
                        if(dtimg.indexOf('https')!=-1)
                        {
                            var actualImage = new Image();
                            dtimg = dtimg.replace(pattern, '');
                            actualImage.src = dtimg.replace(/"/g, "").replace(/url\(|\)$/ig, "");
                            actualImage.onload = function () {
                                $('#imGen').find('.galItem').eq(pos).find('.galN').css({'background-image': 'url(' + dtimg + ')'});
                                var daClass = $('#imGen').find('.galItem').eq(pos).find('.galN').attr('data-id');
                                var str = '<div class="dummyImg transition300 " style="background-image: url(' + dtimg + ') ; background-repeat: no-repeat ; background-position : center ; background-size: cover">';
                                $('#grid').find('.' + daClass).empty().append(str).addClass('in-view  iloaded');

                                $('.galleryHD').addClass('hdLoaded');
                            }
                        }
                    }
                    var flegs2 = $('#imGen').find('.galItem').eq(pos - 1).hasClass('gsLoaded');
                    if (pos > 1 && dtimg1 && !flegs2) {
                        if(dtimg1.indexOf('https')!=-1)
                        {
                            var actualImage1 = new Image();
                            actualImage1.src = dtimg1.replace(/"/g, "").replace(/url\(|\)$/ig, "");
                            actualImage1.onload = function () {
                                $('#imGen').find('.galItem').eq(pos - 1).addClass('gsLoaded');
                                $('#imGen').find('.galItem').eq(pos - 1).find('.galN').css({'background-image': 'url(' + dtimg1 + ')'});
                                var daClass1 = $('#imGen').find('.galItem').eq(pos - 1).find('.galN').attr('data-id');
                                var str1 = '<div class="dummyImg transition300 " style="background-image: url(' + dtimg1 + ') ; background-repeat: no-repeat ; background-position : center ; background-size: cover">';
                                $('#grid').find('.' + daClass1).empty().append(str1).addClass('in-view  iloaded');

                            }
                        }
                    }
                    var flegs3 = $('#imGen').find('.galItem').eq(pos - 2).hasClass('gsLoaded');
                    if (pos > 2 && dtimg2 && !flegs3) {
                        if(dtimg2.indexOf('https')!=-1)
                        {
                            var actualImage2 = new Image();
                            actualImage2.src = dtimg2.replace(/"/g, "").replace(/url\(|\)$/ig, "");
                            actualImage2.onload = function () {
                                $('#imGen').find('.galItem').eq(pos - 2).addClass('gsLoaded');
                                $('#imGen').find('.galItem').eq(pos - 2).find('.galN').css({'background-image': 'url(' + dtimg2 + ')'});
                                var daClass2 = $('#imGen').find('.galItem').eq(pos - 2).find('.galN').attr('data-id');
                                var str2 = '<div class="dummyImg transition300 " style="background-image: url(' + dtimg2 + ') ; background-repeat: no-repeat ; background-position : center ; background-size: cover">';
                                $('#grid').find('.' + daClass2).empty().append(str2).addClass('in-view  iloaded');
                            }
                        }
                    }

                } else {
                    $('.galVontrol').addClass('noVid');
                    $('.gallery_play').addClass(' mutedTog');
                    $('.gallery_play2').addClass('pauseTog');

                    $('.galleryHD').addClass('dn');
                }

                if (pos == 0) {
                    $('.gallery_back').addClass('galFaded');

                }
            }});
    }

}

function galleryForward(){
    $('#zoomOut').css({'background': 'transparent', 'background-size': 'cover', 'background-position': 'center'});
    var imgNo = $('#imGen').find('.galN').length;
    var pos = $('#imGen').attr('galleryPos');
    if (pos < imgNo - 1) {
        pos++;
        $('#gallery_forward').addClass('dn');
        if ((imgNo - pos - 1) == 0)
        {
            $('.gallery_forward').addClass('galFaded');
        }
        $('.gallery_back').removeClass('galFaded');
        var tr = pos * (-100);
        $('#zoom').css({'display': 'none'});
        $('#imGen').velocity({translateX: [tr + '%']}, {duration: 300, easing: 'swing', complete: function () {
            $('#gallery_forward').removeClass('dn');
            $('#imGen').attr('galleryPos', pos);
            $('#imGen').find('.galN').each(function () {
                if ($(this).hasClass('forVideo')) {
                    $(this).find('.video').get(0).pause();
                    $('.gallery_play').removeClass('mutedTog');
                    $('.gallery_play2').removeClass('pauseTog');
                    $(this).find('.video').prop({'muted': true});
                }
            });

            if ($('#imGen').find('.galItem ').eq(pos).find('.galN').hasClass('forVideo')) {
                $('#imGen').find('.galItem ').eq(pos).find('.video').get(0).play();
                $('.galleryHD').removeClass('hdLoaded').addClass('dn');
                $('.galVontrol').removeClass('noVid');
                $('.gallery_play').removeClass('mutedTog');
                $('.gallery_play2').removeClass('pauseTog');
            } 
            else if ($('#imGen').find('.galItem').eq(pos).find('.galN').hasClass('forImg')) {
                $('.galleryHD').removeClass('dn');
                if (!$('#imGen').find('.galItem').eq(pos).hasClass('gsLoaded')) {
                    $('.galleryHD').removeClass('hdLoaded');
                } else {
                    $('.galleryHD').addClass('hdLoaded');
                }
                var dtimg = '';
                var dtimg1 = '';
                var dtimg2 = '';

                $('.galVontrol').addClass('noVid');
                $('.gallery_play').addClass('mutedTog');
                $('.gallery_play2').addClass('pauseTog');
                if ($('#imGen').find('.galItem').eq(pos).find('.galN').length)
                {
                    var dataId = $('#imGen').find('.galItem').eq(pos).find('.galN').attr('data-id');
                    dtimg = dtimg.replace('/upload/', '/upload/w_1920,h_1080,c_fit,dpr_1.0,q_auto:best/');
                    dtimg = $('#imGen').find('#galItem' + pos).find('.galN').attr('data-img');

                    if (dtimg.indexOf('https') != -1)
                        $('#zoomOut').css({'background': 'url(' + dtimg + ')no-repeat', 'background-size': 'cover', 'background-position': 'center'});
                    if (pos < imgNo - 2) {
                        if (dtimg.indexOf('https') != -1)
                        {
                            dtimg1 = $('#imGen').find('.galItem').eq(pos + 1).find('.galN').attr('data-img');
                            dtimg1 = dtimg1.replace('/upload/', '/upload/w_1920,h_1080,c_fit,dpr_1.0,q_auto:best/');
                        }
                    }
                    if (pos < imgNo - 3) {
                        dtimg2 = $('#imGen').find('.galItem').eq(pos + 2).find('.galN').attr('data-img');
                        dtimg2 = dtimg2.replace('/upload/', '/upload/w_1920,h_1080,c_fit,dpr_1.0,q_auto:best/');
                    }
                }
                var flegs1 = $('#imGen').find('.galItem').eq(pos).hasClass('gsLoaded');
                if (dtimg && !flegs1)
                {
                    var actualImage = new Image();
                    dtimg = dtimg.replace(pattern, '');
                    actualImage.src = dtimg.replace(/"/g, "").replace(/url\(|\)$/ig, "");
                    actualImage.onload = function () {
                        $('#imGen').find('.galItem').eq(pos).find('.galN').css({'background-image': 'url(' + dtimg + ')'});
                        $('#imGen').find('.galItem').eq(pos).addClass('gsLoaded');
                        $('.galleryHD').addClass('hdLoaded');
                        var daClass = $('#imGen').find('.galItem').eq(pos).find('.galN').attr('data-id');
                        var str = '<div class="dummyImg transition300 " style="background-image: url(' + dtimg + ') ; background-repeat: no-repeat ; background-position : center ; background-size: cover">';
                        $('#grid').find('.' + daClass).empty().append(str).addClass('in-view  iloaded');
                    }
                }
                var flegs2 = $('#imGen').find('.galItem').eq(pos + 1).hasClass('gsLoaded');


                if (pos < imgNo - 2 && dtimg1 && !flegs2) {
                    if (dtimg1.indexOf('https') != -1)
                    {
                        var actualImage1 = new Image();
                        actualImage1.src = dtimg1.replace(/"/g, "").replace(/url\(|\)$/ig, "");
                        actualImage1.onload = function () {
                            $('#imGen').find('.galItem').eq(pos + 1).find('.galN').css({'background-image': 'url(' + dtimg1 + ')'});
                            $('#imGen').find('.galItem').eq(pos + 1).addClass('gsLoaded');
                            var daClass1 = $('#imGen').find('.galItem').eq(pos + 1).find('.galN').attr('data-id');
                            var str1 = '<div class="dummyImg transition300 " style="background-image: url(' + dtimg1 + ') ; background-repeat: no-repeat ; background-position : center ; background-size: cover">';
                            $('#grid').find('.' + daClass1).empty().append(str1).addClass('in-view  iloaded');
                        }
                    }
                }

                var flegs3 = $('#imGen').find('.galItem').eq(pos + 2).hasClass('gsLoaded');
                if (pos < imgNo - 3 && dtimg2 && !flegs3) {
                    if (dtimg2.indexOf('https') != -1)
                    {
                        var actualImage2 = new Image();
                        actualImage2.src = dtimg2.replace(/"/g, "").replace(/url\(|\)$/ig, "");
                        actualImage2.onload = function () {
                            $('#imGen').find('.galItem').eq(pos + 2).find('.galN').css({'background-image': 'url(' + dtimg2 + ')'});
                            $('#imGen').find('.galItem').eq(pos + 2).addClass('gsLoaded');
                            var daClass2 = $('#imGen').find('.galItem').eq(pos + 2).find('.galN').attr('data-id');
                            var str2 = '<div class="dummyImg transition300 " style="background-image: url(' + dtimg2 + ') ; background-repeat: no-repeat ; background-position : center ; background-size: cover">';
                            $('#grid').find('.' + daClass2).empty().append(str2).addClass('in-view  iloaded');
                        }
                    }
                }

            } 
            else {
                    $('.galVontrol').addClass('noVid');
                    $('.gallery_play').addClass(' mutedTog');
                    $('.gallery_play2').addClass('pauseTog');
                    $('.galleryHD').removeClass('hdLoaded').addClass('dn');
                }
        }});
    }

}


var acImage = '';
var $window = $(window);
$window.trigger('scroll');
function check_if_in_view() {
  if(!storyLoaded){
    var window_height = $window.height();
    var winoffset = window_height * 1.5;
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($($groups_all), function () {
        $(this).find('.forImg ').each(function () {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);
            if ((element_bottom_position >= window_top_position) &&
                    (element_top_position - winoffset <= window_bottom_position + winoffset)) {
                $element.addClass('in-view');
            } else {
            }
        });

    });
    lazyLoadImages();
  }
}

function lazyLoadImages() {
    $('.in-view').each(function () {
        var th = $(this);
        acImage = $(this).attr('data-img');
        if (acImage) {
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
    checksload();
}

function checksload() {
    $('.iloaded').each(function () {
        var th = $(this);
        var actualImage = new Image();
        var da_class = $(this).attr('data-id');
        if ($(this).attr('act-image')) {
            actualImage.src = $(this).attr('act-image');
            try {
                actualImage.onload = function () {
                    th.find('.dummyImg').removeClass('nfadeIn');
                    if(!$('#gallery').find('.' + da_class).parent().hasClass('gsLoaded') && !$('#gallery').hasClass('galleryOpen')){
                        $('#gallery').find('.' + da_class).css({
                            'background-image': 'url(' + actualImage.src + ')',
                            'background-repeat': ' no-repeat',
                            'background-size': 'cover',
                            'background-position': 'center'
                        });
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }

    });
}

function seqloadImg(jdx) {
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
        } else {
            seqloadImg(jdx + 1);
        }
    }
    checkgroupload($('.group').eq(jdx), jdx + 1);
}

function checkgroupload($currentGroup, nextgroup) {
    var limitload = $currentGroup.find('.iloaded').length;
    var limitcounter = 0;
    $currentGroup.find('.iloaded').each(function () {
        var th = $(this);
        var actualImage = new Image();
        var da_class = $(this).attr('data-id');
        if ($(this).attr('act-image')) {
            actualImage.src = $(this).attr('act-image');
            try {
                actualImage.onload = function () {
                    th.find('.dummyImg').removeClass('nfadeIn');
                    if(!$('#gallery').find('.' + da_class).parent().hasClass('gsLoaded'))
                    {
                      $('#gallery').find('.' + da_class).css({
                          'background-image': 'url(' + actualImage.src + ')',
                          'background-repeat': ' no-repeat',
                          'background-size': 'cover',
                          'background-position': 'center'
                      });
                    }
                    limitcounter++;
                    if (limitload == limitcounter) {
                        seqloadImg(nextgroup);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
    });
}


function isloadedImage(src,t,w,h,mediaLen){
    if($(window).width()>1024 && !$('.editBtnStory').hasClass('dn') ){
        BackgroundLoader(src,t,1,w,h,mediaLen);
    }
}

function BackgroundLoader(url,t,seconds,w,h,mediaLen) {
    ttl=mediaLen;
    if(t=="video"){
        var vd =common.generateId();
        var extn = url.split('.');
        extn.pop();
        var pathwoextn = extn.join('.');
        var str ="<video id='myVideo_"+vd+"' width='"+w+"' height='"+h+"' class='dm'  autoplay muted playsinline onplay='vdCheck(this)'>";
        str += '<source src="' + pathwoextn + '.mp4" type="video/mp4"/>';
        str += '<source src="' + pathwoextn + '.webm" type="video/webm"/>';
        str += '<source src="' + pathwoextn + '.ogv" type="video/ogg"/>';
        str += '</video>';
        $(str).appendTo('body');
    }
    else{
        $('<img class="dm" src="'+ url +'">').load(function() {
            $(this).appendTo('body');
            l++;
            $('.item[act-image="'+url+'"]').find('.nfadeIn').removeClass('nfadeIn');
            if(ttl==l){
                $('#publishStory,#unpublishStory,#saveStory,#saveStory2').removeClass('disabled3');
                var app = $('#contHt');
                angular.element(app).scope().setFlag(true);
                $('.dm').remove();
                if($('#saveStory').length==0){
                    $('#publishStory').removeClass('ng-hide');
                }
            }
        });
    }
}



function vdCheck(obj){
    vid = $(obj).attr('id');
    l++;
    $('#'+vid).get(0).pause();
    if(ttl==l){
        storyLoaded= true;
        $('#publishStory,#unpublishStory,#saveStory,#saveStory2').removeClass('disabled3');
        var app = $('#contHt');
        angular.element(app).scope().setFlag(true);
        $('.dm').remove();
        if($('#saveStory').length==0){
            $('#publishStory').removeClass('ng-hide');
        }
    }
}


function submitJson(t){
    reArrange();
    var dt = [];
    var done = 0;
    var tto = 1;
    var retval = false;
    var svData = [];
    var groupLen = $('.group').length;
    var colorArr = [];

    colorArr.push($('#cover').attr('data-color'));

    if ($('.group').length == 0){
        if(t==0){
            var app = $('#contHt');
            angular.element(app).scope().saveTags();
            publish();
        }
        else if(t==1){
            var app = $('#contHt');
            angular.element(app).scope().saveTags();
            saveStory();
        }
    }
    $('.group').each(function () {
        if (!$(this).find('.item').length) {
            if ($('.group').length == 1){
                var storyObj = {};
                storyObj.storyJson = '';

                if (tto == groupLen) {
                    $.ajax({
                        url: NODOMAIN + 'addStoryJson/'+storyID+common.generatesalt()+'/'+common.getid(),
                        headers: {'x-access-token': sessionStorage.browser, 'x-oo': sessionStorage.bex, 'X-Key': sessionStorage.xkey},
                        type: "POST",
                        data: storyObj,
                        async: true,
                        success: function (response) {
                            $(this).remove();
                            return false;
                        }
                    }).done(function(result){
                        if(t==0){
                            var app = $('#contHt');
                            angular.element(app).scope().saveTags();
                            publish();
                        }
                        else if(t==1){
                            var app = $('#contHt');
                            angular.element(app).scope().saveTags();
                            saveStory();
                        }
                      });
                }
            }
            $(this).remove();
            reArrange();
            return false;
        }
        else {
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

                    if($(vl.obj).attr('data-img')!=="")
                        itemArr.push(itemData);
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

                var storyObj = {};
                storyObj.storyJson = JSON.stringify(svData);
                if (tto == groupLen)
                {
                    $.ajax({
                        url: NODOMAIN + 'addStoryJson/'+storyid+common.generatesalt()+'/'+common.getid(),
                        headers: {'x-access-token': sessionStorage.browser, 'x-oo': sessionStorage.bex, 'X-Key': sessionStorage.xkey,'H-Key':common.gid()},
                        type: "POST",
                        data: storyObj,
                        async: true,
                        success: function (response) {

                        }
                    }).done(function(result){
                        if(t==0){
                            var app = $('#contHt');
                            angular.element(app).scope().saveTags();
                            publish();
                        }
                        else if(t==1){
                            var app = $('#contHt');
                            angular.element(app).scope().saveTags();
                            saveStory();
                        }


                      });
                }
            }
        }

        tto++;
    });

}

$(document).mouseup(function (e){
    var container = $(".stryHomeIcon ");
    if (!container.is(e.target) && container.has(e.target).length === 0 && $('#stHomelist').hasClass('storylistopenF')){
      $('#stHomelist').removeClass('storylistopenF');
      $('#stHomelist').velocity({opacity:[0,1] , translateY:[20,0]} , {duration:300 , easing:[0.275, 0.885, 0.2, 1] , display:'none' });
    }
});