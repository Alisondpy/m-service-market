define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var jTouch = $('.jTouch');
    var jBid = $('.jBid');

    jTouch.on('click', function() {
    	box.confirm('联系方式')
    });
   

});