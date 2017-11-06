require( [ 'jquery-1.9' ], function( $ ) {
	'use strict';

	var collectionsMenu = {

		el: {
			$nav: $( "#collectionsNav" ),
			$list: $( '.collections__sections__wrapper' ),
			$link: $( '.collections__sections__link' ),
			$item: $( '.collections__sections__link' ).parent(),
			$menu: $( '.collections__sections__menu' )
		},

		windowWidth: $( window ).width(),

		init: function() {
			function assignTopPos() {
				var stickyTop = collectionsMenu.el.$list.offset().top;
				$( window ).scroll( function() {
					var scroll = $( window ).scrollTop();

					if ( scroll >= stickyTop ) {
						collectionsMenu.el.$list.addClass( "sticky" );
					} else {
						collectionsMenu.el.$list.removeClass( "sticky" );
					}

					clearTimeout( $.data( this, 'scrollTimer' ) );
					$.data( this, 'scrollTimer', setTimeout( function() {
						if ( scroll < 250 ) {
							collectionsMenu.el.$list.find( '.active' ).removeClass( 'active' );
							window.location.hash = '';
						}
					}, 250 ) );
				} );
			}

			if ( collectionsMenu.windowWidth > 1007 ) {
				$( function() {
					setTimeout( assignTopPos, 1000 );
				} );
			} else {
				collectionsMenu.mobileMenu();
			}

			$( window ).resize( function() {
				var width = $( document ).width();
				if ( width > 1007 ) {
					$( function() {
						setTimeout( assignTopPos, 1000 );
					} );
				} else {
					collectionsMenu.mobileMenu();
				}
			} );

			collectionsMenu.scrolltoSection();
		},

		scrolltoSection: function() {
			$( document ).on( "scroll", onScroll );

			collectionsMenu.el.$link.on( 'click', function( e ) {
				var currLink = $( this );
				var href = currLink.attr( 'href' );
				var targetSection = href ? $( href ) : null;

				if ( targetSection && targetSection.offset() ) {
					var topofSection = targetSection.offset().top - 90
					e.preventDefault();

					$( document ).off( "scroll" );

					$( 'html,body' ).stop().animate( {
						scrollTop: topofSection
					}, 700, 'swing', function() {
						window.location.hash = targetSection[ 0 ].id;
						$( document ).on( 'scroll', onScroll );
					} );

					targetSection.focus();

					$( this ).closest( '.collections__sections' ).find( '.active' ).removeClass( 'active' );
					$( this ).parent().addClass( 'active' );
				}
				return false;
			} );

			function onScroll( event ) {
				var scrollPos = $( document ).scrollTop();
				collectionsMenu.el.$link.each( function() {
					var currLink = $( this );
					var href = currLink.attr( 'href' );
					var refElement = href ? $( href ) : null;

					if ( refElement && refElement.position() && ( refElement.position().top - 100 <= scrollPos && refElement.position().top + refElement.height() - 100 > scrollPos ) ) {
						collectionsMenu.el.$item.removeClass( "active" );
						currLink.parent().addClass( "active" );
					} else {
						currLink.parent().removeClass( "active" );
					}
				} );
			}
		},

		mobileMenu: function() {
			collectionsMenu.el.$list.removeClass( 'sticky' );
			collectionsMenu.el.$menu.unbind( 'click' ).on( 'click', function( e ) {
				e.preventDefault();
				$( this ).toggleClass( 'open' );
				collectionsMenu.el.$list.toggleClass( 'open' );
			} );
		}
	};

	if ( collectionsMenu.el.$nav.length ) {
		collectionsMenu.init();
	}

	return collectionsMenu;

} );