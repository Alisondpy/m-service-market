define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var Io = require('lib/core/1.0.0/io/request');
    var url = $PAGE_DATA['viewContact'];
    var jTouch = $('.jTouch');
    var jBid = $('.jBid');
    var jInfo = $('#jContactInfo').val();
    console.log(jInfo);

     jTouch.tap(function(){
        Io.post(url, function(data) {
            if(data.error == '0'){
                alertbox.show();
            }
        });
    })
    var alertbox = box.create({
        content: '<div class="smallbox"><div class="title">联系方式 :</div><p class="content">'+jInfo+'</p></div>',
        className: 'ui-bubble',
        autofocus: false,
        autoRelease: false,
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
   
