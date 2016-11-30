define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    // var Slider = require('lib/ui/slider/3.0.4/slider');
    // var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var PullToRefresh = require('plugins/pull-to-refresh/1.0.0/pull-to-refresh');
    var io = require('lib/core/1.0.0/io/request');
    //自定义事件

    var jAppend = $(".jAppend");
    var currentpage = 1;
    var ispull = false;
    var ispage = false;
    	var pullRefresh = new PullToRefresh('#jWrapper',{
    		pullDown:{
    			enable:false
    		}
    	});

    	
		var loadingBox
    	pullRefresh.on('pullUp',function(callback){
    		if(ispage == true){
    			currentpage = currentpage;
    		}else{
    			currentpage++;
    		}
	        ispull = true;
	        backstage(callback, currentpage);
    	});

    	function backstage(callback,currentpage){
    		io.get($PAGE_DATA['getDemandList'] ,{page:currentpage},function(data){
	    			if(data.data) {
	                var data = data.data.rows;
	                var str='';
	                console.log(currentpage);
	                for (var i = 0; i < data.length; i++) {
	                    str += getHalldata(data[i]);
	                }
	                if (data.error < 0) {
	                    box.warn('加载数据失败，再试下看看！');
	                } else {
	                    if (data.length == 0) {
	                        if(ispull) {
	                        	ispage = true;
	                            box.info('别拉了，没有更多数据了！');
	                        }else{
	                            jAppend.append('<p>暂无数据</p>');
	                        }
	                    } else {
	                        jAppend.append(str);
	                    }
	                }
	                callback && callback();
	                loadingBox.hide();
	            }else {
	                loadingBox.hide();
	                box.warn('服务器未响应');
	            }
    		},function(error){
    			loadingBox.hide();
            	box.warn('网络错误！');
    		})
    	}


        function getHalldata(data){
    	var str='';
    	str+='		<li class="main-con">';
    	str+='        <a href="'+$PAGE_DATA['demandDetailsUrl']+data.id+'>';
    	str+='			<div class="con-t">';
    	str+='				<i class="head"><img src="'+data.avatarUrl+'"></i>';
    	str+='				<span class="user">'+data.fromName+'</span>';
    	str+='				<strong class="price">'+data.showMoney+'</strong>';
    	str+='			</div>';

    	str+='			<div class="con-c">';
    	str+='				<div class="clearfix">';
    	str+='					<h3 class="title">'+data.title+'</h3>';
		    			 for (var j = 0; j < data.serviceTypes.length; j++) {
		                 str+= '<span class="soft"><i class="tool">'+data.serviceTypes[j].name+'</i></span>';	
		            }
    	str+='				</div>';
    	str+='				<p class="txt">'+data.detail+'</p>'
    	str+='				<div class="con-f">';
    	str+='					<i class="info"><em class="num">'+data.dockingCount+'</em>个标</i>';
    	str+='					<span class="time">'+data.expireTime+'</span>';
    	str+='				</div>';
    	str+='			</div>';
    	str+=' 		 </a>';
    	str+='		</li>';
    	return str;
    }
   
});


