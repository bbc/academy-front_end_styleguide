require( [ 'jquery-1.9' ], function( $ ) {
	'use strict';

	var clearSearch = {

		el: {
			$searchinput: $( '.search__input' ),
			$clearbutton: $( '.search__button--clear' )
		},

		init: function() {
			clearSearch.el.$searchinput.keyup( function(e) {
				if ( e.keyCode != 9 ){
			  		$( this ).parent().find( clearSearch.el.$clearbutton ).addClass( 'active' );
					$( this ).parent().find( clearSearch.el.$clearbutton ).on( 'click', function() {
						$( this ).parent().find( clearSearch.el.$searchinput ).val( '' );
						$( this ).removeClass( 'active' ).blur();
					} );
			    }
			});
		}
	};

	clearSearch.init();

	return clearSearch;

} );