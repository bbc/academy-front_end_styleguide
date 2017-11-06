require(['jquery-1.9'], function($) {
	'use strict';

	var mobileSearch = {

		el: {
			$headerSearch: $('#search01'),
            $header: $('.header'),
            $input: $('#search01').find('.search__input'),
            $button: $('#search01').find('.search__button'),
            $closeButton: $('#search01').find('.search__button--close')
        },
        searchOpenClass: 'search-open',
        searchButtonClicked: false,
        windowWidth: $(window).width(),	

		init: function () {
			if(mobileSearch.windowWidth <= 768){
            	mobileSearch.mobile();
	        }else if(mobileSearch.windowWidth > 768){
	            mobileSearch.desktop();
	        }
	        $(window).resize(function() {
	            var width = $(document).width();
	            if (width <= 768) {
	                mobileSearch.mobile();
	            }else if(width > 768){
	                mobileSearch.desktop();
	            }
	        });
		},

		mobile: function () {
		    mobileSearch.el.$button.on('click', function(event) {
		        if (mobileSearch.el.$header.hasClass(mobileSearch.searchOpenClass)) {
		            mobileSearch.searchButtonClicked = true;
		            return;
		        } else {
		            event.preventDefault();
		            mobileSearch.el.$header.addClass(mobileSearch.searchOpenClass);
		            mobileSearch.el.$input.focus();
		            mobileSearch.assignInputBlur();
		            mobileSearch.closeSearch();
		            $('.search__button--clear').removeClass('active');
		        }
		    });
		},

		desktop: function () {
			mobileSearch.el.$header.removeClass(mobileSearch.searchOpenClass);
			mobileSearch.searchButtonClicked = true;

            mobileSearch.el.$button.unbind('click').on('click', function() {
                if (mobileSearch.el.$header.hasClass(mobileSearch.searchOpenClass)) {
                    return true;
                }
            });
        },

        assignInputBlur: function () {
            mobileSearch.el.$input.on('blur', function() {
                setTimeout(function() {
                    if (mobileSearch.el.$header.hasClass(mobileSearch.searchOpenClass) && mobileSearch.searchButtonClicked == false) {
                        mobileSearch.el.$header.removeClass(mobileSearch.searchOpenClass);
                        mobileSearch.el.$input.val('');
                        $('.search__button--clear').removeClass('active');
                    }
                }, 200);
            });
        },

        closeSearch: function () {
            mobileSearch.el.$closeButton.on('click', function() {
                mobileSearch.el.$header.removeClass(mobileSearch.searchOpenClass);
                mobileSearch.el.$input.val('');
                $('.search__button--clear').removeClass('active');
            });
        }
	};

	mobileSearch.init();

	return mobileSearch;

});