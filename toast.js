$.extend($,{
    toast: function (msg,interval,site) {
        /* site位置如下：默认为5
         *  1,2,3
         *  4,5,6
         *  7,8,9
         * */
        msg || (msg = '');
        site=site||5;
        var id = $.uniqID(),
            msg = $('<div class="toast_info_box hide toast_info_box_site'+site+'" id="' + id + '"><span class="error_msg">' + msg + '</span></div>');
        $('body').append(msg);
        $('#' + id).fadeIn();
        var close=function(){
            $('#' + id).fadeOut();
            setTimeout(function () {
                $('#' + id).remove();
            }, 500);
        };
        if(interval!==false)
            setTimeout(function () {
                close();
            }, interval || 2000);
        
        return{
            close: function () {
                close();
            }
        };
    }
})