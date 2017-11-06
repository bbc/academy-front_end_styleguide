require(['jquery-1.9'], function($) {
	'use strict';

	var respondMenu = {

		windowWidth: $(window).width(),

		init: function () {
			if(respondMenu.windowWidth > 767){
	            respondMenu.navigationResize();
	        }
	        $(window).resize(function() {
	            var width = $(document).width();
	            if (width > 767){
	                respondMenu.navigationResize();
	            }
	        });

	        $('.more').focus( function () {
				$('#overflow').css({
					'opacity': '1',
					'visibility': 'visible'
				});
			});

			$('#overflow').find('.movedLi:last-of-type').focusout( function () {
				$(this).parent().hide().removeAttr('style');
			});
		},

		navigationResize: function () {
			$('#nav li.more').before($('#overflow > li'));
  
			var $navItemMore = $('#nav > li.more'),
				$navItems = $('#nav > li:not(.more)'),
				$overflowItems = $('.movedLi'),
				navItemWidth = $navItemMore.width(),
				navItemMoreWidth = $navItemMore.width(),
				nav = $('.nav').width(),
				navItemMoreLeft, offset, navOverflowWidth;

			$navItems.each(function() {
				navItemWidth += $(this).width();
			});

			navItemWidth > nav ? $navItemMore.show() : $navItemMore.hide();

			while (navItemWidth > nav) {
				navItemWidth -= $navItems.last().width();
				$navItems.last().prependTo('#overflow').addClass('movedLi');
				$navItems.splice(-1,1);
			}

			navItemMoreLeft = $('#nav .more').offset().left;
			navOverflowWidth = $('#overflow').width();  
			offset = navItemMoreLeft + navItemMoreWidth - navOverflowWidth;
	    }
	};

	//respondMenu.init();

	return respondMenu;

});