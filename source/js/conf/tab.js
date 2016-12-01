define(function(require, exports, module) {
	    'use strict';
    var $ = require('jquery');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');

  


    $('.one').click(function(){
		$(this).addClass('active').siblings().removeClass('active')
			$('.jTab1').css('display','block').find($('.jTab2').css('display','none'));
		})
	
    $('.two').click(function(){
    	$(this).addClass('active').siblings().removeClass('active');
			$('.jTab2').css('display','block').find($('.jTab1').css('display','none'));
    		 //image-lazyload 
            var lazy = new Lazyload($('.jImg'), {
                mouseWheel: true,
                effect: 'fadeIn',
                snap: true
            });
    })

     

    
    
});

