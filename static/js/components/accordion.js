require(['jquery-1.9'], function($) {
	'use strict';

	var accordion = {

		el: {
			$accordion: $('.accordion'),
			$link: $('.accordion__link'),
			$answer: $('.accordion__answer'),
			$class: 'show',
			$speed: 350
        },

		init: function () {
			if(accordion.el.$accordion.length > 0){
				accordion.clickAccordion();
				accordion.checkHash();
			}
		},

		clickAccordion: function () {
			accordion.el.$link.click(function(event) {
			  	event.preventDefault();
			  
			    var $this = $(this);

			    $this.toggleClass(accordion.el.$class);
			    $this.next().toggleClass(accordion.el.$class).focus();
			});
		},

		checkHash: function () {
			if(window.location.hash) {
				var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
				if (hash = 'Cancellation') {
					$('#faq6').addClass(accordion.el.$class);
					$('#faq6').next().addClass(accordion.el.$class).focus();
				}
			}
		}
	};

	accordion.init();

	return accordion;

});