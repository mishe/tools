(function () {

    var videoApi = 'http://api.site.hujiang.com/Web/VideoV1.ashx';

    function videoRenderModel(embedTarget, video) {
        $(embedTarget).replaceWith(video);
        return video;
    }

    function tudou(target) {
        $.ajax({
            url: videoApi,
            data: {
                op: 'GetVideoSrc',
                vurl: $(target).attr('data-src')
            },
            dataType: 'jsonp',
            success: function (data) {
                var mheight = document.body.clientWidth * (9 / 16) + "px",
                    mwidth = (document.body.clientWidth - 32) + "px",
                    temc = data.Value.match(/&code=([^&]*)/),
                    code = (temc && temc.length > 1) ? temc[1] : "",
                    temLcode = data.Value.match(/&code=([^&]*)/),
                    lcode = (temLcode && temLcode.length > 1) ? temLcode[1] : "",
                    temResourceId = data.Value.match(/&resourceId=([^&]*)/)[1],
                    resourceId = (temResourceId && temResourceId.length > 1) ? temResourceId[1] : "";
                videoRenderModel(target, $("<iframe src='http://www.tudou.com/programs/view/html5embed.action?type=2&code=" + code + "&lcode=" + lcode + "&resourceId=" + resourceId + "' allowtransparency='true' allowfullscreen='true' scrolling='no' border='0' frameborder='0' style='width:" + mwidth + ";height:" + mheight + "'></iframe>"));
            },
            error: function (error, stat) {
                console.log(error);
            }
        });
    }

    function youku(target) {
        var videoId = $(target).attr('data-src').match("sid/([^/]*)")[1],
            uniqID = $.uniqID();
        var tempContainer = $("<div style='' id='" + uniqID + "'></div><p style='height:0;overflow:hidden'>");
        $("body").append(tempContainer);
        videoRenderModel(target, tempContainer);
        $('#' + uniqID).css({height: document.body.clientWidth * (9 / 16), width: document.body.clientWidth - 32});
        setTimeout(function(){
            if(window.YKU && YKU.Player) {
                new YKU.Player(uniqID, { styleid: 0, client_id: 'b051e0b225e7051b', vid: videoId });
            }else{
                var ykujs=$('<script></script>').appendTo('body');
                ykujs.attr('src','http://player.youku.com/jsapi');
                ykujs.on('load',function(){
                    setTimeout(function(){
                        new YKU.Player(uniqID, { styleid: 0, client_id: 'b051e0b225e7051b', vid: videoId });
                    },1000)
                });
            }
        },800)

    }

    function yinyuetai(target) {
        $.ajax({
            url: videoApi,
            data: {
                op: 'GetVideoSrc',
                vurl: $(target).attr('data-src')
            },
            dataType: 'jsonp',
            success: function (data) {
                var mheight = document.body.clientWidth * (9 / 16) + "px",
                    mwidth = (document.body.clientWidth - 32) + "px",
                    videoImage = data.Value.split(',')[0],
                    videoUrl = data.Value.split(',')[1] || data.Value.split(',')[0];
                videoRenderModel(target, $("<video poster='" + videoImage + "' preload=\"none\" width='" + mwidth + "' height='" + mheight + "' controls='controls'><source src='" + videoUrl + "'type='video/mp4' >暂不支持此视频</source></video>"));
            },
            error: function (error, stat) {
                console.log(error);
            }
        });
    }

    function aiqiyi(target) {
        window.Q = {
            PageInfo: {

            }
        };
        window._0 = ["\x6E\x61\x74\x69\x76\x65\x5F\x6A\x61\x76\x61\x5F\x6F\x62\x6A", "\x63\x6F\x6E\x63\x61\x74", "\x70\x75\x73\x68", "\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65", "\x75\x6E\x64\x65\x66\x69\x6E\x65\x64", "\x50\x61\x67\x65\x49\x6E\x66\x6F", "", "\x6C\x65\x6E\x67\x74\x68", "\x63\x68\x61\x72\x41\x74", "\x00", "\x69\x6E\x64\x65\x78\x4F\x66", "\x73\x75\x62\x73\x74\x72\x69\x6E\x67", "\x68\x65\x69\x67\x68\x74", "\x6F\x72\x69\x65\x6E\x74\x61\x74\x69\x6F\x6E", "\x77\x69\x64\x74\x68", "\x64\x65\x76\x69\x63\x65\x50\x69\x78\x65\x6C\x52\x61\x74\x69\x6F", "\x72\x6F\x75\x6E\x64", "\x73\x63\x72\x65\x65\x6E\x54\x6F\x70", "\x6F\x75\x74\x65\x72\x48\x65\x69\x67\x68\x74", "\x5F", "\x73\x74\x61\x72\x74\x54\x69\x6D\x65", "\x67\x65\x74\x49\x74\x65\x6D", "\x6C\x6F\x63\x61\x6C\x53\x74\x6F\x72\x61\x67\x65", "\x72\x65\x6D\x6F\x76\x65\x49\x74\x65\x6D", "\x69\x71\x69\x79\x69", "\x73\x65\x74\x49\x74\x65\x6D", "\x72\x65\x66\x65\x72\x72\x65\x72", "\x62\x61\x69\x64\x75\x2E\x63\x6F\x6D", "\x55\x43\x57", "\x5F\x62\x6F\x6C\x75\x6F\x57\x65\x62\x56\x69\x65\x77", "\x42\x4F\x4C", "\x54\x55\x52\x4F\x61\x6B\x31\x71\x62\x47\x6C\x5A\x65\x6C\x6B\x77\x5A\x57\x4E\x68\x4E\x44\x4E\x6C\x59\x6D\x4A\x68\x4E\x54\x6B\x33\x4D\x57\x46\x6A\x59\x30\x31\x55\x61\x7A\x4E\x4F\x52\x46\x46\x33\x54\x30\x45\x39\x50\x51\x3D\x3D", "\x54\x55\x52\x4F\x61\x6B\x31\x71\x62\x47\x6C\x5A\x64\x7A\x30\x39\x56\x47\x31\x77\x55\x32\x4A\x47\x61\x33\x6C\x53\x56\x45\x4A\x4F\x54\x57\x78\x61\x63\x46\x64\x58\x4D\x55\x5A\x51\x55\x54\x30\x39\x56\x47\x78\x53\x63\x6B\x30\x77\x4D\x56\x68\x53\x62\x58\x42\x61\x5A\x48\x6F\x77\x4F\x51\x3D\x3D", "\x67\x65\x74\x54\x69\x6D\x65", "\x63\x61\x63\x68\x65", "\x73\x69\x6E", "\x61\x62\x73", "\x73\x75\x62\x73\x74\x72", "\x72\x65\x70\x6C\x61\x63\x65", "\x63\x68\x61\x72\x43\x6F\x64\x65\x41\x74", "\x66\x75\x6E\x63\x74\x69\x6F\x6E\x25\x32\x30\x6A\x61\x76\x61\x45\x6E\x61\x62\x6C\x65\x64\x25\x32\x38\x25\x32\x39\x25\x32\x30\x25\x37\x42\x25\x32\x30\x25\x35\x42\x6E\x61\x74\x69\x76\x65\x25\x32\x30\x63\x6F\x64\x65\x25\x35\x44\x25\x32\x30\x25\x37\x44", "\x6E\x75\x6C\x6C", "\x57\x65\x62\x6B\x69\x74\x41\x70\x70\x65\x61\x72\x61\x6E\x63\x65", "\x73\x74\x79\x6C\x65", "\x64\x6F\x63\x75\x6D\x65\x6E\x74\x45\x6C\x65\x6D\x65\x6E\x74", "\x6A\x61\x76\x61\x45\x6E\x61\x62\x6C\x65\x64", "\x73\x67\x76\x65", "\x73\x69\x6A\x73\x63", "\x6D\x64", "\x6A\x63", "\x64", "\x6A\x6F\x69\x6E", "\x55\x52\x4C", "\x3B", "\x3B\x26\x74\x69\x6D\x3D", "\x73\x72\x63", "\x64\x38\x34\x36\x64\x30\x63\x33\x32\x64\x36\x36\x34\x64\x33\x32\x62\x36\x62\x35\x34\x65\x61\x34\x38\x39\x39\x37\x61\x35\x38\x39", "\x73\x63", "\x5F\x5F\x72\x65\x66\x49", "\x71\x64\x5F\x6A\x73\x69\x6E", "\x71\x64\x5F\x77\x73\x7A", "\x74", "\x5F\x5F\x6A\x73\x54", "\x6A\x66\x61\x6B\x6D\x6B\x61\x66\x6B\x6C\x77\x32\x33\x33\x32\x31\x66\x34\x65\x61\x33\x32\x34\x35\x39", "\x5F\x5F\x63\x6C\x69\x54", "\x68\x35", "\x5F\x5F\x73\x69\x67\x43", "\x5F\x5F\x63\x74\x6D\x4D"];


        function weorjjigh(_27, _66) {
            if (_47(_0[0])) {
                native_java_obj = {}
            }
            ;
            var _7 = [];
            _9(_7, 44);
            _9(_7, 2 * 5);
            _9(_7, 0 - 2);
            _9(_7, -1 * 2);
            _9(_7, -25);
            _9(_7, 5 * -11);
            _9(_7, 40);
            _9(_7, -16);
            _9(_7, 51);
            _9(_7, -4);
            _7[_0[1]]([44, -38, 43, -53, -8]);
            h5vd_detective_url = true;
            function _9(_57, _55) {
                _57[_0[2]](_55)
            }
            ;
            var _33 = function (_16) {
                return btoa(_16)
            };
            var _2 = function (_16) {
                return atob(_16)
            };

            function _53(_59) {
                return (String[_0[3]](_59))
            }
            ;
            var _63 = function () {
                if (typeof Q != _0[4] && (typeof Q[_0[5]] != _0[4])) {
                    _22 = _0[6];
                    var _43 = _58(_67);
                    for (var _1 = _43[_0[7]] - 1; _1 >= 0; _1--) {
                        _22 += _43[_0[8]](_1)
                    }
                }
            };

            function _58(_37) {
                var _5 = new Array(2), _8 = _0[6], _1;
                var _28 = _36(_46, 4);
                var _31 = _46;
                for (_1 = 0; _1 < _37[_0[7]]; _1 += 8) {
                    _5[0] = _36(_37, _1);
                    _5[1] = _36(_37, _1 + 4);
                    _60(_5, _31, _28);
                    _8 += _44(_5[0]) + _44(_5[1])
                }
                ;
                if (_8[_0[10]](_0[9]) != -1) {
                    _8 = _8[_0[11]](0, _8[_0[10]](_0[9]))
                }
                ;
                return _8
            }
            ;
            function _60(_5, _31, _28) {
                var _12 = _5[0], _23 = _5[1];
                var _19 = _28 * 32;
                while (_19 != 0) {
                    _23 -= (_12 << 4 ^ _12 >>> 5) + _12 ^ _19 + _31[_19 >>> 11 & 3];
                    _19 -= _28;
                    _12 -= (_23 << 4 ^ _23 >>> 5) + _23 ^ _19 + _31[_19 & 3]
                }
                ;
                _5[0] = _12;
                _5[1] = _23
            }
            ;
            function _36(_8, _34) {
                return (((_8[_34]) + (_8[_34 + 1] << 8) + (_8[_34 + 2] << 16) + (_8[_34 + 3] << 24)) >>> 0)
            }
            ;
            function _44(_5) {
                var _8 = String[_0[3]](_5 & 0xFF, _5 >> 8 & 0xFF, _5 >> 16 & 0xFF, _5 >> 24 & 0xFF);
                return (_8)
            }
            ;
            var _15 = screen[_0[12]];
            if (window[_0[13]] === 90 || window[_0[13]] === -90) {
                _15 = _15 > screen[_0[14]] ? screen[_0[14]] : _15
            }
            ;
            var _30 = window[_0[15]];
            _15 = Math[_0[16]](_15 / _30);
            var _38 = Math[_0[16]](window[_0[17]] / _30);
            var _45 = Math[_0[16]](window[_0[18]] / _30);
            var _64 = (_15 - _45 - _38);
            var _69 = { hmxt: _15 + _0[19] + _38 + _0[19] + _45 + _0[19] + _30 };
            var _51 = btoa(_38 + _0[19] + _64);
            if (typeof ucweb != _0[4]) {
                if (window[_0[22]][_0[21]](_0[20])) {
                    window[_0[22]][_0[23]](_0[20])
                }
                ;
                if (!window[_0[22]][_0[21]](_0[24])) {
                    window[_0[22]][_0[25]](_0[24], 1)
                }
            }
            ;
            var _24 = _0[6];
            var _42 = document[_0[26]];
            if (!(_42 && (_42[_0[10]](_0[27]) >= 0))) {
                _24 += (typeof ucweb != _0[4]) ? (_33(_0[28])) : _0[6]
            }
            ;
            _24 += _47(_0[29]) ? ((_24 ? _0[19] : _0[6]) + _33(_0[30])) : _0[6];
            var _46 = [12, 32, 434, 12, 185, 121, 55, 158, 34, 82, 133, 37, 61, 24, 151];
            var _22 = _0[31];
            var _67 = [89, 119, 254, 217, 160, 171, 103, 121, 19, 63, 65, 172, 153, 235, 187, 90, 160, 147, 163, 215, 21, 75, 44, 78, 206, 92, 26, 115, 138, 74, 14, 75, 212, 62, 102, 102, 69, 250, 56, 73, 121, 191, 168, 177, 228, 30, 122, 252, 21, 175, 15, 7, 105, 52, 6, 33, 254, 72, 43, 204, 149, 27, 81, 250];
            var _40 = _0[32];
            var _25 = [];
            for (var _1 = 0; _1 < _7[_0[7]]; _1++) {
                if (_1 % 2 == 0) {
                    _25[_0[2]](_53(_7[_1] + _29))
                } else {
                    _25[_0[2]](_53(_7[_1] - _29))
                }
            }
            ;
            var _6 = (new Date())[_0[33]]();
            var _29 = 7;
            _9(_25, _6 - _29);
            var _39 = {};
            _39[_0[34]] = _33((_6 - _29) + _0[6]);
            _9(_25, _27);
            var _54 = function (_21) {
                var _48 = [], _1 = 0;
                for (; _1 < 64;) {
                    _48[_1] = 0 | (Math[_0[36]](Math[_0[35]](++_1)) * 4294967296)
                }
                ;
                function _20(_18, _12) {
                    return (((_18 >> 1) + (_12 >> 1)) << 1) + (_18 & 1) + (_12 & 1)
                }
                ;
                var _65 = function (_10, _62) {
                    _63();
                    _10 = (_2(_39[_0[34]])) + _2((_2(_22))[_0[37]](0, 12)) + _2(_2(_22)[_0[37]](12, 20)) + _2(_2(_22)[_0[37]](32)) + _27;
                    while (_10[_0[39]](0) == 0) {
                        _10 = _10[_0[38]](String[_0[3]](0), _0[6])
                    }
                    ;
                    if (_62) {
                        _10 = (_2(_39[_0[34]])) + _2((_2(_40))[_0[37]](0, 12)) + _2(_2(_2(_40)[_0[37]](12, 24))) + _2(_2(_2(_40)[_0[37]](36))) + _27
                    }
                    ;
                    var _11, _17, _6, _3, _18 = [], _52 = unescape(encodeURI(_10)), _4 = _52[_0[7]], _35 = [_11 = 1732584193, _17 = -271733879, ~_11, ~_17], _1 = 0;
                    for (; _1 <= _4;) {
                        _18[_1 >> 2] |= (_52[_0[39]](_1) || 128) << 8 * (_1++ % 4)
                    }
                    ;
                    _18[_10 = (_4 + 8 >> 6) * _21 + 14] = _4 * 8;
                    _1 = 0;
                    for (; _1 < _10; _1 += _21) {
                        _4 = _35, _3 = 0;
                        for (; _3 < 64;) {
                            _4 = [_6 = _4[3], _20(_11 = _4[1], (_6 = _20(_20(_4[0], [_11 & (_17 = _4[2]) | ~_11 & _6, _6 & _11 | ~_6 & _17, _11 ^ _17 ^ _6, _17 ^ (_11 | ~_6)][_4 = _3 >> 4]), _20(_48[_3], _18[[_3, 5 * _3 + 1, 3 * _3 + 5, 7 * _3][_4] % _21 + _1]))) << (_4 = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, _21, 23, 6, 10, 15, 21][4 * _4 + _3++ % 4]) | _6 >>> 32 - _4), _11, _17]
                        }
                        ;
                        for (_3 = 4; _3;) {
                            _35[--_3] = _20(_35[_3], _4[_3])
                        }
                    }
                    ;
                    _10 = _0[6];
                    for (; _3 < 32;) {
                        _10 += ((_35[_3 >> 3] >> ((1 ^ _3++ & 7) * 4)) & 15).toString(_21)
                    }
                    ;
                    return _10
                };
                return _65
            }(16);
            var _33 = function (_16) {
                return btoa(_16)
            };
            var _2 = function (_16) {
                return atob(_16)
            };
            var _50 = function () {
                var _68 = _0[40];
                var _41 = _0[41];
                if (_0[42] in document[_0[44]][_0[43]]) {
                    if (escape(navigator[_0[45]].toString()) === _68) {
                        _41 = _0[46]
                    } else {
                        _41 = _0[47]
                    }
                }
                ;
                return _41
            };
            if (_66) {
                var _14 = {};
                _14[_0[48]] = _54;
                _14[_0[49]] = _50;
                _14[_0[50]] = _6;
                return _14
            }
            ;
            var _49 = _54(_25[_0[51]](_0[6]));
            if (_49[_0[7]] > 4) {
                var _32 = _0[6];
                _32 += "http://m.iqiyi.com/v_19rrnznpyg.html" + _0[53] + window[_0[15]] + _0[54] + _6;
                _32 = encodeURIComponent(_32);
                var _13 = {};
                _13[_0[55]] = _0[56];
                _13[_0[57]] = _49;
                _13[_0[58]] = _32;
                if (_24) {
                    _13[_0[59]] = _24
                }
                ;
                if (_51) {
                    _13[_0[60]] = _51
                }
                ;
                _13[_0[61]] = _6 - 7;
                _13[_0[62]] = _50();
                return _13
            }
            ;
            function _47(_61) {
                return (typeof window[_61] != _0[4])
            }
        }

        function weorjjighly(_27) {
            var _14 = weorjjigh(_27, true);
            var _26 = {};
            var _56 = _0[63];
            _26[_0[64]] = _0[65];
            _26[_0[66]] = _14[_0[48]](_56, true);
            _26[_0[67]] = _14[_0[50]] - 7;
            _26[_0[62]] = _14[_0[49]]();
            return _26
        }

        $.ajax({
            url: videoApi,
            data: {
                op: 'GetVideoSrc',
                vurl: $(target).attr('data-src')
            },
            dataType: 'jsonp',
            success: function (data) {
                var ids = data.Value.split(',');
                var resourceUrl = "http://cache.m.iqiyi.com/jp/tmts/" + ids[0] + "/" + ids[1] + "/?uid=2086712094&platForm=h5&type=mp4";
                var decry = weorjjigh(ids[0]);
                resourceUrl += "&src=" + decry.src + "&sc=" + decry.sc + "&t=" + decry.t;
                $.ajax({
                    url: videoApi,
                    data: {
                        op: 'GetVideoSrc',
                        vurl: resourceUrl
                    },
                    dataType: 'jsonp',
                    success: function (data1) {
                        var mheight = document.body.clientWidth * (9 / 16) + "px",
                            mwidth = (document.body.clientWidth - 32) + "px",
                            videoImage = data1.Value.split(',')[0],
                            videoUrl = data1.Value.split(',')[1] || data1.Value.split(',')[0];
                        videoRenderModel(target, $("<video preload='none' poster='" + videoImage + "' width='" + mwidth + "' height='" + mheight + "' controls='controls'><source src='" + videoUrl + "'type='video/mp4' >暂不支持此视频</source></video>"));
                    }
                });
            },
            error: function (error, stat) {
                console.log(error);
            }
        });
    }

    function toCode(str, length) {
        var str = str || '0',
            length = length || 16; //最大长度16位
        var num = 0;
        for (var i = 0; i < str.length; i++) {
            num += str.charCodeAt(i) * i;
        }
        return num.toString(16).substr(0, length);
    }

    function ccTalkVideo(target){
        var src=$(target).attr('data-src');
        id=src.match(/eventid=([^&=]+)/)[1];
        $(target).replaceWith('<iframe src="http://www.cctalk.com/CourseDetail/OcsPlayer/?eventid='+id+'" width="100%" height="250" style="border:0"></iframe>');
    }

    $.extend($.fn,{
        videoPlayer:function(){

            this.each(function(){
                var that=this,
                    src = $(this).attr('data-src'),
                    flashvars = $(this).attr('data-flashvars');
                if (src.indexOf("tudou") > -1) {
                    tudou(this);
                } else if (src.indexOf("youku") > -1) {
                    youku(this);
                } else if (src.indexOf("yinyuetai") > -1) {
                    yinyuetai(this);
                } else if (src.indexOf("qiyi.com") > -1) {
                    aiqiyi(this);
                } else {
                    if(src.indexOf("hjfile.cn") > -1){
                        ccTalkVideo(this);
                        return ;
                    }
                    $.ajax({
                        url: 'http://api.site.hujiang.com/Web/Video.ashx',
                        jsonpCallback: 'getvideocallback' + toCode(src + flashvars, 16),
                        data: { op: 'GetVideoSrc', vurl: src, flashvars: flashvars },
                        dataType: 'jsonp',
                        success: function (ret) {
                            if (ret.Code == 0 && ret.Value != '') {
                                $(that).replaceWith('<video preload=\"none\" controls="controls" style="margin:0 auto;width:300px;height:225px;background-color:black;" src="' + ret.Value + '" ></video>');
                            } else {
                                $(that).text('暂不支持此视频').css('height', '20px');
                            }
                        }
                    });
                }
            });
        }
    });
}());