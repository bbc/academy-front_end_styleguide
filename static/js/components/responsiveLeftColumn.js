require( [ 'jquery-1.9' ], function( $ ) {
    'use strict';

    var responsiveGrid = {

        el: {
            reposive: true,
            widthMaster: document.documentElement.clientWidth,
            isSafari: /constructor/i.test( window.HTMLElement ) || ( function( p ) {
                return p.toString() === "[object SafariRemoteNotification]";
            } )( !window[ 'safari' ] || ( typeof safari !== 'undefined' && safari.pushNotification ) )
        },

        init: function() {

            $( window ).resize( function() {
                let width = document.documentElement.clientWidth;
                if ( !responsiveGrid.el.isSafari ) {
                    if ( width < 1265 && responsiveGrid.el.reposive == true ) {
                        responsiveGrid.moveDataHTMLTo();
                    } else {
                        responsiveGrid.moveDataHTMLFrom();
                    }
                } else {
                    if ( width < 1280 && responsiveGrid.el.reposive == true ) {
                        responsiveGrid.moveDataHTMLTo();
                    } else {
                        responsiveGrid.moveDataHTMLFrom();
                    }
                }
            } );

            if ( responsiveGrid.el.widthMaster < 1265 && responsiveGrid.el.reposive == true ) {
                responsiveGrid.moveDataHTMLTo();
            }
        },

        moveDataHTMLTo: function() {
            var dataHTML = $( '.sidebar-left' ).detach().css( 'width', 'auto' ).css( 'height', 'auto' ).css( 'overflow', 'none' );
            $( '.page__title' ) == null ? $( '.page__title' ).after( dataHTML ) : $( '.page-title' ).after( dataHTML );
            responsiveGrid.el.responsive = false;
        },
        moveDataHTMLFrom: function() {
            var dataHTML = $( '.sidebar-left' ).detach().css( 'width', '16.66667%' ).css( 'height', 'auto' ).css( 'overflow', 'inherit' );
            $( '.row--article' ).prepend( dataHTML );
            responsiveGrid.el.responsive = true;
        }
    };

    responsiveGrid.init();

    return responsiveGrid;

} );