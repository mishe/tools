$.extend($, {
    setWeixinTitle: function (title) {
        document.title = title;
        
        // hack在微信IOS webview中无法修改document.title的情况
        if ($.isWeixin() && $.isIOS()) {
            var $iframe = $('<iframe src="/st/images/icon144.png"></iframe>');
            $iframe.on('load', function () {
                setTimeout(function () {
                    $iframe.off('load').remove();
                }, 0);
            }).appendTo('body');
        }
    }
});