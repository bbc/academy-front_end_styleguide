/*global define,window,document*/

/**
 * Check if client has access to load a JS acript resource from the Gateway site.
 */

define( 'academy/userdetect', [ 'jquery-1.9', 'cookiejs' ], function ( $, ck ) {
  'use strict';

  var TIMEOUT_MS = 5000;
  var TEST_SCRIPT = 'http://academy.gateway.bbc.co.uk/userdetect/index.js';
  var COOKIE_NAME = 'ckns_acad-gateway';
  var COOKIE_DAYS = 10;
  var cookieValue = ck.get( COOKIE_NAME, {
    host: '.bbc.co.uk',
    path: '/'
  } );

  var tryLoad = function ( scriptSrc, callback ) {
    var timerId;
    var scriptAjax;

    if ( cookieValue === 'deny' ) {
      return callback( new Error( 'Access explicitly set to "deny".' ), null );
    }

    var onLoadDone = function ( script, textStatus ) {
      callback( null, textStatus );
      clearTimeout( timerId );
    };

    var onLoadFail = function ( jqxhr, settings, exception ) {
      scriptAjax.abort();
      clearTimeout( timerId );
      callback( exception, null );
    };

    timerId = setTimeout( function () {
      onLoadFail( null, null, new Error( 'Timed out.' ) );
      onLoadDone = onLoadFail = function () {};
    }, TIMEOUT_MS );

    scriptAjax = $.getScript( scriptSrc )
      .done( onLoadDone )
      .fail( onLoadFail );
  };

  var saveCookie = function () {
    ck.set( COOKIE_NAME, 'true', {
      domain: '.bbc.co.uk',
      path: '/',
      expires: COOKIE_DAYS
    } );
  };

  /**
   * @param {function} callback - Calls (err, success) when attempted script load is done.
   */
  return function ( callback ) {
    if ( cookieValue === 'true' ) {
      callback( null, cookieValue );
    } else {

      tryLoad(
        TEST_SCRIPT,
        function ( err, status ) {
          if ( err ) {
            callback( err );
          } else {
            saveCookie();
            setTimeout( function () {
              callback( null, status );
            }, 500 );
          }
        }
      );

    }
  };
} );
