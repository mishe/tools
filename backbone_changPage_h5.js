$.extend($,{
    changePage: function (hash_path,replace) {
        backbone.router.navigate(hash_path, {trigger:true,replace:replace});
    }
})