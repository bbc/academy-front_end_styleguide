require(['jquery-1.9'], function($) {
	'use strict';

	var mobileMenu = {

		el: {
            $header: $('.header'),
            $nav: $('.nav'),
            $mButton: $('.nav__menu-btn')
        },
        menuOpenClass: 'menu-open',
        searchOpenClass: 'search-open',

		init: function () {
			mobileMenu.menuTouch();
		},

		menuTouch: function () {
			mobileMenu.el.$mButton.on('click', function(event) {
	            event.preventDefault();
	        	mobileMenu.el.$header.toggleClass(mobileMenu.menuOpenClass).removeClass(mobileMenu.searchOpenClass);
	        	mobileMenu.el.$nav.toggleClass(mobileMenu.menuOpenClass);
	        });
		}
	};

	mobileMenu.init();

	return mobileMenu;

});