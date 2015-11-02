$.extend($, {
    sync: function (options) {
        var defaultSetting = {
            checkNetwork: true,
            timeout: 20000
        };
        var opt = $.extend(true, defaultSetting, options),
            type = (opt.type || 'get').toLowerCase(),
            data = opt.data;
        data.sourceID=$.isWeixin()?1000:1;
        if (type == 'get' && data) {
            opt.url +=(opt.url.indexOf('?')>0?'&':'?')+$.param(data);
        }
        if (!opt.checkNetwork || (opt.checkNetwork && $.checkNetwork())) {
            var data = {
                url: opt.url,
                type: type,
                data: data,
                success:function(d){
                    if(opt.loading) $(opt.loading).hide();
                    if (d.status == 0) {
                        opt.success && opt.success(d.data);
                    } else if (opt.error && $.type(opt.error) === 'function') {
                        opt.error(d);
                    } else {
                        $.toast(d.message, 500);
                    }
                }
            };
            if(opt.loading) $(opt.loading).show();
            $.ajax(data);
        }
    }
});