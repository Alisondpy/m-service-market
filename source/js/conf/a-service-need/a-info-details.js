define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');
    var form = require('lib/core/1.0.0/utils/form');

    $('#jAcceptBid').tap(function () {
    	box.alert('投标接受成功，服务商尽快和您联系');
    })
    /*io.get('url', {}, function(){
    	
    })*/
});