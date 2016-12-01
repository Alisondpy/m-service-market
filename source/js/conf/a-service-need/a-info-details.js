define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Box = require('lib/ui/box/1.0.1/box');
    var Io = require('lib/core/1.0.0/io/request');
    var jAcceptBid = $('#jAcceptBid');
    var jDone = $('#jDone');

    //接受投标
    jAcceptBid.tap(function () {
        fnSubmit($PAGE_DATA['infoDetails'], '投标接受成功，服务商尽快和您联系')
    })

    //完成对接
    jDone.tap(function () {
        fnSubmit($PAGE_DATA['infoDetails'], '对接成功');
    })

    function fnSubmit(url, content) {
        Io.get(url, {}, function (res) {
            if(res.data.error == 0){
                var tips = Box.ok( content );
                        tips.on('hide',function(){
                        window.location.reload();
                    });
            }else{
                Box.warn(res.data.msg);
            }
        }, function (res) {
            Box.warn('网络错误');
        });
    }
});