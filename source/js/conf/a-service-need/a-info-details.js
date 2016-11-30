define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');
    var jAcceptBid = $('#jAcceptBid');
    var jDone = $('#jDone');
    var jNotYet = $('#jNotYet');

    jAcceptBid.tap(function () {
    	box.alert('投标接受成功，服务商尽快和您联系');

    })
    jDone.tap(function () {
        box.alert('完成对接');
    })
    jNotYet.tap(function () {
        box.alert('未对接完成');
    })

    var box1 = box.create({
        content: '<div style="color:Red"><p>554545</p><p>dddd</p></div>',
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

    box1.show();


    /*io.get('url', {}, function(){
    	
    })*/
});