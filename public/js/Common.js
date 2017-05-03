var common = new Common();
function Common() {
    var _this = this;
    var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea, input[type=radio]';

    var $toastlast = '';
    this.msg = function(t, e) {


        if ($toastlast !== '')
            toastr.clear();

        if (t == 0)
            t = 'danger';

        if (t == 2)
            t = 'info';

        if (t == 1)
            t = 'success';

        if (t == 3)
            t = 'warning';

        $("danger" === t ? function() {
            toastr.error(e)
        } : "info" === t ? function() {
            toastr.info(e)
        } : "success" === t ? function() {
            toastr.success(e)
        } : "warning" === t ? function() {
            toastr.warning(e)
        } : function() {

        });
        $toastlast = toastr;
    }, toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }, this.decodeMsg = function(t) {
        return decodeURIComponent(t.replace(/\+/g, " "))
    }, this.encodeMsg = function(t) {
        return encodeURIComponent(t)
    }, this.uid = function() {
        var t = webstore.get("uid");
        return t
    }, this.appendDiv = function(t, e, n) {
        if ("" != n) {
            var o = document.getElementById(t);
            o.innerHTML = e ? n : o.innerHTML + n
        }
    }, this.replaceURLWithHTMLLinks = function(t) {
        var e = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
        return t.replace(e, "<a href='$1' target='_blank'>$1</a>")
    }, this.getParameterByName = function(t) {
        t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var e = new RegExp("[\\?&]" + t + "=([^&#]*)"),
                n = e.exec(location.search);
        return null == n ? "" : decodeURIComponent(n[1].replace(/\+/g, " "))
    }, this.redirect = function(t) {
        window.location = t
    }, this.capitaliseFirstLetter = function(t) {
        var e = t.value;
        "" != e && (t.value = e.charAt(0).toUpperCase() + e.slice(1))
    }, this.capitalize = function(t) {
        var e = t.value.toLowerCase();
        "" != e && (t.value = e.replace(/\w\S*/g, function(t) {
            return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()
        }))
    }, this.castLowerCase = function(t) {
        document.getElementById(t).value = document.getElementById(t).value.toLowerCase()
    };


    this.validateEmail = function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    this.isTouchy =function(){
        return typeof window.ontouchstart !== 'undefined';
    }



    this.isMac =function(){
        var mac=false;
        if (navigator.userAgent.indexOf('Mac OS X') != -1) {
            mac=true;
        }
        else {
            mac=false;
        }
        return mac;
    };
    this.isMobile =function(){
            var check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
            return check;

    };

    this.highlight = function(id)
    {

        //var sc= $('#'+id).position().top-130;
        //$('body,html').animate({scrollTop:sc},300,"swing");
        //setTimeout(function(){

            //if(type==0)
                $('#'+id).addClass('error');

            _this.bindError();
        //},350);

    };
    this.bindError = function()
    {
        $('input,.error').bind('focus click',function(){
            $(this).removeClass('error');
            $(this).unbind();
        });

    };
    this.resetError=function (){
        $('.error').removeClass('error');
    };


    this.eSubmit = function(evt, btnId) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode === 13) {
            $('#' + btnId).click();
        }
    };


    this.isNumberKey = function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        else if (charCode == 13) {
            return false;
        }
        return true;
    };

    this.isDecimalKey = function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode == 46) {
            return true;
        }
        else if (charCode == 13) {
            return false;
        }
        else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    };

    this.onlyAlphabets = function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode < 47) {
            return true;
        } else
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return true;
        }
        return false;
    };


    this.tagWord = function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if(charCode == 96)
            return false;

        if((charCode > 47 && charCode < 58) || (charCode > 64 && charCode < 91) || (charCode > 95 && charCode < 123))
            return true;

        else
            return false;
    };

    this.getHashStr=function (txt){
        var words =txt.split(' ');
        var len = words.length;
        var fl='';
        $(words).each(function(i){
            if(words[i].indexOf('#')!==-1)
            {
                words[i]='<span class="hashTag">'+words[i]+'</span>';
            }
            if(words[i].indexOf('@')!==-1)
            {
                words[i]='<span class="userTag">'+words[i]+'</span>';
            }

            if(i==len-1)
                fl= (words.toString()).split(",").join(" ");
        });
        return fl;
    };

