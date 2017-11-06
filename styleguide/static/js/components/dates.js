require( [ 'jquery-1.9' ], function( $ ) {
	'use strict';

	var courseDates = {

		el: {
			$carousel: $('.js-setdates'),
			$card: $('.dates__card')
        },

		init: function() {
			if ( courseDates.el.$carousel.length ) {
				courseDates.setSpaces();
			}
		},

		setSpaces: function() {
			courseDates.el.$carousel.each(function () {
				var dateCards = $(this).find(courseDates.el.$card);

				dateCards.each(function () {
					var taken = $(this).find('#seatsTaken').html(),
						total = $(this).find('#seatsTotal').html(),
						percent = Math.floor((taken / total) * 100),
						indicator = $(this).find('.dates__spaces__indicator');

					indicator.width(percent + '%');
				});
			});
		}
	};

	courseDates.init();

	return courseDates;

} );