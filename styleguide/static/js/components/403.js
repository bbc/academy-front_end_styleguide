require( [ 'jquery-1.9', 'academy/userdetect', 'cookiejs' ], function ( $, detector, ck ) {
  'use strict';

  var check403 = {

    el: {
      $403: $( '#check403' ),
      $noJS: $( '#noJSNote' ),
      $noCookies: $( '#noCookiesNote' ),
      $noNetwork: $( '#noNetworkNote' ),
      $noNetworkMsg: $( '#noNetworkSubNote' ),
      $checkNetwork: $( '#checkNetworkNote' ),
      $successMsg: $( '#successResponse' )
    },

    init: function () {
      if ( check403.el.$403.length > 0 ) {
        check403.checkJS();
        check403.checkCookies();
        window.setTimeout( check403.checkNetwork, 500 );
      }
    },

    checkJS: function () {
      check403.el.$checkNetwork.show();
      check403.el.$noJS.hide();
    },

    checkCookies: function () {
      var cookieEnabled = ( navigator.cookieEnabled ) ? true : false;

      if ( cookieEnabled == true ) {
        check403.el.$noCookies.hide();
      } else if ( cookieEnabled == false ) {
        check403.el.$noCookies.show();
      }

      if ( typeof navigator.cookieEnabled == "undefined" && !
        cookieEnabled ) {
        document.cookie = "403cookie";
        cookieEnabled = ( document.cookie.indexOf( "403cookie" ) != -1 ) ?
          true : false;
      }
      return ( cookieEnabled );
    },

    checkNetwork: function () {
      detector( function ( err, status ) {
        if ( err ) {
          check403.el.$checkNetwork.hide();
          check403.el.$noNetwork.show();
          check403.el.$noNetworkMsg.show();
        } else {
          check403.el.$checkNetwork.hide();
          check403.el.$noNetwork.hide();
          check403.el.$noNetworkMsg.hide();
          check403.el.$successMsg.show();

          if ( window.location.href.indexOf( '/403' ) === -1 ) {
            $.ajax( {
              url: window.location.href,
              headers: {
                "Pragma": "no-cache",
                "Expires": -1,
                "Cache-Control": "no-cache"
              }
            } ).done( function () {
              window.location.reload( true );
            } );
          }
        }
      } );
    }
  };

  check403.init();

  return check403;

} );