//    this.disableBodyScroll =function()
//    {
//        $('body,html').bind('scroll touchmove mousewheel', function(e){
//            e.preventDefault();
//            e.stopPropagation();
//            return false;
//        })
//    };
//
//    this.enableBodyScroll =function()
//    {
//        $('body,html').unbind('scroll touchmove mousewheel')
//    };
//

    // *************************************************

        function localStoreSupport()
        {
           var testKey = 'test',storage =window.sessionStorage;
           try{
               storage.setItem(testKey,'1');
               storage.removeItem(testKey);
               return true;
            }
            catch(error){
               return false;
            }
        }

        this.storageClear = function()
	{
            deleteAllCookies();
            localStorage.clear();
        };
        this.addToStorage = function(id,val)
	{
                if(localStoreSupport()){
                    localStorage.setItem(id,val);
                } else {
                        date = new Date();
                        date.setYear(date.getFullYear() + 1);
                        document.cookie = id+'='+val+';'+date+';path=/;'

                }

	}

	this.readFromStorage = function(id)
	{
            if(localStoreSupport())
                   return localStorage.getItem(id);
            else
                   return _this.getCookie(id);
	}

        function deleteAllCookies(){
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++)
                deleteCookie(cookies[i].split("=")[0]);
        }

        function setCookie(name, value, expirydays) {
         var d = new Date();
         d.setTime(d.getTime() + (expirydays*24*60*60*1000));
         var expires = "expires="+ d.toUTCString();
            document.cookie = name+'='+value+';'+expires+';path=/;'
        }

        function deleteCookie(name){
          setCookie(name,"NULL",-1);

        }
        this.getCookie = function(cn) {
		if (document.cookie.length > 0) {
		var c_start=document.cookie.indexOf(cn + "=");
			if(c_start!=-1) {
				c_start = c_start + cn.length+1;
				var c_end=document.cookie.indexOf(";",c_start);
				if (c_end==-1) c_end=document.cookie.length;
				var cvalue = _this.cookie_unescape(document.cookie.substring(c_start,c_end));
				return unescape(cvalue);
			}
		}
		return "";
	}
        this.cookie_unescape = function(str)
	{
		str = "" + str;
		while (true)
		{
			var i = str . indexOf ('+');
			if (i < 0)
				break;
			str = str.substring (0, i) + '%20' +
				str.substring (i + 1, str.length);
		}
		return unescape (str);
	}
	this.removeFromStorage = function(id)
	{
		if(typeof(Storage) !== "undefined")
			localStorage.removeItem(id);
		else
			document.cookie = id+'=;'+date+';path=/;'
	}

    //*********************************************************

    this.nameinitials = function(name){
        if(!name)
            return;
        var nm  = name.split(" ");
        if(nm.length>1)
            var nms = (nm[0].charAt(0)).toUpperCase()+" "+(nm[1].charAt(0)).toUpperCase();

        else
            var nms = (name.charAt(0)).toUpperCase();

        return nms;
    };


    this.getParameterByName = function (name, url) {
        if (!url)
            url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    this.generateId= function(){
        var dTime = new Date().getTime();
        var genaratedId;
        var rNum = Math.floor(Math.random() * (9 - 1)) + 1;
        genaratedId = ''+dTime+''+rNum;//+''+dTime+''+rNum2;
        return genaratedId;
    };

    this.generatesalt= function(){
        var dTime = (new Date().getTime()).toString();
        return (dTime.substring(dTime.length-2, dTime.length));
    };
    this.showPageLoader = function(){
      $('#pageLoader').css({'display':'block','opacity':1});
    };

    this.hidePageLoader = function()
    {
        $('#pageLoader').addClass('fadeout');
            setTimeout(function(){
                $('#pageLoader').css({'display':'none'});
            },400);

    };

    this.showPageLoader2 = function(){
      $('#pageLoader').css({'display':'block','opacity':1,'background':'transparent'});
    };

    this.hidePageLoader2 = function()
    {
        $('#pageLoader').velocity({opacity:[0,1]},{duration:1000 , easing:'swing' ,delay:200,complete:function(){
            $('#pageLoader').css({'display':'none','background':'transparent'});

        }});
    };

    this.strip = function (obj) {
//        var html=$(obj).html();
//        var tempDiv = document.createElement("DIV");
//        tempDiv.innerHTML = html;
//        var txt=tempDiv.innerText;
//        var ftxt =txt.substr(0, 1500);
//        txt=(ftxt.replace(/\r?\n/g,'<br/>'));
//        $(obj).html(txt);
    };

    this.setTextareaSHeight = function(){};
    this.setTextareaHeight = function()
    {
        var editModeFlag = $('#grid').hasClass('editModeOff');
        if(editModeFlag)
        {
            $('.trans.storyTitle').each(function(){
                var vl = $(this).val();

                if(vl=="")
                    $(this).addClass('dn');;
            });

            $('.trans.storyTxt').each(function(){
                var vl = $(this).html();
                if($(this).parent().parent().attr('id')=='coverInfo')
                    vl = $(this).val();


                if(vl=="")
                    $(this).addClass('dn');

                console.log('here');
            });
        }

    };

    this.hManage = function()
    {   brManage();
        $('.editable1').click(function(e){
            $(this).parent().parent().parent().draggable(option);
            $(this).parent().parent().parent().draggable("destroy");
            var tid=$(this).attr('id');
            var el = document.getElementById(tid);
            $('#coverMkBtn,#storyPhoto,#addTextBtn,#storyVideo,#changeCoverBtn,#forResize,#homeTagDiv,#neighTagDiv,#aHome,#aNeighbour').addClass('dn');
            $('#forBgCols,#forTextCols,#forTextAlign, .hback').removeClass('dn');
        });


        $('.editable').focusout(function(){
            _this.removeStyleChilds($(this));

            var id =$('.activate').attr('data-id');
            $('.activateTxt').removeClass('activateTxt');
            savetitle(id, 1);
            $('.item').draggable(option);
        });



        $('.txtEditable').focusout(function(){
            _this.removeStyleChilds($(this));
        });

        $('.editable,.txtEditable').unbind('paste keyup cut');

        $('.editable,.txtEditable').bind('paste',function(e){
          var text = '';
            var that = $(this);

            if (e.clipboardData)
              text = e.clipboardData.getData('text/plain');
            else if (window.clipboardData)
              text = window.clipboardData.getData('Text');
            else if (e.originalEvent.clipboardData)
              text = $('<div></div>').text(e.originalEvent.clipboardData.getData('text'));

            if (document.queryCommandSupported('insertText')) {
              document.execCommand('insertHTML', false, $(text).html());
              return false;
            }
            else {
              that.find('*').each(function () {
                   $(this).addClass('within');
              });

              setTimeout(function () {
                    that.find('*').each(function () {
                         $(this).not('.within').contents().unwrap();
                    });
              }, 1);
            }
        });



        $('.editable').bind('cut',function(e){
            _this.managePlaceHolder($(this));
        });

        $('.editable').bind('keyup',function(e){
            _this.managePlaceHolder($(this));
        });

    };

    this.managePlaceHolder = function(obj){
        var html=$(obj).html();
        if(html === '<br>')
        {
            $(obj).html('');
            $(obj).addClass('noPlacHolder');
        }
        else if(html!=="")
        {
            $(obj).addClass('noPlacHolder');
        }
        else
            $(obj).removeClass('noPlacHolder');

    };



    this.computeHeight = function(v){};

    this.pasteHtmlAtCaret = function(html) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount)
        {
            range = sel.getRangeAt(0);
            range.deleteContents();
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }
    else if (document.selection && document.selection.type != "Control") {
       // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
};



    this.findChilds = function (obj){

//        $(obj).children().each(function(i){
//            var st=$(this);
//            var st1=$(this).attr('style');
//            $(this).removeAttr('style');
//            var ln =$(this).children().length;
//            if(ln>0)
//                _this.findChilds($(this));
//
//        });
//
//        _this.strip(obj);

    };



    this.removeStyleChilds = function (obj){

        $(obj).children().each(function(i){
            var st=$(this);
            var st1=$(this).attr('style');
            $(this).removeAttr('style');
            var ln =$(this).children().length;
            if(ln>0)
                _this.removeStyleChilds($(this));

        });
    };


    this.checkLength = function(obj,event){
        if($(obj).text().length === 1500)
        {
           event.preventDefault();
        }
    };

    this.dbDate = function(dt)
    {
        dt = new Date(dt);
        var dbFomrdate = (dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate());
        return dbFomrdate;
    };

    this.viewDate = function(dt)
    {
        //dt format - yyyy-mm-dd
        //dt = new Date(dt);
        dt = (new Date(dt.replace(/-/g, "/")));
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sep";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        //var n = month[d.getMonth()];

        if (dt.getDate() < 10)
            var dayNo = '0' + dt.getDate();
        else
            dayNo = dt.getDate()
        var vwFomrdate = dayNo + '-' + month[(dt.getMonth())] + '-' + dt.getFullYear();
        return vwFomrdate;
    };


    this.hours_am_pm = function(hours,min)
    {
        var h='12';
        var m='00';
        var l=' PM';


        if (hours < 12) {
            h= hours;
            l =' AM';
        }
        else if(hours > 12)
        {
            hours=hours - 12;
            hours=(hours.length < 10) ? '12'+hours:hours;
            h = hours;
            l =' PM';
        }
        if (min < 10) {
            m ='0'+min;
        }
        else if(min >= 10)
        {
            m=min;
        }
        return h+":"+m+l;
    };

    this.get_time_diff = function(datetime){
        var ctime=''
        var hr = new Date( datetime ).getHours();
        var mn = new Date( datetime ).getMinutes();
        var time=_this.hours_am_pm(hr,mn);
        var datetime = new Date( datetime ).getTime();
        var now = new Date().getTime();
        if( isNaN(datetime) )
        {
            return -1;
        }

        if (datetime < now) {
            var milisec_diff = now - datetime;
        }else{
            var milisec_diff = datetime - now;
        }

        var cday = Math.round(milisec_diff / 1000 / 60 / (60 * 24));
        var date_diff = new Date( milisec_diff );
        //return cday + " Days "+ date_diff.getHours() + " Hours " + date_diff.getMinutes() + " Minutes ";

//        console.log(date_diff.getMinutes());
//
//        if(date_diff.getMinutes()==0)
//        {
//            ctime='Now';
//        }
//        else if(date_diff.getMinutes()>0)
//        {
//            if(date_diff.getMinutes()>1)
//                ctime=date_diff.getMinutes() +' minutes ago';
//            else
//                ctime=date_diff.getMinutes() +' minute ago';
//        }
//        else
//

        if(date_diff.getHours()>0)
        {
            if(date_diff.getHours()>1){
                //ctime1=date_diff.getHours() +' today '+time;
                ctime='today '+time;
            }

            else
                ctime='today '+time;
        }
        if(cday>0)
        {
            if(cday>1 && cday<7)
                ctime=cday +' days ago';
            else if(cday == 1)
                ctime='yesterday '+time;
            else if(cday>7)
                ctime=-1;
        }
        return ctime;
    };



    this.createChannel = function (obj)
    {
        var fingerprint = new Fingerprint2();
        var request = window.superagent;
        var uid = _this.readFromStorage('userIID');
        fingerprint.get(function (endpointId) {
            request(NODOMAIN+'getToken?identity=' + uid + '&endpointId=' + uid, function (err, res) {
                if (err) {
                    console.log(err);
                    console.log('createChannel error in common js');
                    throw new Error(res.text);
                }
                else
                {
                    token = res.text;
                    var options = {logLevel: 'error'};
                    var accessManager = new Twilio.AccessManager(token);
                    client = new Twilio.IPMessaging.Client(accessManager, options);
                    var senderid = _this.readFromStorage('userIID');
                    var recid = obj.homeOwnerId;
                    var recName= $(obj).uname;
                    var senderName = _this.readFromStorage('username');
                    var channelfriendlyName= senderName+'_'+recName;
                    var channelId= senderid+'_'+recid;

                    var channelId1 =channelId;
                    var channelId2 =channelId.split('_');
                    channelId2=channelId2[1]+"_"+channelId2[0];

                    var promise1 = client.getChannelByUniqueName(channelId1);
                    var promise2 = client.getChannelByUniqueName(channelId2);

                    promise1.then(function (channel) {
                        var channel1 = channel;
                        if (!channel1) {
                            promise2.then(function (channel) {
                                var channel2 = channel;
                                if (!channel2) {
                                    client.createChannel({
                                        uniqueName: channelId,
                                        friendlyName: channelfriendlyName
                                    }).then(function (channel) {
                                        channel.join();
                                        window.location.href=(DOMAIN + 'index.php?action=messaging&userid=' + uid+'&ruserid='+recid);
                                        return channel;
                                    });

                                } else {
                                    channel2.join();
                                    window.location.href=(DOMAIN + 'index.php?action=messaging&userid=' + uid+'&ruserid='+recid);
                                    return channel2;


                                }
                            });

                        } else {
                            channel1.join();
                            window.location.href=(DOMAIN + 'index.php?action=messaging&userid=' + uid+'&ruserid='+recid);
                            return channel1;

                        }
                    });
                }
            });
        });
    };

    this.run =function() {
        var online = navigator.onLine;
        $(window).on("offline", function () {
            online =false;
        }, false);

        $(window).on("online", function () {
            online = true;
        }, false);
        return online;
    };



    this.containsObject =function(obj, list,k) {//k is key to match
        for (var i = 0; i < list.length; i++) {
            if (list[i][k] == obj[k]) {
                return true;
            }
        }
        return false;
    };


    this.getid=function(){
        return _this.readFromStorage("userIID")+_this.generatesalt();
    };

    this.gid=function(){
        return _this.readFromStorage("userIID");
    };


    this.findElementInArray = function(searchElement, arrayName){
        if(arrayName && typeof(arrayName) === 'object')
            return arrayName.customIndexOf(searchElement);
        else
            return -1;
    };

}



