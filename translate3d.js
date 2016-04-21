$.extend($,{
    css3Hack: function css3Hack(key, value) {
        function ch(key, value) {
            var d = {}
            d['-weikit-' + key] = value;
            d['-moz-' + key] = value;
            d['-ms-' + key] = value;
            d[key] = value;
            return d;
        }

        $(this).each(function () {
            var self = $(this)
            setTimeout(function () {
                self.css(ch(key, value));
            }, 0)
        });
    },
    translate3d: function (x, y, z) {
        x = x || 0, y = y || 0, z = z || 0;
        $(this).css3Hack('transform', 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)');
    },
    setTransitionTime: function (num) {
        $(this).css3Hack('transition', num + 's');
    },
});
