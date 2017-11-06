require( [ 'jquery-1.9' ], function( $ ) {
	'use strict';

	var Loadmore = ( function() {

		var source = $( '.loadmore__button' )
			.data( 'source' );
		if ( window.location.hash.indexOf( 'page-' ) >= 0 ) {
			var results = window.localStorage.getItem( 'bbc.academy.results' + source );
			if ( results ) {
				$( '#results-loaded' )
					.html( results );
			}
		}

		var fq = '';
		var sort = '';
		var page = 2;
		var term = '';
		var lastId = '';

		/**
		 * Elements
		 */
		var buttonSelector = '.loadmore__button';
		var $resultsContainer = $( '#results-loaded' );

		/**
		 * Initialize click handler
		 */
		assignEventOnButton();

		/**
		 * Add click handler to button
		 */
		function assignEventOnButton() {
			$( buttonSelector )
				.on( 'click', addClickHandler );
		}

		/**
		 * Click handler
		 */
		function addClickHandler( e ) {
			e.preventDefault();
			var $this = $( this );
			var source = $this.data( 'source' );

			$this.addClass( 'loadmore__spinner' );

			setPaginationAttributes( $this );

			fetch( source, function( err, data ) {
				window.location.hash = 'page-' + page;

				$( '.loadmore' )
					.replaceWith( data );

				setPaginationAttributes( $( '.loadmore__button' ) );

				var lazyImages = $( '#results-loaded' )
					.find( 'img' );
				for ( var i = 0; i < lazyImages.length; i++ ) {
					$( lazyImages[ i ] )
						.addClass( 'is-loaded' );
				}

				assignEventOnButton();

				var loaded = $resultsContainer.html();
				window.localStorage.setItem( 'bbc.academy.results' + source, loaded );
			} );

			return false;
		}

		/**
		 * Update the loadmore buttons data-attributes.
		 * @param $element - jQuery wrapped loadmore__button
		 */
		function setPaginationAttributes( $element ) {
			fq = $element.data( 'fq' );
			sort = $element.data( 'sort' );
			term = $element.data( 'term' );
			page = $element.data( 'page' );
			source = $element.data( 'source' );
			lastId = $element.data( 'id' );
		}

		/**
		 * AJAX Call to fetch more results.
		 * @param callback - return to fetch function
		 */
		function fetch( source, callback ) {
			$.ajax( {
					type: 'get',
					url: source + '?q=' + encodeURIComponent( term ) + '&snip=1&page=' + encodeURIComponent( page ) + '&fq=' + encodeURIComponent( fq ) + '&sort=' + encodeURIComponent( sort )
				} )
				.done( function( response ) {
					callback( null, response );
				} )
				.fail( function( err ) {
					callback( err, null );
				} );
		}

	} )();

	return Loadmore;

} );