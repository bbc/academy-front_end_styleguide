require(['jquery-1.9'], function($) {
	'use strict';

	var toTop = {

		el: {
			$button: $('.back-to-top'),
			$buttonWrap: $('.back-to-top__wrapper')
        },

		init: function () {
			if(toTop.el.$button.length > 0){
				toTop.showButton();
			}
		},

		showButton: function () {
			var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    toTop.el.$buttonWrap.addClass('show');
                } else {
                    toTop.el.$buttonWrap.removeClass('show');
                }
            };
        	backToTop();
	        
	        $(window).on('scroll', function () {
	            backToTop();
	        });
	        
	        toTop.el.$button.on('click', function (e) {
	            e.preventDefault();
	            $('html,body').animate({
	                scrollTop: 0
	            }, 700);
	            $('#academy-content').focus();
	        });

		}
	};

	toTop.init();

	return toTop;

});