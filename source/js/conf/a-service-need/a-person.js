define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');

    //console.log('接受成功');
    eval($('.jNum').text()) > 0 ? $('.jNum').css({'display':'block'}) : $('.jNum').css({'display':'none'});
    
});