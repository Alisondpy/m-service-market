define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');

    var url = $PAGE_DATA['infoDetails'];
    var jBid = $('#jBid');
    var txt = $('.txt').val();


     function init(){
        submit();
     }
     init();

jBid.on('click', '.selector', function(event) {
    event.preventDefault();
    /* Act on the event */
});
    function submit(){
        io.post(url,{
            id:

        },function(data) {
               if(error == 0){
                window.loaction.href="b-public-success.html"
               }
        });
    }
});
   
