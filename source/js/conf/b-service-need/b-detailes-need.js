define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var jTouch = $('.jTouch');
    var jBid = $('.jBid');

     jTouch.tap(function(){
        alertbox.show();
    })
    var alertbox = box.create({
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
   
