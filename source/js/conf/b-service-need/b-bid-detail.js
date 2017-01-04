define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');

    var url = $PAGE_DATA['infoDetails'];
    var success = $PAGE_DATA['success'];
    // var no = www.baidu.com;
    var jBid = $('#jBid');
    var txt = $('.jTxt');


jBid.on('click', function(){
   
   if(txt.val() == ''){
        box.warn('内容不能为空');
   }else{
    submit();
   }
})
    function submit(){
        io.post(url,{
           content:txt.val()
        },function(data) {
            console.log(data);
           if(data.error == '0'){
            window.location.href = success
           }else{
            box.warn('网络错误');
           }
        });
    }
});
   
