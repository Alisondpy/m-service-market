define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var IO = require('lib/core/1.0.0/io/request');
    var Box = require('lib/ui/box/1.0.1/box');
    var build = require('lib/core/1.0.0/dom/build');
    var PullToRefresh = require('plugins/pull-to-refresh/1.0.0/pull-to-refresh');

    var url = $PAGE_DATA['getPersonInfo'] ;
    var jIpt = $('#jIpt');
    var jStatus = $('#jTap .jStatus');
    var jCreatItem = $('#jCreatItem');
    var currentpage = 1;
    var ispull = false;
    //上拉加载实例化;
    var pullRefresh = new PullToRefresh('#jWrapper',{ 
        pullDown:{ enable :  false} 
    });
    
    var loadingBox = Box.loading('正在加载,请稍后...');
    pullRefresh.on('pullUp', function(callback) {
        currentpage++;
        ispull = true;
        creatPersonInfo(callback, currentpage);
    });

    //页面初始化;
    function pageInit() {
        if(jIpt.val()) {
            jStatus.eq(jIpt.val()).addClass('active').siblings().removeClass('active');
        }
        creatPersonInfo();
    }
    pageInit();

    //调用后台数据
    function creatPersonInfo(callback, currentpage) {
        var currentpage = typeof currentpage=='undefined' ? 1:currentpage;
        IO.get(url, {type:jIpt.val(), page:currentpage}, function (res) {
            if(res.data) {
                var data = res.data.rows;
                var str='';
                for (var i = 0; i < data.length; i++) {
                    str += creatItem(data[i]);
                }
                if (res.error < 0) {
                    Box.warn('加载数据失败，再试下看看！');
                } else {
                    if (data.length == 0) {
                        if(ispull) {
                            Box.info('别拉了，没有更多数据了！');
                        }else{
                            jCreatItem.append('<div class="ui-empty-list"><div class="isema isema-box"></div><div class="txt">我是文案</div></div>');
                        }
                    } else {
                        jCreatItem.append(str);
                    }
                }
                callback && callback();
                loadingBox.hide();
            }else {
                loadingBox.hide();
                Box.warn('服务器未响应');
            }
            
        },function(error){
            loadingBox.hide();
            Box.warn('网络错误！');
        })
    }

    //列表标签拼接
    function creatItem(data) {
        var str='';
            str+='<li class="item">';
            str+=    '<a href="'+$PAGE_DATA['toMyDemandDetail']+data.id+'">';
            str+=        '<div class="top">';
            for (var j = 0; j < data.serviceTypes.length; j++) {
                 str+= '<span class="f-l"><i class="tool">'+data.serviceTypes[j].name+'</i></span>';
            }
           
            str+=            '<span class="price f-r">'+data.showMoney+'</span>';
            str+=        '</div>';
            if(data.unReadCount>0){
                 str+= '<h3 class="title txt-overflow"><i class="tip active"></i>'+data.title+'</h3>';
            }else {
                 str+= '<h3 class="title txt-overflow"><i class="tip"></i>'+data.title+'</h3>';
            }
            str+=        '<div class="describe">';
            str+=            '<p class="p">'+data.detail+'</p>';
            str+=        '</div>';
            str+=        '<div class="bottom">';
            str+=            '<span class="bid f-l"><i class="bid-number">'+data.dockingCount+'</i>个投标</span>';
            str+=            '<span class="status f-r">'+data.demandStatus+'</span>';
            str+=        '</div>';
            str+=    '</a>';
            str+='</li>';
        return str;
    }

});