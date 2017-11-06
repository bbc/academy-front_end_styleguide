require(['jquery-1.9', 'academy/userdetect'], function($, detector) {
    'use strict';

    var detection = {

        el: {
            $dLink: $('#signinLink'),
            $dModal: $('#signInModal'),
            $dSpinner: $('#signInModal').find('#spinChecker'),
            $waitingMsg: $('#signInModal').find('#responseChecker'),
            $failResponse: $('#signInModal').find('#failResponse'),
            $successResponse: $('#signInModal').find('#successResponse'),
            $failCloseBtn: $('#signInModal').find('#failClose'),
            $successCloseBtn: $('#signInModal').find('#successClose')
        },

        init: function () {
            detection.launchChecker();
            detection.successClose();
            detection.failClose();
        },

        launchChecker: function () {
            detection.el.$dLink.on('click', function(e) {
                e.preventDefault();
                detection.disableScroll();
                detection.el.$dModal.addClass('open');

                detection.el.$dSpinner.show();
                detector(function(err, status) {
                    if (err) {
                        detection.el.$dSpinner.hide();
                        detection.el.$waitingMsg.hide();
                        detection.el.$failResponse.show();

                    } else {
                        detection.el.$dSpinner.hide();
                        detection.el.$waitingMsg.hide();
                        detection.el.$successResponse.show();
                    }
                } );
            });
        },

        successClose: function () {
            detection.el.$successCloseBtn.on('click', function(e) {
                e.preventDefault();
                $.ajax({
                    url: window.location.href,
                    headers: {
                        "Pragma": "no-cache",
                        "Expires": -1,
                        "Cache-Control": "no-cache"
                    }
                }).done(function () {
                    window.location.reload(true);
                });
            });
        },

        failClose: function () {
            detection.el.$failCloseBtn.on('click', function(e) {
                e.preventDefault();
                detection.enableScroll();
                
                detection.el.$dModal.removeClass('open');
                detection.el.$waitingMsg.show();
                detection.el.$failResponse.hide();
            });
        },

        disableScroll: function () {
            var keys = {37: 1, 38: 1, 39: 1, 40: 1};

            function preventDefault(e) {
              e = e || window.event;
              if (e.preventDefault)
                  e.preventDefault();
              e.returnValue = false;  
            }

            function preventDefaultForScrollKeys(e) {
                if (keys[e.keyCode]) {
                    preventDefault(e);
                    return false;
                }
            }

            if (window.addEventListener) // older FF
                window.addEventListener('DOMMouseScroll', preventDefault, false);
                window.onwheel = preventDefault; // modern standard
                window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
                window.ontouchmove  = preventDefault; // mobile
                document.onkeydown  = preventDefaultForScrollKeys;
        },

        enableScroll: function () {
            var keys = {37: 1, 38: 1, 39: 1, 40: 1};

            function preventDefault(e) {
              e = e || window.event;
              if (e.preventDefault)
                  e.preventDefault();
              e.returnValue = false;  
            }

            function preventDefaultForScrollKeys(e) {
                if (keys[e.keyCode]) {
                    preventDefault(e);
                    return false;
                }
            }

            if (window.removeEventListener)
                window.removeEventListener('DOMMouseScroll', preventDefault, false);
                window.onmousewheel = document.onmousewheel = null; 
                window.onwheel = null; 
                window.ontouchmove = null;  
                document.onkeydown = null;
        }
    };

    detection.init();

    return detection;

});