$.extend($,{
    //检测网络
    checkNetwork: function () {
        if (navigator.onLine) {
            return true;
        } else {
            $.toast('您的网络不太给力哦~', 500);
            return false;
        }
    },
    serverError: function () {
        $.toast('服务器忙，请稍候再试~', 500);
    },
    isRetina: function () {
        return window.devicePixelRatio && window.devicePixelRatio >= 1.5;
    },
    uniqID: function (string) {
        string = string || '';
        return string + Math.random().toString(36).substr(2, 10);
    },
    isWeixin: function () {
        return /MicroMessenger/i.test(navigator.userAgent);
    },
    isIOS: function () {
        return /ipad|iphone|iPod|Macintosh|mac os/i.test(navigator.userAgent);
    },
    isAndroid: function () {
        return /Android/i.test(navigator.userAgent);
    },
    isMobile:function(m){
        return /^1[3,5,7,8]\d{9}$/.test(m);
    },
    charLen: function (string) {
        if (!string) return 0;
        return string.replace(/[^\x00-\xff]/g, '00').length;
    },
    setCache:function(key,value,exp){
        //过期时间默认1天
        exp=exp||86400;
        if(!value){
            st.cache[key+'_'+curUserID] = null;
            store.delete(key+'_'+curUserID);
            store.delete(key+'_'+curUserID);
            return false;
        }

        st.cache[key+'_'+curUserID] = value;
        store.set(key+'_'+curUserID, value, {exp:exp});
    },
    getCache:function(key){
        return (st.cache[key+'_'+curUserID] || store.get(key+'_'+curUserID));
    },
    //输入框textarea滚动
    textAreaScroll: function (obj) {
        var start = 0;
        $(obj).on('touchstart', function (e) {
            start = e.originalEvent.touches[0].clientY;
        }).on('touchend', function (e) {
            var end = e.originalEvent.changedTouches[0].clientY;
            if (end > start) {
                $(obj)[0].scrollTop -= 30;
            }
            else {
                $(obj)[0].scrollTop += 30;
            }
        }).on('touchmove', function (e) {
            e.preventDefault();
        });
    },
    //滚动到指定元素
    scrollTo: function (obj) {
        if (typeof obj === "number") {
            window.scroll(0,obj);
        }
        else {
            var offset = $(obj).offset();
            window.scroll(0,offset.top);
        }
    },
    openAPP: function (appAddress, iosDownload, androidDownload) {
        window.location=appAddress;
        var startDate=new Date();
        setTimeout(function(){
            if(new Date()-startDate>1000) return;
            window.location= $.isAndroid()?androidDownload:iosDownload;
        },800);
    },
    setCursorPosition: function (htmlTag, start, end) {
        if (start === undefined) start = htmlTag.value.length;
        if (end === undefined) end = htmlTag.value.length;
        if (htmlTag.setSelectionRange) { //W3C
            setTimeout(function () {
                htmlTag.setSelectionRange(start, end);
//                    htmlTag.focus();
            }, 0);
        } else if (htmlTag.createTextRange) { //IE
            var textRange = htmlTag.createTextRange();
            textRange.moveStart("character", start);
            textRange.moveEnd("character", end);
            textRange.select();
        }
    },
    getLimitString: function (str, limit) {
        var pos = 0;
        if (!limit || $.charLen(str) <= limit) return str;
        for (var i = 0; i < str.length; i++) {
            pos += str.charCodeAt(i) > 255 ? 2 : 1;
            if (limit <= pos) {
                return str.substr(0, i + 1)+'...';
                break;
            }
        }
    }
});

