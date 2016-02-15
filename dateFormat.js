$.extend($, {
    //格式化日期显示
    
    dateFormat: function (date, fmt) {
        //指定fmt 格式，按照fmt格式输出
        //未指定fmt 按照语义化输出。
        if (!date) return '';
        function getDateStr(d) {
            if (!d) return '';
            return d.toString().replace('T', ' ').replace(/-/g, '/').split('+')[0].split('.')[0];
        }

        function _isDate(date) {
            return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
        }
        if(!_isDate(date))
            date = new Date(_getDateStr(date));
        var now = new Date(),
            o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3),
                "S": date.getMilliseconds()
            },
            format = function (fmt) {
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            };
        if (fmt) {
            return format(fmt);
        } else {
            var ts = new Date().getTime() - date.getTime();
            if (!date || ts <= 3000) return '刚刚';
            if (Math.floor(ts / 1000) < 60) return Math.floor(ts / 1000) + '秒钟前';
            if (Math.floor(ts / 60000) < 60) return Math.floor(ts / 60000) + '分钟前';
            if (Math.floor(ts / 3600000) < 24) return Math.floor(ts / 3600000) + '小时前';
            if (Math.floor(ts / 86400000) <= 10) return Math.floor(ts / 86400000) + '天前';
            if (now.getFullYear() == date.getFullYear()) {
                return format('MM-dd hh:mm');
            } else {
                return format('yyyy-MM-dd hh:mm');
            }
        }
    }
});
