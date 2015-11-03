$.extend($,{
    translate3d: function (obj, x, y, z) {
        x = x || 0, y = y || 0, z = z || 0;
        $(obj).css({
            '-webkit-transform': 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)',
            '-moz-transform': 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)',
            'transform': 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)'
        });
    },
    setTransitionTime: function (obj, num) {
        $(obj).css({
            '-webkit-transition': +num + 's',
            '-moz-transition': +num + 's',
            'transition': +num + 's'
        });
    }
});
