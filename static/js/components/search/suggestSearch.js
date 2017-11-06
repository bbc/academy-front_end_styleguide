/* global window */

require( [ 'jquery-1.9' ], function( $ ) {
	var WAIT_MS = 300; // pause in typing to wait before submitting search

	var suggestSearch = {

		el: {
			$searchinput: $( '.search__input' )
		},

		idleTimeout: null,

		init: function() {
			$( 'body' )
				.on( 'keydown click', function( e ) {
					setTimeout( function() {
						var active = $( window.document.activeElement );
						var activeInForm = active.closest( '.search__form' )
							.length;
						if ( !activeInForm || e.keyCode === 27 ) { // esc
							cancelSuggest();
						}
					}, 1 );
				} );

			suggestSearch.el.$searchinput.focus( function() {
				cancelSuggest();
			} );

			suggestSearch.el.$searchinput.on( 'input', function() {
				var input = $( this );

				if ( !input.val() ) {
					cancelSuggest( input );
				} else {
					activateSuggest( input, input.val() );
				}
			} );
		}
	};

	function cancelSuggest( searchInput ) {
		searchInput = searchInput || suggestSearch.el.$searchinput;
		clearTimeout( suggestSearch.idleTimeout );
		searchInput.next( '.search__wrapper' )
			.find( '.search__suggestions' )
			.empty();
		searchInput.next( '.search__wrapper' )
			.find( '.search__courses' )
			.empty();
		searchInput.next( '.search__wrapper' )
			.hide();
	}

	function makeMenu( searchInput, suggestions ) {
		if ( suggestions && suggestions.length ) {
			var suggestionList = searchInput.next( '.search__wrapper' )
				.find( '.search__suggestions' );
			var courseList = searchInput.next( '.search__wrapper' )
				.find( '.search__courses' );
			var noCourses = searchInput.next( '.search__wrapper' )
				.find( '#noCourses' );
			var noSuggestions = searchInput.next( '.search__wrapper' )
				.find( '#noSuggestions' );
			var suggestionWrap = searchInput.next( '.search__wrapper' );

			suggestionList.empty();
			courseList.empty();

			for ( var i = 0, l = Math.min( 7, suggestions.length ); i < l; i++ ) {
				var suggestion = suggestions[ i ];
				if ( suggestion.type == 'article' ) {
					noSuggestions.hide();
					suggestionList
						.append(
							'<li class="search__suggestion--' + suggestion.type + '">' +
							linkify( suggestion ) +
							'</li>'
						);
				}

				if ( suggestion.type == 'course' ) {
					noCourses.hide();
					courseList
						.append(
							'<li class="search__suggestion--' + suggestion.type + '">' +
							linkify( suggestion ) +
							'</li>'
						);
				}

			}
			suggestionWrap
				.show();
		} else {
			cancelSuggest( searchInput );
		}
	}

	function activateSuggest( searchInput, q ) {
		clearTimeout( suggestSearch.idleTimeout );
		suggestSearch.idleTimeout = setTimeout( function() {
			$.ajax( {
					url: '/academy/api/suggest?q=' + encodeURIComponent( q )
				} )
				.done( function( data ) {
					makeMenu( searchInput, data.suggestions );
				} );
		}, WAIT_MS );
	}

	function linkify( suggestion ) {
		var link = htmlify.templates[ suggestion.type ];


		if ( !link ) {
			return suggestion.title;
		} else {
			return link.replace( '{id}', suggestion.id )
				.replace( '{title}', htmlify( suggestion.title ) )
				.replace( '{term}', htmlify( suggestion.title ) )
				.replace( '{icon}', htmlify( suggestion.media_type ) )
				.replace( '{description}', htmlify( suggestion.description ) );
		}
	}

	function htmlify( str ) {
		str = str === 'class' ? 'classroom' : str;
		str = str === 'online' ? 'pc' : str;

		str.replace( /[\u00A0-\u9999<>\&]/gim, function( i ) {
			return '&#' + i.charCodeAt( 0 ) + ';';
		} );
		return str;
	}
	htmlify.templates = {
		course: '<a href="/academy/courses/{id}"><div class="search__suggestion__icon"><span class="search__suggestion__svg"><svg><use xlink:href="#gel-icon-{icon}"></use></svg><noscript><img class="icon__falback" src="/academy/static/img/svg-fallbacks/gel-icon-{icon}-purple.png"  alt="media icon"/></noscript><!--[if lt IE 9]><img class="icon__falback" src="/academy/static/img/svg-fallbacks/gel-icon-{icon}-purple.png" alt="media icon"/><![endif]--></span></div><span class="search__suggestion__title">{title}</span><span class="search__suggestion__description">{description}</span></a>',
		article: '<a href="/academy/article/{id}">{title}</a>'
	};

	//suggestSearch.init();

	return suggestSearch;

} );