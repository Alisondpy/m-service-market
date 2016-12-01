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
                removeNeed($PAGE_DATA['detailsNeed']);
            },
            function() {
                Box.tips('取消成功');
            }
        );
    })

    function removeNeed(url){
        Io.get( url, {}, function(res) {
            if(res.error < 0){
                Box.warn('加载数据失败，再试下看看！');
                //Box.warn(res.data.msg);
            }else {
                var tips = Box.ok('删除成功');
                        tips.on('hide',function(){
                            window.location.reload();
                        });
            }
        }, function () {
            Box.warn('网络错误！');
        }, this);
    }
    //查看联系方式
    jConcat.tap(function(){
        alertbox.show();
    })
    var alertbox = Box.create({
        content: '<div class="smallbox"><div class="title">联系方式 :</div><p class="content">0571-1234567</p></div>',
        className: 'ui-bubble',
        autofocus: false,
        autoRelease: true,
        close: false,
        xtype: 'none',
        align: 'top',
        duration: 0,
        button:[
            { text: '知道了', fn: function(e) { } }
        ],
        hideWithAni: 'fadeOut',
        showWithAni: 'fadeInUp'  
    });
});