define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Slider = require('lib/ui/slider/3.0.4/slider');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var IScroll = require('lib/plugins/iscroll/1.0.0/iscroll-probe');
    var FixNav = require('../module/fix-nav/fix-nav');

	var jScrollList = $('#jScrollList li');
    $('#jScrollCnt').width(jScrollList.length*jScrollList.width());



    var fixNav = new FixNav({
        items: [{
            href: $PAGE_DATA['getIndex'],
            title: '首页',
            iconClass: 'isema isema-home'
        }, {
            href: $PAGE_DATA['getPublishDemand'],
            title: '发布需求',
            iconClass: 'isema isema-publish'
        }, {
            href: '',
            title: '个人中心',
            iconClass: 'isema isema-admin'
        }]
    });

    fixNav.show();

    
	var myScroll = new IScroll('#jScroll', { 
		scrollX: true, 
		scrollY: false, 
        click: true,
        probeType: 3
	});

    var scrollImgLazy = new Lazyload($('#jScrollList .jScrollImg'), {
        mouseWheel: true,
        effect: 'fadeIn'
    });

    myScroll.on('scroll',function(){
        scrollImgLazy.update();
    });

    //slider
    var slider = new Slider('.jSlider', {
        lazyLoad: {
            loadingClass: 'img-error'
        },
        play: {
            auto: true,
            interval: 4000,
            swap: true,
            pauseOnHover: true,
            restartDelay: 2500
        },
        callback: {
            start: function(index) {},
            loaded: function() {}
        }
    });

    

    //image-lazyload 
    var lazy = new Lazyload($('.jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });

        //image-lazyload



  
});

	