Array.prototype.customIndexOf = function (searchElement, fromIndex) {
    var object = Object(this),
        length = object.length >>> 0,
        val = -1,
        index;

    if (length) {
        if (arguments.length > 1) {
            fromIndex = fromIndex >> 0;
        } else {
            fromIndex = 0;
        }

        if (fromIndex < length) {
            if (fromIndex < 0) {
                fromIndex = length - Math.abs(fromIndex);
                if (fromIndex < 0) {
                    fromIndex = 0;
                }
            }

            for (index = fromIndex; index < length; index += 1) {
                if (index in object && searchElement.toLowerCase() === object[index].toLowerCase()) {
                    val = index;
                    break;
                }
            }
        }
    }

    return val;
};
//
//$(window).bind('storage', function (e) {
//
//    console.log(e.originalEvent.key, e.originalEvent.newValue);
//    alert(page);
//});



function updateNotify(num){
  $('.notify_count').html(num);
}



function brManage(){

$('div[contenteditable="true"]').keypress(function(event) {

	if (event.which != 13)
		return true;

	var docFragment = document.createDocumentFragment();

	//add a new line
	var newEle = document.createTextNode('\n');
	docFragment.appendChild(newEle);

	//add the br, or p, or something else
	newEle = document.createElement('br');
	docFragment.appendChild(newEle);

	//make the br replace selection
	var range = window.getSelection().getRangeAt(0);
	range.deleteContents();
	range.insertNode(docFragment);

	//create a new range
	range = document.createRange();
	range.setStartAfter(newEle);
	range.collapse(true);

	//make the cursor there
	var sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange(range);

	return false;
});



}

