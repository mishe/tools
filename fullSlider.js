(function ($) {
    $.extend($, {
        
        fullSlider:function(options){
            var defaultOptions= {
                    class: 'full_slider',
                    loadingPic: '/st/images/loading.gif',
                    getImgList: '.full_slider img', //字符串表示可以直接使用的zepto对象，可以是函数，返回的是相应需要放大的图片数组,
                    autoPlay: false,
                    defaultSlide: 1
                },
                id = 'fullSlider' + new Date().getTime(),
                loadedImgList = [],
                imgsrc = [],
                touchMoveInterval = null,
                orientation = 0,
                movePositions = [],
                curClientX = 0,
                curMoveNum = 0,
                startClientX = 0,
                curIndex = 0,
                htmlContent='';
            options= $.extend(defaultOptions,options);
            htmlContent=_getImgList();
            //微信采用原生的浏览方式
            if($.isWeixin() &&  wx && wx.previewImage){
                wx.previewImage({
                    current:imgsrc[options.defaultSlide-1] , // 当前显示的图片链接
                    urls: imgsrc // 需要预览的图片链接列表
                });
                return;
            }
            $('body').append('<div id="' + id + '" style="position:absolute;top:0;left:0;background:#000;width:100%;height:100%"></div>');

            var touchMoveObj ;
            curIndex = options.defaultSlide - 1;
            setTimeout(function(){
                $('#'+id ).html(htmlContent);
                touchMoveObj = $('#' + id).find('.' + options.class);
                _bindEvent();
                refresh();

            },300);



//            location.hash=id;



            //返回图片列表，分页的字符串，并把
            function _getImgList () {
                var imgList = '<ul class="' + options.class + '">',
                    pages = '<ul class="' + options.class + '_pages">',
                    tempArray = [],
                    getImgList = options.getImgList;
                //zepto 的实例不能通过 getImgList intanceof $ 获得true;
                if (typeof(getImgList) === 'string' || getImgList.selector) {
                    $(getImgList).each(function () {
                        tempArray.push(src);
                    });
                    imgsrc = tempArray;
                } else if (Object.prototype.toString.call(getImgList) == '[object Array]') {
                    imgsrc = options.getImgList;
                } else if (typeof(getImgList) === 'function') {
                    imgsrc = options.getImgList();
                    if (imgsrc[0].src) {
                        $(imgsrc).each(function () {
                            tempArray.push(src);
                        });
                        imgsrc = tempArray;
                    }
                } else {
                    throw new Error('获取目标图片错误');
                    return false;
                }
                length = imgsrc.length;
                for (var i = 0; i < length; i++) {
                    imgList += '<li><img src="' + options.loadingPic + '" style="width:12px;height:12px"></li>';
                    pages += '<li></li>';
                }
                return imgList + '</ul>' + pages + '</ul>';
            }

            function _destory(){
                $('#'+id).off().remove();
            }

            function _bindEvent () {
                $(window).on('resize', function () {
                    refresh();
                })
//                    .on('hashchange',function(){
//                    if(location.hash!='#'+id) _destory();
//                })

                //QQ浏览器特有bug，图片高度不会自适应
                if(navigator.userAgent.toLowerCase().indexOf('qq')==-1){
                    $("#" + id).addClass('qq_img_bug');
                }
                $("#" + id).on('touchstart', function (e) {
                    e.preventDefault();
                    curClientX = startClientX = e.originalEvent.touches[0].clientX;
                    _startTouchMove();
                }).on('touchend', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    _clearTouchMove();
                    var touches = e.originalEvent.changedTouches[0],
                        endTx = touches.clientX,
                        touchWidth = endTx - startClientX;
                    //                    alert(touchWidth)
                    if (Math.abs(touchWidth) > 30) {
                        if (touchWidth > 0) {
                            slideTo(--curIndex);
                        } else {
                            slideTo(++curIndex);
                        }
                    } else if (Math.abs(touchWidth) <= 6) {
                        //tap
                        e.preventDefault();
                        e.stopPropagation();
                        _clearTouchMove();
                        _destory();
                    } else {
                        slideTo(curIndex);
                    }
                }).on('touchmove', function (e) {
                    e.preventDefault();
                    movePositions.push(e.originalEvent.touches[0])
                }).on('touchcancel', function () {
                    e.preventDefault();
                    e.stopPropagation();
                    _clearTouchMove();
                    slideTo(curIndex);
                });
            }

            function refresh() {
                var wrap = $('#' + id);
                width = $(window).width();
                height = $(window).height();
                if($.isIOS()) {//高度不精确
                    height = Math.max($(window).height(), screen.availHeight);
                }
//                    alert($.isIOS()+'===='+height+'------'+window.devicePixelRatio)
//                width = screen.availWidth/window.devicePixelRatio;
//                height = screen.availHeight/window.devicePixelRatio;
                wrap.hide().find('.' + options.class).css("width", length * width).find('li').css({width: width, height: height});
                if (height > width) {
                    orientation = 0;
                    wrap.find('img').each(function () {
                        if ($(this).attr("src") != options.loadingPic)
                            $(this).css({width: width, height: 'auto'});
                    });
                } else {
                    orientation = 1;
                    wrap.find('img').each(function () {
                        if ($(this).attr("src") != options.loadingPic)
                            $(this).css({width: 'auto', height: height});
                    });
                }
                slideTo(curIndex);
                wrap.show();
            }

            function slideTo (no) {
                if (no < 0) {
                    curIndex = 0;
                    return
                }
                if (no > length - 1) {
                    curIndex = length - 1;
                    return;
                }
                _preLoadImg(no);
                touchMoveObj.css({
                    '-webkit-transition': '0.3s',
                    '-moz-transition': '0.3s',
                    'transition': '0.3s'
                });
                _translate3d(-no * width);
                $('#' + id).find('.' + options.class + '_pages li').eq(no).addClass('active').siblings().removeClass('active');
            }

            function _translate3d (x) {
                touchMoveObj.css({
                    '-webkit-transform': 'translate3d(' + x + 'px,0,0)',
                    '-moz-transform': 'translate3d(' + x + 'px,0,0)',
                    'transform': 'translate3d(' + x + 'px,0,0)'
                });
            }

            function _startTouchMove () {
                if (touchMoveInterval) _clearTouchMove(touchMoveInterval);
                touchMoveInterval = setInterval(function () {
                    _checkPosition();
                }, 16);
            }

            function _clearTouchMove () {
                clearInterval(touchMoveInterval);
                touchMoveInterval = null;
                movePositions = [];
                curMoveNum = 0;
                curClientX = 0;
            }

            function _checkPosition () {
                var touche = movePositions.shift(),
                    touchWidth;

                if (touche && touche.clientX && curClientX) {
                    touchWidth = touche.clientX - curClientX;
                    if (touchWidth==0 || (touchWidth < 0 && curIndex == length - 1) || (touchWidth > 0 && curIndex == 0)){
                        return;
                    }
                    if (Math.abs(touchWidth) > 5) {
                        curMoveNum += touchWidth;
                        touchMoveObj.css({
                            '-webkit-transition': '0',
                            '-moz-transition': '0',
                            'transition': '0'
                        });
                        _translate3d(-(curIndex * width - curMoveNum));
                        curClientX = touche.clientX;
                    }
                }
            }

            function _preLoadOneImg (pos, callback) {
                if (pos >= 0 && pos <= length - 1 && !loadedImgList[pos]) {
                    _imgLoad(imgsrc[pos], function () {
                        loadedImgList[pos] = 1;
                        if (orientation == 1) {
                            $("#" + id).find('img').eq(pos).attr('src', imgsrc[pos]).css({
                                width: 'auto',
                                height: height
                            });
                            if(width<$("#" + id).find('img').eq(pos).width()){
                                $("#" + id).find('img').eq(pos).attr('src', imgsrc[pos]).css({
                                    width: width,
                                    height: 'auto'
                                });
                            }

                        } else {
                            $("#" + id).find('img').eq(pos).attr('src', imgsrc[pos]).css({
                                width: width,
                                height: 'auto'
                            });
                            if(height<$("#" + id).find('img').eq(pos).height()){
                                $("#" + id).find('img').eq(pos).attr('src', imgsrc[pos]).css({
                                    width: 'auto',
                                    height: height
                                });
                            }
                        }
                        callback && callback();
                    });
                } else {
                    callback && callback();
                }
            }

            function _imgLoad (url, callback) {
                var img = new Image();
                img.src = url;
                img.onload = function () {
                    img = null;
                    callback && callback();
                }
            }

            function _preLoadImg (pos) {
                _preLoadOneImg(pos, function () {
                    _preLoadOneImg(pos - 1);
                    _preLoadOneImg(pos + 1);
                });
            }
        }
    });
})($);