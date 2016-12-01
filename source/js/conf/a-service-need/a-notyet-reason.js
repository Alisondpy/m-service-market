define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Box = require('lib/ui/box/1.0.1/box');
    var Io = require('lib/core/1.0.0/io/request');
    var Form = require('lib/core/1.0.0/utils/form');
    var txtarea = $('#jTxt');
    var demandId = $('#jDemandId');
    var vendorId = $('#jVendorId');
    var istxt = false;
    /*--选择未完成原因--*/
    function ChoiceStatus(el){
        var _this = this;
        _this.el = $(el);
        _this.items = _this.el.find('.status');
        _this.value = null;
        _this._initEvent();
    }
    ChoiceStatus.prototype._initEvent = function() {
        var _this = this;
        _this.items.on('tap',function(){
            var $this = $(this);
            _this.items.removeClass('active');
            $this.addClass('active');
            _this.value = $this.attr('data-id');
            if($this.attr('data-type')===''){
                txtarea.removeAttr('disabled');
                istxt = true;
            }else {
                 txtarea.attr('disabled',true);
                 istxt = false;
            }
        });
    }
    ChoiceStatus.prototype.get = function(){
        var _this = this;
        return _this.value;
    }
    var choice = new ChoiceStatus('#jForm');

    /*--提交判断--*/
    $('#jSubmit').on('tap',function(){
        if(choice.get()===null) {
            Box.warn('请选择未完成原因');
            return ;
        }else if(istxt&&txtarea.val()!==''){
            if(txtarea.val().match(/^\s+$/)){
               Box.warn('内容不能为空');
           }else{
                postserver($PAGE_DATA['postInfo'],istxt?txtarea.val():choice.get());
           }
            return ;
        }else if(istxt&&txtarea.val()===''){
            Box.warn('内容不能为空');
            return ;
        }
        postserver($PAGE_DATA['postInfo'],istxt?txtarea.val():choice.get());
    });
    //封装传送数据函数
    function postserver(url, setvalue){
        Io.get( url, { 'reason': setvalue, 'demandId':demandId.val(),'vendorId': vendorId.val()}, function(res) {
            if(res.error < 0){
                Box.warn('加载数据失败，再试下看看！');
            }else {
                var tips = Box.ok('感谢您的反馈,缺地址。。');
                tips.on('hide',function(){
                    window.location.href = '／user/userCenter';
                });
            }
        }, function () {
            Box.warn('网络错误！');
        }, this);
    }
});