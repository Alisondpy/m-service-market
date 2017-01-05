/**
 * Created by admin on 2016/11/21 0021.
 */
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');
    var form = require('lib/core/1.0.0/utils/form');

    /*交互效果*/
    //分类
    var label = $('#jClassify label');
    var categorys = $('#jClassify input[name="categorys"]');
    var classifyArr = categorys.val().split(",");
    for(var i=0; i < classifyArr.length; i++){
        label.each(function(){
            if($(this).attr('data-value') == classifyArr[i]){
                $(this).addClass('checked');
            }
        });
    }

    function getClassify(){
        var classify = ''
        label.each(function(){
            if($(this).hasClass('checked')){
                var val = $(this).attr('data-value');
                classify = classify+val+',';
            }
        });
        classify = classify.substring(0,classify.length-1);
        return classify;
    };

    $('#jClassify').on('tap','label',function(e) {
        if($(e.target).hasClass('checked')){
            $(e.target).removeClass('checked');
            categorys.val(getClassify());
        }else {
            var num = 0;
            label.each(function(){
                if($(this).hasClass('checked')){
                    num = num+1;
                };
            });
            if(num < 2){
                $(e.target).addClass('checked');
                categorys.val(getClassify());
            }else {
                box.warn('最多只能选择2个分类');
            }
        }
    });

    //报价
    var postBudget = $('.jRequired input[name="postBudget"]');
    var preBudget = $('.jRequired input[name="preBudget"]');
    function quote(){
        if(postBudget.val() === '0'){
            $('.jLabel').each(function(){
                if($(this).attr('data-value') === '1'){
                    $(this).addClass('current').siblings().removeClass('current');
                }
            });
        }else if(preBudget.val() === '-1'){
            $('.jLabel').each(function(){
                if($(this).attr('data-value') === '2'){
                    $(this).addClass('current').siblings().removeClass('current');
                }
            });
        }else {
            $('.jLabel').each(function(){
                if($(this).attr('data-value') === '0'){
                    $(this).addClass('current').siblings().removeClass('current');
                }
            });
        }
    };
    quote();
    var hasPrice = $('.jPrice').children().clone();
    var hasPriceVal = $('.jPrice').children().attr('data-value');
    $('.jLabel').on('tap',function(){
        $(this).addClass('current').siblings().removeClass('current');
        var val = $(this).attr('data-value');
        switch (val)
        {
            case '0':
                $('.jPrice').empty();
                if(hasPriceVal === val){
                    $('.jPrice').append(hasPrice);
                }else {
                    $('.jPrice').append('<div class="jPrice0" data-value="0">'
                        +'<input type="number" name="postBudget" step="0.001" placeholder="0.00"><label class="unit">元</label>'
                        +'<span>至</span>'
                        +'<input type="number" name="preBudget" step="0.001" placeholder="0.01"><label class="unit">元</label>'
                        +'</div>');
                };
                break;
            case '1':
                $('.jPrice').empty();
                if(hasPriceVal === val){
                    $('.jPrice').append(hasPrice);
                }else {
                    $('.jPrice').append('<div class="jPrice1" data-value="1">'
                        +'<input type="number" name="preBudget" step="0.001" placeholder="0.00"><label class="unit">元</label>'
                        +'<input type="hidden" name="postBudget" value="0">'
                        +'</div>');
                };
                break;
            case '2':
                $('.jPrice').empty();
                if(hasPriceVal === val){
                    $('.jPrice').append(hasPrice);
                }else {
                    $('.jPrice').append('<div class="jPrice2" data-value="2">'
                        +'<b style="font-weight: normal;">价格以面议为准</b>'
                        +'<input type="hidden" name="preBudget" value="-1">'
                        +'</div>');
                };
                break;
        };
    });

    //需求截止时间
    var date = new Date().getFullYear()+"年"+(new Date().getMonth()+1)+"月"+new Date().getDate()+"日";
    if($('.date .day').text() === ''){
        $('.date .day').text(date);
        $('#jHideDate').val(date);
    }else {
        var dates = $('.date .day').text().split('-');
        date = dates[0]+"年"+dates[1]+"月"+dates[2].split(' ')[0]+"日";
        $('.date .day').text(date);
        $('#jHideDate').val(date);
    }
    $('#jDate').on('change',function(){
        date = $(this).val().replace("-","年").replace("-","月")+"日";
        $('.date .day').text(date);
        $('#jHideDate').val(date);
    });

    //验证必填项
    function validation(){
        var message = '';
        var title = $('.jRequired input[name="title"]').val();
        var classify = $('.jRequired input[name="categorys"]').val();
        var description = $('.jRequired textarea[name="detail"]').val();
        var start = $('.jRequired input[name="postBudget"]').val();//0 是一口价
        var end = $('.jRequired input[name="preBudget"]').val();//判断报价形式 -1是面议
        var contact = $('.jRequired input[name="contact"]').val();
        var contactInfo = $('.jRequired input[name="contactInfo"]').val();

        if(title === ''){
            message = '请完善标题';
        }else if(classify === ''){
            message = '请选择分类';
        }else if(description === ''){
            message = '请完善描述';
        }else if(start !== '0' && (start === '' || end === '')){
            message = '请完善预算';
        }else if(start === '0' && end === ''){
            message = '请完善一口价';
        }else if(end !== '-1' && (start < 0 || end < 0)){
            message = '价格大于等于0且不能超过2位小数';
        }else if(end !== '-1' && (end <= start)){
            message = '请输入正确的预算区间';
        }else if(contact === ''){
            message = '请完善联系人';
        }else if(contactInfo === ''){
            message = '请完善联系方式';
        }else{
            try{
                if(start.split(".")[1].length > 2){
                    message = '价格大于等于0且不能超过2位小数';
                }
            }catch (e){}
            try{
                if(end.split(".")[1].length > 2){
                    message = '价格大于等于0且不能超过2位小数';
                }
            }catch (e){}
        }
        return message;
    };

    $('.jRequired').find('.list').on('tap',function(){
        if(validation() === ''){
            $('input[type="button"]').addClass('submit');
        }else {
            $('input[type="button"]').removeClass('submit');
        }
    });

    $('.jRequired').on('keyup','input[type="number"],input[type="text"],#jDescription',function(){
        if(validation() == ''){
            $('input[type="button"]').addClass('submit');
        }else {
            $('input[type="button"]').removeClass('submit');
        }
    });

    /*数据模拟*/
    //提交表单
    $('input[type="button"]').on('tap',function(){
        var isSubmit = true;
        var message = validation();
        if(message != ''){
            isSubmit = false;
            box.warn(message);
        }
        var formData = form.serializeForm($('#jForm'));
        if(isSubmit){
            $.ajax(
                {
                    "url":$PAGE_DATA['postFrom'],
                    "type":"post",
                    "dataType":"json",
                    "data":formData,
                    "success":function(data){
                        if(data.apiResult.message !== "发布成功！"){
                            box.tips(data.apiResult.msg);
                            window.location.href = $PAGE_DATA['publishSuccess'];
                        }else {
                            box.error(data.apiResult.msg);
                        }
                    },
                    "error":function(data){

                    }
                }
            );
        }
    });
});
