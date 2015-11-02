(function(){
    $.extend($.fn,{
        pullRefresh:function(loading,callback){
            var pullRefresh = function( config ) {
                this.defaultConfig = {
                    el: $( document.body ), //绑定事件的dom元素 id或jq对象
                    offsetScrollTop: 2,     //滚动条偏移值，大于此值不触发下拉事件
                    offsetY: 75             //触摸起止Y偏移值，大于些值才会触发下拉事件
                };

                this.config = $.extend( this.defaultConfig, config || {} );
                this.init.call( this );
            };

            pullRefresh.prototype={
                init: function() {
                    this._cacheDom();
                    this._initEvent();
                },

                _cacheDom: function() {
                    this.el = ( typeof this.config.el === 'string' ) ? $( this.config.el ) : this.config.el;
                },

                _initEvent: function() {
                    var me = this,
                        config = this.config,
                        el = this.el,

                        touchStartX = 0,
                        touchStartY = 0;

                    el.on( 'touchstart', function( event ) {
                        var touchTarget = event.originalEvent.touches[ 0 ];

                        touchStartX = touchTarget.clientX;
                        touchStartY = touchTarget.clientY;
                    } );

                    el.on( 'touchmove', function( event ) {
                        var scrollTop = document.body.scrollTop,
                            touchTarget = event.originalEvent.touches[ 0 ],
                            touchMoveX = touchTarget.clientX,
                            touchMoveY = touchTarget.clientY;

                        var offsetX = touchMoveX - touchStartX,
                            offsetY = touchMoveY - touchStartY;

                        if ( offsetY > 5 && scrollTop < config.offsetScrollTop && Math.abs( offsetX ) < Math.abs( offsetY ) ) {
                            event.preventDefault();

                            $(me.el).trigger('canPullDownMove', [ {
                                touchStartY: touchStartY,
                                touchMoveY: touchMoveY
                            } ] );
                        }
                    } );

                    el.on( 'touchend', function( event ) {
                        var scrollTop = document.body.scrollTop,
                            touchTarget = event.originalEvent.changedTouches[ 0 ],
                            touchEndX = touchTarget.clientX,
                            touchEndY = touchTarget.clientY;

                        var offsetX = touchEndX - touchStartX,
                            offsetY = touchEndY - touchStartY;

                        if ( offsetY > config.offsetY && scrollTop < config.offsetScrollTop && Math.abs( offsetX ) < Math.abs( offsetY ) ) {
                            $(me.el).trigger('canPullDownRefresh' );
                        } else {
                            $(me.el).trigger('clearPullDownMove' );
                        }
                    } );

                    el.on('touchcancel',function(){
                        $(me.el).trigger('clearPullDownMove' );
                    });
                }
            };

            new pullRefresh({
                el:$(this)
            });
            var timeout;
            if($.type(loading)=='function'){
                callback=loading;
                loading='.pull_refresh_loading';
            }else{
                loading=loading||'.pull_refresh_loading';
            }
            var dy=0;

            $(this).bind( 'canPullDownMove', function(e,d) {
                //此时可处理下拉时Loading状态
                if(dy==0){
                    dy= d.touchMoveY;
                }
                $(loading).show().css('margin-bottom',(d.touchMoveY-dy)/6+8);
            });

            $(this).bind( 'clearPullDownMove', function() {
                //此时可处理清除下拉loading状态
                $(loading).show().css('margin-bottom',8);
                $(loading).hide();
//                setTimeout(function(){
//                    $(loading).hide();
//                },500);
            });

            $(this).bind( 'canPullDownRefresh', function() {
                //所有状态准备完毕，可请求新数据
                clearTimeout(timeout);
                timeout=setTimeout(function(){
                    callback&& callback();
                },500);
                $(loading).show().css('margin-bottom',15);
                $(loading).hide();

//                setTimeout(function(){
//                    $(loading).hide();
//                },500);
            });
        }
    });
}());