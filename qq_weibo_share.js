$.extend($,{
    shareQQAddress:function(title,summary){
        return 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent('http://channel.hujiang.com/ch_click.aspx?ch_source=st_qq&page='+location.href)
            +'&showcount=0&summary='+encodeURIComponent(summary)+'&desc='+encodeURIComponent(summary)
            +'&title='+encodeURIComponent(title)+'&site='+encodeURIComponent('沪江社团')
            +'&pics='+encodeURIComponent('http://ms.hujiang.com/st/images/icon114.png')
    },
    shareWeiboAddress:function(title){
        var url=escape('http://channel.hujiang.com/ch_click.aspx?ch_source=st_weibo&amp;page='+location.href);
        return 'http://service.weibo.com/share/share.php?url='+url
            +'&type=icon&language=zh_cn&title='+encodeURIComponent(title+'（阅读原文：'+location.href+'，下载沪江手机客户端：http://hj.vc/vrjU3vJ）')
            +'&searchPic=http://ms.hujiang.com/st/images/icon114.png&style=simple'
    }
})
