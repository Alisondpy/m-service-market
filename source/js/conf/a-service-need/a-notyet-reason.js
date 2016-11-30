define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Box = require('lib/ui/box/1.0.1/box');
    var Io = require('lib/core/1.0.0/io/request');
    var Form = require('lib/core/1.0.0/utils/form');
    var txtarea = $('#jTxt');
    
    /*io.get('url', {}, function(){
    	
    })*/
    //var choiceStatus = {};
    /*--选择未完成原因--*/
    function ChoiceStatus(el){
        var _this = this;
        _this.el = $(el);
        _this.items = _this.el.find('.status');
        _this.value = null;
        _this.id = null;
        _this._initEvent();
    }
    ChoiceStatus.prototype._initEvent = function() {
        var _this = this;
        _this.items.on('tap',function(){
            var $this = $(this);
            _this.items.removeClass('active');
            $this.addClass('active');
            _this.id = $this.attr('data-id');
            _this.value = $this.text();
            if(_this.id==4){
                txtarea.removeAttr('disabled');
            }else {
                 txtarea.attr('disabled',true)
            }
            console.log(_this.value)
        });
    }
    ChoiceStatus.prototype.get = function(){
        var _this = this;
        console.log(_this.value)
        return _this.value;
    }
    var choice = new ChoiceStatus('#jForm');
    choice.get()

    $('#jSubmit').on('tap',function(){
        //Io.get()
        /*if(txtarea.val()!==''){
            console.log(123);
            io.jsonp('/m-service-market/source/api/publish-require/publish-require.json', { 'foo': 'foo text' }, function(res) {
                alert(res.msg + ' (code: ' + res.error + ')');
            }, this);
        }else{
            io.get('/m-service-market/source/api/publish-require/publish-require.json', { 'foo': 'foo text' }, function(res) {
                alert(res.msg + ' (code: ' + res.error + ')');
            }, this);
        }*/
        $(this).attr('class', 'ui-btn');
        $(this).val('正在等待确认...');
        $(this).attr('disabled', 'true');
        $(this).attr('readOnly', 'true');
        console.log(123);
    });
});