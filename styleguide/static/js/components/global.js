require(['jquery-1.9', 'placeholder'], function($, placeholder) {
	'use strict';
	
	// Removes no-js class from the HTML tag when Javascript loads
	$('html').removeClass('no-js');

    // Adds a class of is-loaded to all images once they have loaded.
    $('img').addClass('is-loaded');

    window.onload = function() {
  		$('.hero__background').addClass('is-loaded');
	};

    $('.dropdown__button').on('click', function(event) {
        event.preventDefault();
    });

    $('.mq-output').text($( window ).width() + 'px');

    $(window).resize(function() {
        $('.mq-output').text($( window ).width() + 'px');
    });

    $('.search__input').placeholder();

    $('.js-scrollto').on('click', function (e) {
        var targetSection = $(this).attr('href');
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $(targetSection).offset().top
        }, 700);
        $(targetSection).focus();
    });

    $('.card__button--request__cta').on('click', function(e) {
        e.preventDefault();
        $(this).parent().find('.card__button__shelf').addClass('open');
    });

    $('.close-x').on('click', function() {
        $(this).parent().removeClass('open');
    });

});