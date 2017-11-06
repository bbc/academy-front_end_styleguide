require(['jquery-1.9'], function($) {
	'use strict';

	var mandMenu = {

		el: {
			$nav: $("#mandatoryNav")
        },

		init: function () {
			var stickyTop = mandMenu.el.$nav.offset().top;

	        $(window).scroll(function() {    
	            var scroll = $(window).scrollTop();

	            if (scroll >= stickyTop) {
	                mandMenu.el.$nav.addClass("sticky");
	            } else {
	                mandMenu.el.$nav.removeClass("sticky");
	            }
	        });

	        mandMenu.scrolltoSection();
		},

		scrolltoSection: function () {
			$('.list__nav').on('click', function (e) {
	            var targetSection = $(this).attr('href');
	            e.preventDefault();
	            $('html,body').animate({
	                scrollTop: $(targetSection).offset().top
	            }, 700);
	            $(targetSection).focus();
	        });
	    }
	};

	if( mandMenu.el.$nav.length ){
		mandMenu.init();
	}

	return mandMenu;

});


	