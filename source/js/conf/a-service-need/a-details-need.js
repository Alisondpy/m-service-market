define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Box = require('lib/ui/box/1.0.1/box');
    var Io = require('lib/core/1.0.0/io/request');
    var jConcat = $('#jConcat');//联系人点击按钮
    var jDel = $('#jDel');//修改按钮


    //删除需求按钮
    jDel.tap(function () {
           Box.confirm('您将要删除您的需求，删除后将无法找回',
            function() {
                Io.get(url, {id:id}, function(res){
                    if(res.data.error < 0){
                        //Box.warn('加载数据失败，再试下看看！');
                        Box.warn(res.data.msg);
                    }else{
                        window.location.href = res.data.url;
                    }
                }, function () {
                    Box.warn('网络错误');
                })
                //Box.tips('删除成功');
            },
            function() {
                Box.tips('取消成功');
            }
        );
    })
    //
    jConcat.tap(function(){
        Box.alert('联系方式:');
    })
});