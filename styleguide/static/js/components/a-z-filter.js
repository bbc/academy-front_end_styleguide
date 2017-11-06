require(['jquery-1.9'], function($) {
	'use strict';

	var azFilter = {

		el: {
			$filter: $('.azfilter'),
			$button: $('.azfilter__button'),
			$active: $('active'),
			$disabled: $('disabled')
        },

		init: function () {
			if(azFilter.el.$filter.length > 0){
				azFilter.clickFilter();
			}
		},

		clickFilter: function () {
			azFilter.el.$button.on('click', function(event) {
				var thisID = $.attr(this, 'href');

				event.preventDefault();
				
			    $('html, body').animate({
			        scrollTop: $(thisID).offset().top
			    }, 300);
			    
			    $(thisID).focus();
			});
		}
	};

	azFilter.init();

	return azFilter;

});