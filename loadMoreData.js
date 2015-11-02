$.extend($,{
    //载入更多内容
    loadMoreData: function (options) {
        var defaultSetting = {
                loading: '.loading',
                padding: 200,
                url: '',
                loadFirstPage: false,
                data: {
                    start: 1,
                    limit: 10,
                    pageType:1
                },
                success: function () { },
                error: null
            },
            opt = $.extend(true, defaultSetting, options),
            isRetina = $.isRetina(),
            windowHeight = $(window).height(),
            loading = false,
            uniqID = $.uniqID(),
            curPage = opt.data.start;

        function loadData() {
            opt.data.start=curPage;
            var data = {
                url: opt.url,
                type: 'get',
                contentBox:'',
                data: opt.data,
                success: function (d) {
                    var hasMore = true;
                    if (!d || Math.ceil(d.totalCount / opt.data.limit) <= curPage) {
                        $(window).off('scroll.' + uniqID);
                        hasMore = false;
                    }
                    curPage += 1;
                    loading = false;
                    opt.success(d, hasMore);
                },
                error: function (d) {
                    opt.error && opt.error(d);
                    $(window).off('scroll.' + uniqID);
                },
                loading: opt.loading
            };
            $.sync(data);
        }

        if (opt.loadFirstPage) {
            loading = true;
            loadData();
        }
        $(window).on('scroll.' + uniqID, function () {
            var offset = document.body.scrollTop;
            if (offset + windowHeight+opt.padding > $content.height() && !loading) {
                loading = true;
                loadData();
            }
        });
        return {
            destory: function () {
                $(window).off('scroll.' + uniqID);
            }
        };
    }
})