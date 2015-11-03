/*
* 支持2种排版，按钮在上的用户输入模式，及按钮在下的用户选择模式
*
*   toDO:第三种模式，关闭按钮在右上角的tip模式
*
 */


var template=require('./popWindow.html');
require('./popWindow.css');
template= _.template(template);
$.extend($,{
    popWindow:function(options){
        var defaultOptions={
                title:'',
                content:'',
                yes:'确认',
                no:'',
                uniqID:$.uniqID(),
                type:1,
                callback: $.noop()
            },
            opt={},
            win;
        opt= $.extend(defaultOptions,options);
        if(opt.type==1) opt.no=opt.no||'取消';
        win=$(template(opt));
        $('body').append(win);
        win.on('tap','.yes_btn,.no_btn',function(){
            var pos=false;
            if($(this).hasClass('yes_btn')){
                pos=true
            }
            if($.type(opt.callback)=='function'){
                if(opt.callback(pos)!==false){
                    win.remove();
                }
            }else{
                win.remove();
            }
        });
    }
});
