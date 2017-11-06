require(['jquery-1.9'], function($) {
	'use strict';

	var dropDown = {

		init: function () {
			if($(document).width() < 768){
	            dropDown.showDropdown();
	        }
	        $(window).resize(function() {
	            var width = $(document).width();
	            if (width < 768){
	                dropDown.showDropdown();
	            }
	        });

	        $('.js-dropdown').each( function () {
	        	$(this).find('.js-dropdown__button').focus( function () {
					$(this).next('.js-dropdown__options').show();
				});

				$(this).find('.js-dropdown__options').find('.js-dropdown__item:last-of-type').focusout( function () {
					$(this).parent().hide().removeAttr('style');
				});
	        });
		},

		showDropdown: function () {
	        $('.js-dropdown__item').on('click', function(){
	            $(this).find('.js-dropdown__options').show();
	        });
	        $('.js-dropdown__button').on('click', function(event){
	            event.preventDefault();
	        });
		    $('#orb-modules').on('click', function(event){
		        var $trigger = $('.js-dropdown__item');
		        if($trigger !== event.target && !$trigger.has(event.target).length){
		            $('.js-dropdown__options').hide();
		        }            
		    });
	    }
	};

	dropDown.init();

	return dropDown;

});