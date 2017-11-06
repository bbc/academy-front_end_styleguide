require( [ 'jquery-1.9' ], function( $ ) {
	'use strict';

	var languageSelector = {

		el: {
			$dropdown: $('.language__dropdown'),
			$link: $('.language__selector__link'),
			$closeDropdown: $('.language__dropdown__link--close'),
			$switch: $('.language__switch')
        },

		init: function() {
			if ( languageSelector.el.$dropdown.length ) {
				languageSelector.openSelector();
				languageSelector.closeSelector();
				languageSelector.languageSwitch();
			}
		},

		openSelector: function() {
			languageSelector.el.$link.on( 'click', function( event ) {
				var wWidth = $( window )
					.width();

				if ( wWidth > 1024 ) {
					event.preventDefault();
					languageSelector.el.$dropdown.show();
				} else {
					languageSelector.el.$dropdown.hide();
					return true;
				}

				$(window).resize(function() {
					var width = $(document).width();
		            if( width < 1008 ) {
						languageSelector.el.$dropdown.hide();
					}
		        });

			} );
		},

		closeSelector: function() {
			languageSelector.el.$closeDropdown.on( 'click', function( event ) {
				event.preventDefault();
				languageSelector.el.$dropdown.hide();
			} );
		},

		languageSwitch: function() {
			languageSelector.el.$switch.on( 'click', function( event ) {
				event.preventDefault();
				$( '.language__link' )
					.each( function() {
						var translation = $( this )
							.data( 'eng' );
						$( this )
							.data( 'eng', $( this )
								.text() )
							.text( translation );
					} );
			} );
		}
	};

	languageSelector.init();

	return languageSelector;

} );