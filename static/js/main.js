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

require(['jquery-1.9'], function($) {
	'use strict';

	var azFilter = {

		el: {
			$filter: $('.azfilter'),
			$button: $('.azfilter__button'),
			$active: $('active'),
			$disabled: $('disabled')
        },

		init: function () {
			if(azFilter.el.$filter.length > 0){
				azFilter.clickFilter();
			}
		},

		clickFilter: function () {
			azFilter.el.$button.on('click', function(event) {
				var thisID = $.attr(this, 'href');

				event.preventDefault();
				
			    $('html, body').animate({
			        scrollTop: $(thisID).offset().top
			    }, 300);
			    
			    $(thisID).focus();
			});
		}
	};

	azFilter.init();

	return azFilter;

});
require(['jquery-1.9'], function($) {
	'use strict';

	var accordion = {

		el: {
			$accordion: $('.accordion'),
			$link: $('.accordion__link'),
			$answer: $('.accordion__answer'),
			$class: 'show',
			$speed: 350
        },

		init: function () {
			if(accordion.el.$accordion.length > 0){
				accordion.clickAccordion();
				accordion.checkHash();
			}
		},

		clickAccordion: function () {
			accordion.el.$link.click(function(event) {
			  	event.preventDefault();
			  
			    var $this = $(this);

			    $this.toggleClass(accordion.el.$class);
			    $this.next().toggleClass(accordion.el.$class).focus();
			});
		},

		checkHash: function () {
			if(window.location.hash) {
				var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
				if (hash = 'Cancellation') {
					$('#faq6').addClass(accordion.el.$class);
					$('#faq6').next().addClass(accordion.el.$class).focus();
				}
			}
		}
	};

	accordion.init();

	return accordion;

});
require(['jquery-1.9'], function($) {
	'use strict';

	var articleContent = {
		el: {
            $article: $('.article__content'),
            $id: $(this).attr("data-pid"),
            $type: 'BBC-PID',
            $mediaType: 'audio_video'
        },
        mediaElements: $('.article__content').find('span[data-type="BBC-PID"]'),
        emptyP: $('.article__content').find('p'),
        imgCap: $('.article__content').find('img-caption'),
        tableBorder: $('.article__content').find('table'),
        brTags: $('.article__content').find('br'),

		init: function () {
			articleContent.removeBorder();
			articleContent.swapMedia();
			articleContent.stripParagraphs();
		},

		stripParagraphs: function () {
			articleContent.emptyP.each(function() {
	            var $this = $(this);
	            if($this.html().replace(/\s|&nbsp;/g, '').length == 0){
	                $this.remove();
	            }
	        });
		},

		removeBorder: function () {
			articleContent.tableBorder.each(function() {
	            $(this).removeAttr('border');
	            $(this).wrap('<div class="table__container"></div>');
	        });
		},

		swapMedia: function () {
			articleContent.mediaElements.each(function each(i, element) {
	            var itemData = $(element).data();
	            if (itemData.mediaType === 'audio_video') {
	                itemData.placeholder = true;
	                
	                $(element).replaceWith(function(){
	                    return $('<div class="video" data-pid="' + itemData.pid + '" id="bbcMediaPlayer0"><div class="video__container"><div class="video__jump" id="bbcMediaPlayer0jumpMediaPlayer"><a id="bbcMediaPlayer0jumpMediaPlayerLink" href="">Jump media player</a></div><div class="video__before" id="bbcMediaPlayer0beforeFlash"><a id="bbcMediaPlayer0beforeFlashLink" href="http://www.bbc.co.uk/faqs/online/mp_accessibility_help">Media player help</a></div><div class="video__player"><object width="100%" height="100%" data="http://www.bbc.co.uk/academy/embeddedplayer?playerOnly=true&pid=' + itemData.pid + '&colour=%23402963"></object></div><div class="video__after" id="bbcMediaPlayer0afterFlash"><a id="bbcMediaPlayer0returnToMediaPlayerLink" href="#afterFlash">Out of media player. Press enter to return or tab to continue.</a></div></div></div>');
	                });
	            }else if (itemData.mediaType === 'image') {
	            	if (itemData.caption === undefined) {
	            		$(element).replaceWith(function(){
		                    return $('<figure class="article__figure"><img class="is-loaded" src="http://ichef.bbci.co.uk/images/ic/1280x720/' + itemData.pid + '.' + itemData.originalFileExtension + '" alt="' + itemData.alt + '" title="' + itemData.title + '"></figure>');
		                });
		            }else {
		                $(element).replaceWith(function(){
		                    return $('<figure class="article__figure"><img class="is-loaded" src="http://ichef.bbci.co.uk/images/ic/1280x720/' + itemData.pid + '.' + itemData.originalFileExtension + '" alt="' + itemData.alt + '" title="' + itemData.title + '"></figure><p class="img-caption">' + itemData.caption +'</p>');
		                });
		            }
	            }
	        });
		}
	};

	if($('.article').length > 0){
		articleContent.init();
	}

	return articleContent;

});
require(['jquery-1.9'], function($) {
	'use strict';

	var toTop = {

		el: {
			$button: $('.back-to-top'),
			$buttonWrap: $('.back-to-top__wrapper')
        },

		init: function () {
			if(toTop.el.$button.length > 0){
				toTop.showButton();
			}
		},

		showButton: function () {
			var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    toTop.el.$buttonWrap.addClass('show');
                } else {
                    toTop.el.$buttonWrap.removeClass('show');
                }
            };
        	backToTop();
	        
	        $(window).on('scroll', function () {
	            backToTop();
	        });
	        
	        toTop.el.$button.on('click', function (e) {
	            e.preventDefault();
	            $('html,body').animate({
	                scrollTop: 0
	            }, 700);
	            $('#academy-content').focus();
	        });

		}
	};

	toTop.init();

	return toTop;

});
!function(a){var b=!1;if("function"==typeof define&&define.amd&&(define('cookiejs',a),b=!0),"object"==typeof exports&&(module.exports=a(),b=!0),!b){var c=window.Cookies,d=window.Cookies=a();d.noConflict=function(){return window.Cookies=c,d}}}(function(){function a(){for(var a=0,b={};a<arguments.length;a++){var c=arguments[a];for(var d in c)b[d]=c[d]}return b}function b(c){function d(b,e,f){var g;if("undefined"!=typeof document){if(arguments.length>1){if(f=a({path:"/"},d.defaults,f),"number"==typeof f.expires){var h=new Date;h.setMilliseconds(h.getMilliseconds()+864e5*f.expires),f.expires=h}f.expires=f.expires?f.expires.toUTCString():"";try{g=JSON.stringify(e),/^[\{\[]/.test(g)&&(e=g)}catch(a){}e=c.write?c.write(e,b):encodeURIComponent(String(e)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),b=encodeURIComponent(String(b)),b=b.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),b=b.replace(/[\(\)]/g,escape);var i="";for(var j in f)f[j]&&(i+="; "+j,f[j]!==!0&&(i+="="+f[j]));return document.cookie=b+"="+e+i}b||(g={});for(var k=document.cookie?document.cookie.split("; "):[],l=/(%[0-9A-Z]{2})+/g,m=0;m<k.length;m++){var n=k[m].split("="),o=n.slice(1).join("=");'"'===o.charAt(0)&&(o=o.slice(1,-1));try{var p=n[0].replace(l,decodeURIComponent);if(o=c.read?c.read(o,p):c(o,p)||o.replace(l,decodeURIComponent),this.json)try{o=JSON.parse(o)}catch(a){}if(b===p){g=o;break}b||(g[p]=o)}catch(a){}}return g}}return d.set=d,d.get=function(a){return d.call(d,a)},d.getJSON=function(){return d.apply({json:!0},[].slice.call(arguments))},d.defaults={},d.remove=function(b,c){d(b,"",a(c,{expires:-1}))},d.withConverter=b,d}return b(function(){})});

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
require(['jquery-1.9'], function($) {
	'use strict';

	var dropDown = {

		init: function () {
			if($(document).width() < 768){
	            dropDown.showDropdown();
	        }
	        $(window).resize(function() {
	            var width = $(document).width();
	            if (width < 768){
	                dropDown.showDropdown();
	            }
	        });

	        $('.js-dropdown').each( function () {
	        	$(this).find('.js-dropdown__button').focus( function () {
					$(this).next('.js-dropdown__options').show();
				});

				$(this).find('.js-dropdown__options').find('.js-dropdown__item:last-of-type').focusout( function () {
					$(this).parent().hide().removeAttr('style');
				});
	        });
		},

		showDropdown: function () {
	        $('.js-dropdown__item').on('click', function(){
	            $(this).find('.js-dropdown__options').show();
	        });
	        $('.js-dropdown__button').on('click', function(event){
	            event.preventDefault();
	        });
		    $('#orb-modules').on('click', function(event){
		        var $trigger = $('.js-dropdown__item');
		        if($trigger !== event.target && !$trigger.has(event.target).length){
		            $('.js-dropdown__options').hide();
		        }            
		    });
	    }
	};

	dropDown.init();

	return dropDown;

});
require(['jquery-1.9', 'placeholder'], function($, placeholder) {
	'use strict';
	
	// Removes no-js class from the HTML tag when Javascript loads
	$('html').removeClass('no-js');

    // Adds a class of is-loaded to all images once they have loaded.
    $('img').addClass('is-loaded');

    window.onload = function() {
  		$('.hero__background').addClass('is-loaded');
	};

    $('.dropdown__button').on('click', function(event) {
        event.preventDefault();
    });

    $('.mq-output').text($( window ).width() + 'px');

    $(window).resize(function() {
        $('.mq-output').text($( window ).width() + 'px');
    });

    $('.search__input').placeholder();

    $('.js-scrollto').on('click', function (e) {
        var targetSection = $(this).attr('href');
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $(targetSection).offset().top
        }, 700);
        $(targetSection).focus();
    });

    $('.card__button--request__cta').on('click', function(e) {
        e.preventDefault();
        $(this).parent().find('.card__button__shelf').addClass('open');
    });

    $('.close-x').on('click', function() {
        $(this).parent().removeClass('open');
    });

});
require(['jquery-1.9', 'slick'], function($, slick) {
	'use strict';

	var herousel = {

		el: {
			$jsherousel: $('.js-herousel'),
			$scrollTrack: $('.scrollbar__track')
        },

		init: function () {
			herousel.el.$jsherousel.each(function (idx, item) {
			    var herouselId = "herousel" + idx;
			    var scrollBar = $(this).next('.scrollbar').find('.scrollbar__track');

			    this.id = herouselId;

			    $(this).on('afterChange init', function(event, slick, direction){
					slick.$slides.removeClass('slick-prev').removeClass('slick-next');
					    for (var i = 0; i < slick.$slides.length; i++)
					    {
					        var $slide = $(slick.$slides[i]);
					        if ($slide.hasClass('slick-current')) {
					            $slide.prev().addClass('slick-prev');
					            $slide.next().addClass('slick-next');
					            $slide.next().next().addClass('slick-next-next');
					            break;
					        }
					    }
					  }
					)
					.on('beforeChange', function(event, slick) {
					        $('.slick-current').removeClass('slick-current').addClass('slick-prev');
					        $('.slick-prev').removeClass('slick-prev').addClass('slick-prev');
					        $('.slick-next').removeClass('slick-next').addClass('slick-current');
					        $('.slick-next-next').removeClass('slick-next-next').addClass('slick-next');

					}).slick({
			      	centerMode: true,
			      	dots: false,
			      	cssEase: 'ease-in-out',
			      	slidesToShow: 1,
					slidesToScroll: 1,
					variableWidth: true,
					waitForAnimate: false,
					accessibility: true,
					// appendArrows: ".herousel__button__wrapper",
					prevArrow: '<button type="button" data-role="none" class="herousel__button--prev" aria-label="Previous" tabindex="0" role="button"><div class="herousel__button__icon"><span class="herousel__button__icon__svg"><svg><use xlink:href="#gel-icon-previous"></use></svg><noscript><img class="icon__falback" src="/academy/static/img/svg-fallbacks/gel-icon-previous-white.png"  alt="media icon"/></noscript><!--[if lt IE 9]><img class="icon__falback" src="/academy/static/img/svg-fallbacks/gel-icon-previous-white.png" alt="media icon"/><![endif]--></span></div></button>',
                	nextArrow: '<button type="button" data-role="none" class="herousel__button--next" aria-label="Next" tabindex="0" role="button"><div class="herousel__button__icon"><span class="herousel__button__icon__svg"><svg><use xlink:href="#gel-icon-next"></use></svg><noscript><img class="icon__falback" src="/academy/static/img/svg-fallbacks/gel-icon-next-white.png"  alt="media icon"/></noscript><!--[if lt IE 9]><img class="icon__falback" src="/academy/static/img/svg-fallbacks/gel-icon-next-white.png" alt="media icon"/><![endif]--></span></div></button>'
		    	});

				herousel.setButtons(idx);

				$(window).on('resize', function(){
				    herousel.setButtons(idx);
				});
			});
		},

		setButtons: function (idx) {
			var wWidth = $(window).width(),
				aWidth = $('#herousel' + idx).find('.slick-active').width(),
				rightButton = (wWidth-aWidth)/2;

			if (wWidth >= 768){
				var leftButton = rightButton+70;
			}else {
				var leftButton = rightButton+34;
			}


			$('.herousel__button--prev').css({'right':leftButton});
			$('.herousel__button--next').css({'right':rightButton});
		}
	};

	herousel.init();

	return herousel;

});

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
require(['jquery-1.9'], function($) {
    'use strict';
        var vp = {
            el: {
                carouselItems: document.getElementsByClassName('scroll-carousel-p__item'),
                playlistSingleItem: $('.video-p__item'),
                carouselNext: $('.scroll-carousel-p__button--next'),
                durationItems: document.getElementsByClassName('video-p--duration')
            },
            html: {
                nowTag: '<div class="video-p__add video-p--tag"> playing now </div>',
                nextTag: '<div tabindex="-1" class="video-p__add video-p--tag"> up next </div>',
                screenReader: '<a href="#mediaPlayer" tabindex="0" class="video-p__jump"> Jump to player </a>'                
            },
            obj:{
                playlistClone: null
            },
            helpers:{
                autoplay: true,
                count: 0
            },

            init : function(){
                this.loadPlaylist();
                this.addTags();
                if(vp.helpers.autoplay == true){
                    this.autoTags();
                }
                
            },

            loadPlaylist : function(e){
                vp.el.playlistSingleItem.on('click', function(e) {
                    //e.preventDefault();
                    vp.obj.playlistClone = $.extend(true, {}, Player.settingsObject.playlistObject);
                    var itemNumber = $(this).data('index') - 1;
                    vp.el.itemNumberGlobal = itemNumber;
                    for (var j = 0; j < itemNumber; j++) {
                        vp.obj.playlistClone.items.shift();
                    }
                    require(['bump-3'], function($) {
                        var mediaPlayer = $('#mediaPlayer').player(Player.settingsObject);
                        mediaPlayer.loadPlaylist(vp.obj.playlistClone, true);                        
                    })
                });
            },

            addTags : function() {
                $(vp.el.carouselItems[0]).find('.video-p__item').append(vp.html.nowTag).find('.video-p--tag').hide().fadeIn();
                $(vp.el.carouselItems[1]).find('.video-p__item').append(vp.html.nextTag).find('.video-p--tag').hide().fadeIn();
                
                for (var x = 0; x < vp.el.durationItems.length; x++) {
                    var timeBefore = vp.el.durationItems[x].innerHTML;
                    var timeAfter = vp.duration(timeBefore);
                    vp.el.durationItems[x].innerHTML = timeAfter;
                }
                this.addTagsOnClick();
            },

            clearTags: function() {
                $(document).find('.video-p--tag').remove();
                $(document).find('.video-p__jump').remove();
            },

            addTagsOnClick : function(e) {
                var that = this;
                vp.el.playlistSingleItem.on('click', function(e) {
                    e.preventDefault();
                    var playNextNumber = $(this).data('index');

                    if ($(this).parent().find('.video-p--tag') == true) {} else {
                        that.clearTags();
                        $(this).parent().append(vp.html.screenReader);
                        $(this).append(vp.html.nowTag).find('.video-p--tag').hide().fadeIn();
                        $(vp.el.carouselItems[playNextNumber]).find('.video-p__item').append(vp.html.nextTag).find('.video-p--tag').hide().fadeIn()
                    }

                    vp.helpers.count = playNextNumber;
                    vp.helpers.autoplay = false;
                });
            },

            autoTags : function(e){
                var that = this;
                    require(['bump-3'], function($) {
                        var mediaPlayer = $('#mediaPlayer').player(Player.settingsObject);
                        mediaPlayer.bind('ended', function(e) { 
                            that.clearTags();
                            if( vp.helpers.autoplay == true){
                                // loop stats with 1
                                $(vp.el.carouselItems[vp.helpers.count + 1]).append(vp.html.nowTag).find('.video-p--tag').hide().fadeIn();
                                $(vp.el.carouselItems[vp.helpers.count + 1]).append(vp.html.screenReader);                                
                                $(vp.el.carouselItems[vp.helpers.count + 2]).find('.video-p__item').append(vp.html.nextTag).find('.video-p--tag').hide().fadeIn();                            
                                vp.el.carouselNext.trigger('click');
                                vp.helpers.count++
                            }else{
                                // loop starts with 0
                                $(vp.el.carouselItems[vp.helpers.count]).append(vp.html.nowTag).find('.video-p--tag').hide().fadeIn();
                                $(vp.el.carouselItems[vp.helpers.count]).append(vp.html.screenReader);                                
                                $(vp.el.carouselItems[vp.helpers.count + 1]).find('.video-p__item').append(vp.html.nextTag).find('.video-p--tag').hide().fadeIn();                            
                                $(this).append(vp.html.screenReader);
                            }
                        });
                    })
            },

            duration : function(duration){
              return duration.substring(2).replace('M', ':').replace('S', ' ');
            }
        }
        vp.init();
});
require(['jquery-1.9'], function($) {
    'use strict';

    var scrollCarousel = {

        el: {
            carousel: $('.v-playlist') // Carousel ELEMENT
        },

        init: function() {
            scrollCarousel.setCarousel();
        },

        setCarousel: function () {


            scrollCarousel.el.carousel.each( function () {

              var thisCarousel = this,
                  carouselElems = getElements(thisCarousel),
                  cardMeasures = getCards(thisCarousel),
                  carouselMeasures = getViewport(thisCarousel),
                  totalWidth =  cardMeasures.flushWidth + carouselMeasures.gradOffset,
                  handleWidth = configureHandle(cardMeasures.outerWidth, carouselMeasures.containerViewport, totalWidth);

              carouselElems.list.width(totalWidth);

              //Resize needed Measurements
              $(window).on('resize', function(){
                cardMeasures = getCards(thisCarousel);
                totalWidth =  cardMeasures.flushWidth + carouselMeasures.gradOffset;
                carouselMeasures = getViewport(thisCarousel);
                handleWidth = configureHandle(cardMeasures.outerWidth, carouselMeasures.containerViewport, totalWidth);
                carouselElems.handle.width(handleWidth.pxWidth);
                carouselElems.list.width(totalWidth);
              });

              carouselElems.handle.width(handleWidth.pxWidth);

              controlclickEvents(carouselElems, cardMeasures.outerWidth);

              if ($('html').hasClass('rtl')){
                carouselElems.handle.css({
                  right: '0px'
                });
              }

              carouselElems.scrolly.bind('scroll', function() {
                var trackCalc = scrollCalculations(this, totalWidth, carouselMeasures, handleWidth.remainder);

                carouselElems.handle.css({
                  right: 'initial',
                  left: trackCalc + 'px'
                });

                buttonStates(carouselElems);
              });

            });
          }
        }

    if ($('.v-playlist').length > 0) {
        scrollCarousel.init();
    }

    function getElements(element) {
        var obj = {
            list : $(element).find('.scroll-carousel-p__list'),
            scrolly : $(element).find('.scroll-carousel-p__visible'),
            left : $(element).find('.scroll-carousel-p__button--prev'),
            right : $(element).find('.scroll-carousel-p__button--next'),
            handle : $(element).find('.scrollbar-p__indicator')
          }
        return obj;
      }

    function getCards(element) {
        var width = $(document).width();
        var obj = {
            width: 185, //Width of a single card
            count: $(element).find('.scroll-carousel-p__item').length, //Amount of Card in the Carousel
            margin: width >= 768 ? 16 : 8,
            outerWidth: null,
            flushWidth:null,
          }

          obj.outerWidth = obj.width + obj.margin; //Card + Margin
          obj.flushWidth = (obj.outerWidth * (obj.count - 1)) + obj.width;

        return obj;
      }

    function getViewport(element) {
        var obj = {
            gradOffset: 87, //Offset Value needed to accomodate for Gradients on either side
            containerViewport: $(element).find('.scroll-carousel-p__container').width(), // Viewable Portaion of the Slider
        }
        return obj;
      }

    function configureHandle(cardOuterwidth, containerViewport, totalWidth) {
        var handleCalc = (cardOuterwidth / totalWidth) * 100,
            handleWidth = handleCalc * (containerViewport / cardOuterwidth),
            pxWidth = containerViewport / 100 * handleWidth,
            remainder = containerViewport - pxWidth;

        var obj = {
          pxWidth: pxWidth + 'px',
          remainder: remainder
        };

        return obj;
      }

    function controlclickEvents(carouselElems, cardOuterwidth){

        if ($('html').hasClass('rtl')){
          carouselElems.right.prop("disabled", true);
        } else {
          carouselElems.left.prop("disabled", true);
        }

        carouselElems.left.on('click', function(event) {
            event.preventDefault();
            if (!carouselElems.scrolly.scrollLeft() == 0) {
                carouselElems.scrolly.animate({
                    scrollLeft: '-=' + cardOuterwidth + 'px'
                }, 400);
            }
        });

        carouselElems.right.on('click', function(event) {
            event.preventDefault();
            if (!(carouselElems.scrolly.scrollLeft() + carouselElems.scrolly.innerWidth() >= carouselElems.scrolly[0].scrollWidth)) {
                carouselElems.scrolly.animate({
                    scrollLeft: '+=' + cardOuterwidth + 'px'
                }, 400);
            }
        });

      }

      var scrollInitial = null;
      function scrollCalculations(scrolly, totalWidth, carouselMeasures, remainder) {
          if (scrollInitial === null) {
              scrollInitial = $(scrolly).scrollLeft();
          }
          var documentScrollLeft = $(scrolly).scrollLeft(),
              oHang = totalWidth - carouselMeasures.containerViewport - carouselMeasures.gradOffset,
              scrollPercent = (documentScrollLeft / oHang) * 100,
              setTrackScroll = (remainder / 100) * scrollPercent;

          if (scrollInitial <= 0) {
              oHang = totalWidth - carouselMeasures.containerViewport - carouselMeasures.gradOffset;
              scrollPercent = (Math.abs(documentScrollLeft) / oHang) * 100;
              setTrackScroll = (remainder / 100) * scrollPercent;
          }

          return setTrackScroll;
      }

    function buttonStates(carouselElems){

      if ($(carouselElems.scrolly).scrollLeft() + $(carouselElems.scrolly).innerWidth() >= $(carouselElems.scrolly)[0].scrollWidth) {
          carouselElems.right.prop("disabled", true);
          return false;
      } else {
          carouselElems.right.prop("disabled", false);
      }

      if ($(carouselElems.scrolly).scrollLeft() == 0) {
          carouselElems.left.prop("disabled", true);
          return false;
      } else {
          carouselElems.left.prop("disabled", false);
      }

    }


  return scrollCarousel;

});

require(['jquery-1.9'], function($) {
	'use strict';

	var pocket = {

		el: {
			$pocket: $('.pocket')
        },

		init: function () {
			if(pocket.el.$pocket.length > 0){
				pocket.setPocket();
			}

			$(window).on('resize', function(){
			    pocket.setPocket();
			});
		},

		setPocket: function () {
			pocket.el.$pocket.each(function() {
				var $this = $(this),
					$container = $(this).find('.pocket__container'),
					$content = $(this).find('.pocket__content'),
					$item = $(this).find('.pocket__item'),
					$itemWidth = $item.outerWidth(),
					$itemTotal = $item.length,
					$itemCombined = $itemWidth*$itemTotal,
					$toggle = $(this).find('.pocket__toggle'),
					$button = $(this).find('.pocket__button'),
					$text = $(this).find('.pocket__button__text'),
					$divider = $(this).find('.divider--pocket'),
					$maxHeight = $container.outerHeight(),
					$pocketOpen = false,
					$windowSize = $(window).width(),
					$wrapperWidth = $('.wrapper').outerWidth();

				if($itemCombined > $wrapperWidth){
					if($windowSize < 480) {
						var $minHeight = $item.outerHeight()*3+10;
					}else {
						var $minHeight = $item.outerHeight()+100;
					}
					$toggle.removeClass('hide');
					$content.height($minHeight);
				}else {
					$toggle.addClass('hide');
				}

				$button.on('click', function(event) {
					event.preventDefault();
					var lessText = $(this).data('less');
					var moreText = $(this).data('more');

					if($pocketOpen == false){
						$text.text(lessText);
						$content.height($maxHeight+30);
						$pocketOpen = true;
						$divider.addClass('open');
						$(this).addClass('open');
					}else{
						$text.text(moreText);
						$content.height($minHeight);
						$pocketOpen = false;
						$divider.removeClass('open');
						$(this).removeClass('open');
						$('html,body').stop(true).animate({
			                scrollTop: $($this).offset().top
			            }, 700);
					}
				});
			});
		}
	};

	pocket.init();

	return pocket;

});
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
require( [ 'jquery-1.9' ], function( $ ) {
    'use strict';

    var scrollCarousel = {

        el: {
            carousel: $( '.js-scroll-carousel' ) // Carousel ELEMENT
        },

        init: function() {
            scrollCarousel.setCarousel();
        },

        setCarousel: function() {


            scrollCarousel.el.carousel.each( function() {

                var thisCarousel = this,
                    carouselElems = getElements( thisCarousel ),
                    cardMeasures = getCards( thisCarousel ),
                    carouselMeasures = getViewport( thisCarousel ),
                    totalWidth = cardMeasures.flushWidth + carouselMeasures.gradOffset,
                    handleWidth = configureHandle( cardMeasures.outerWidth, carouselMeasures.containerViewport, totalWidth );

                carouselElems.list.width( totalWidth );

                //Resize needed Measurements
                $( window ).on( 'resize', function() {
                    cardMeasures = getCards( thisCarousel );
                    totalWidth = cardMeasures.flushWidth + carouselMeasures.gradOffset;
                    carouselMeasures = getViewport( thisCarousel );
                    handleWidth = configureHandle( cardMeasures.outerWidth, carouselMeasures.containerViewport, totalWidth );
                    carouselElems.handle.width( handleWidth.pxWidth );
                    carouselElems.list.width( totalWidth );
                } );

                carouselElems.handle.width( handleWidth.pxWidth );

                controlclickEvents( carouselElems, cardMeasures.outerWidth );

                if ( $( 'html' ).hasClass( 'rtl' ) ) {
                    carouselElems.handle.css( {
                        right: '0px'
                    } );
                }

                carouselElems.scrolly.bind( 'scroll', function() {
                    var trackCalc = scrollCalculations( this, totalWidth, carouselMeasures, handleWidth.remainder );

                    carouselElems.handle.css( {
                        right: 'initial',
                        left: trackCalc + 'px'
                    } );

                    buttonStates( carouselElems );
                } );

            } );
        }
    }

    if ( $( '.js-scroll-carousel' ).length > 0 ) {
        scrollCarousel.init();
    }

    function getElements( element ) {
        var obj = {
            list: $( element ).find( '.scroll-carousel__list' ),
            scrolly: $( element ).find( '.scroll-carousel__visible' ),
            left: $( element ).find( '.scroll-carousel__button--prev' ),
            right: $( element ).find( '.scroll-carousel__button--next' ),
            handle: $( element ).find( '.scrollbar__indicator' ),
        }
        return obj;
    }

    function getCards( element ) {
        var width = $( document ).width();
        // card carousel
        var cardWidth = $( '.scroll-carousel__item' ).width()

        // event carousel
        if ( $( '.event .scroll-carousel__item' ) == null ) {
            var obj = {
                width: cardWidth, //Width of a single card
                count: $( element ).find( '.scroll-carousel__item' ).length, //Amount of Card in the Carousel
                margin: width >= 768 ? 16 : 8,
                outerWidth: null,
                flushWidth: null,
            }
        } else {
            var obj = {
                width: cardWidth, //Width of a single card
                count: $( element ).find( '.scroll-carousel__item' ).length, //Amount of Card in the Carousel
                margin: 8,
                outerWidth: null,
                flushWidth: null,
            }
        }

        obj.outerWidth = obj.width + obj.margin; //Card + Margin
        obj.flushWidth = ( obj.outerWidth * ( obj.count - 1 ) ) + obj.width;

        return obj;
    }

    function getViewport( element ) {
        var obj = {
            gradOffset: 87, //Offset Value needed to accomodate for Gradients on either side
            containerViewport: $( element ).find( '.scroll-carousel__container' ).width(), // Viewable Portaion of the Slider
        }
        return obj;
    }

    function configureHandle( cardOuterwidth, containerViewport, totalWidth ) {
        var handleCalc = ( cardOuterwidth / totalWidth ) * 100,
            handleWidth = handleCalc * ( containerViewport / cardOuterwidth ),
            pxWidth = containerViewport / 100 * handleWidth,
            remainder = containerViewport - pxWidth;

        var obj = {
            pxWidth: pxWidth + 'px',
            remainder: remainder
        };

        return obj;
    }

    function controlclickEvents( carouselElems, cardOuterwidth ) {

        if ( $( 'html' ).hasClass( 'rtl' ) ) {
            carouselElems.right.prop( "disabled", true );
        } else {
            carouselElems.left.prop( "disabled", true );
        }

        carouselElems.left.on( 'click', function( event ) {
            event.preventDefault();
            if ( !carouselElems.scrolly.scrollLeft() == 0 ) {
                carouselElems.scrolly.animate( {
                    scrollLeft: '-=' + cardOuterwidth + 'px'
                }, 400 );
            }
        } );

        carouselElems.right.on( 'click', function( event ) {
            event.preventDefault();
            if ( !( carouselElems.scrolly.scrollLeft() + carouselElems.scrolly.innerWidth() >= carouselElems.scrolly[ 0 ].scrollWidth ) ) {
                carouselElems.scrolly.animate( {
                    scrollLeft: '+=' + cardOuterwidth + 'px'
                }, 400 );
            }
        } );

    }

    var scrollInitial = null;

    function scrollCalculations( scrolly, totalWidth, carouselMeasures, remainder ) {
        if ( scrollInitial === null ) {
            scrollInitial = $( scrolly ).scrollLeft();
        }
        var documentScrollLeft = $( scrolly ).scrollLeft(),
            oHang = totalWidth - carouselMeasures.containerViewport - carouselMeasures.gradOffset,
            scrollPercent = ( documentScrollLeft / oHang ) * 100,
            setTrackScroll = ( remainder / 100 ) * scrollPercent;

        if ( scrollInitial <= 0 ) {
            oHang = totalWidth - carouselMeasures.containerViewport - carouselMeasures.gradOffset;
            scrollPercent = ( Math.abs( documentScrollLeft ) / oHang ) * 100;
            setTrackScroll = ( remainder / 100 ) * scrollPercent;
        }

        return setTrackScroll;
    }

    function buttonStates( carouselElems ) {

        if ( $( carouselElems.scrolly ).scrollLeft() + $( carouselElems.scrolly ).innerWidth() >= $( carouselElems.scrolly )[ 0 ].scrollWidth ) {
            carouselElems.right.prop( "disabled", true );
            return false;
        } else {
            carouselElems.right.prop( "disabled", false );
        }

        if ( $( carouselElems.scrolly ).scrollLeft() == 0 ) {
            carouselElems.left.prop( "disabled", true );
            return false;
        } else {
            carouselElems.left.prop( "disabled", false );
        }

    }


    return scrollCarousel;

} );
require(['jquery-1.9'], function($) {
	'use strict';

	var tabs = {

		el: {
			$hasTabs: $(".js-tabs").length,
			$tabLink: $(".tabs__link"),
			$moreTabs: $('#tabs .tabs__more'),
			$moreTabsLink: $('#tabs .tabs__more .tabs__link'),
			$hasFilters: $(".tabs--filter").length
        },

		init: function () {

			if(tabs.el.$hasTabs > 0){
				tabs.clickTabs();	
			}
			if(tabs.el.$hasFilters > 0){
				$(window).resize(function() {
					tabs.respondTabs();
		        });

		        setTimeout(tabs.respondTabs, 100);
				
				tabs.el.$moreTabsLink.on('click', function(event) {
					event.preventDefault();
				    $('.tabs--filter').toggleClass('open');
				});
			}
		},

		clickTabs: function () {
			$("li[role='tab']").click(function(event){
				event.preventDefault();
				$("li[role='tab']:not(this)").attr("aria-selected","false");
				$(this).attr("aria-selected","true");

		  		var tabpanid= $(this).attr("aria-controls");
		   		var tabpan = $("#"+tabpanid);
				
				$("div[role='tabpanel']:not(tabpan)").attr("aria-hidden","true");
				$("div[role='tabpanel']:not(tabpan)").addClass("hidden");

				tabpan.removeClass("hidden");
				tabpan.attr("aria-hidden","false");		
		  	});
		  
		  	$("li[role='tab']").keydown(function(ev) {
				if (ev.which ==13) {
					$(this).click();
				}
			}); 
		  
		   	$("li[role='tab']").keydown(function(ev) {
				if ((ev.which ==39)||(ev.which ==37))  {
					var selected= $(this).attr("aria-selected");
					if  (selected =="true"){
						$("li[aria-selected='false']").attr("aria-selected","true").focus() ;
						$(this).attr("aria-selected","false");

		  				var tabpanid= $("li[aria-selected='true']").attr("aria-controls");
		   				var tabpan = $("#"+tabpanid);
		
						$("div[role='tabpanel']:not(tabpan)").attr("aria-hidden","true");
						$("div[role='tabpanel']:not(tabpan)").addClass("hidden");

						tabpan.attr("aria-hidden","false");
						tabpan.removeClass("hidden");

					}
				}
			});
		},

		respondTabs: function () {
			tabs.el.$moreTabs.before($('#tabsOverflow > li'));
  
			var $tabItemMore = $('#tabs > li.tabs__more'),
				$tabFilter = $('#tabs > li:first-child'),
				$tabItems = $('#tabs > li:not(.tabs__more)'),
				$tabItemWidth = $tabItemMore.outerWidth(),
				$tabItemMoreWidth = $tabItemMore.outerWidth(),
				$tab = $('#tabs').outerWidth(),
				$tabItemMoreLeft, $offset, $tabOverflowWidth;

			$tabItems.each(function() {
				$tabItemWidth += $(this).outerWidth();
			});

			$tabItemWidth > $tab ? $tabItemMore.show() : $tabItemMore.hide();

			while ($tabItemWidth > $tab) {
				$tabItemWidth -= $tabItems.last().outerWidth();
				$tabItems.last().prependTo('#tabsOverflow');
				$tabItems.splice(-1,1);
			}

			$tabItemMoreLeft = $('#tabs .tabs__more').offset().left;
			$tabOverflowWidth = $('#tabsOverflow').outerWidth();  
			$offset = $tabItemMoreLeft + $tabItemMoreWidth - $tabOverflowWidth;
		}
	};

	tabs.init();

	return tabs;

});
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
require(['jquery-1.9'], function($) {
	'use strict';

	var mandMenu = {

		el: {
			$nav: $("#mandatoryNav")
        },

		init: function () {
			var stickyTop = mandMenu.el.$nav.offset().top;

	        $(window).scroll(function() {    
	            var scroll = $(window).scrollTop();

	            if (scroll >= stickyTop) {
	                mandMenu.el.$nav.addClass("sticky");
	            } else {
	                mandMenu.el.$nav.removeClass("sticky");
	            }
	        });

	        mandMenu.scrolltoSection();
		},

		scrolltoSection: function () {
			$('.list__nav').on('click', function (e) {
	            var targetSection = $(this).attr('href');
	            e.preventDefault();
	            $('html,body').animate({
	                scrollTop: $(targetSection).offset().top
	            }, 700);
	            $(targetSection).focus();
	        });
	    }
	};

	if( mandMenu.el.$nav.length ){
		mandMenu.init();
	}

	return mandMenu;

});


	
require(['jquery-1.9'], function($) {
	'use strict';

	var mobileMenu = {

		el: {
            $header: $('.header'),
            $nav: $('.nav'),
            $mButton: $('.nav__menu-btn')
        },
        menuOpenClass: 'menu-open',
        searchOpenClass: 'search-open',

		init: function () {
			mobileMenu.menuTouch();
		},

		menuTouch: function () {
			mobileMenu.el.$mButton.on('click', function(event) {
	            event.preventDefault();
	        	mobileMenu.el.$header.toggleClass(mobileMenu.menuOpenClass).removeClass(mobileMenu.searchOpenClass);
	        	mobileMenu.el.$nav.toggleClass(mobileMenu.menuOpenClass);
	        });
		}
	};

	mobileMenu.init();

	return mobileMenu;

});
require(['jquery-1.9'], function($) {
	'use strict';

	var respondMenu = {

		windowWidth: $(window).width(),

		init: function () {
			if(respondMenu.windowWidth > 767){
	            respondMenu.navigationResize();
	        }
	        $(window).resize(function() {
	            var width = $(document).width();
	            if (width > 767){
	                respondMenu.navigationResize();
	            }
	        });

	        $('.more').focus( function () {
				$('#overflow').css({
					'opacity': '1',
					'visibility': 'visible'
				});
			});

			$('#overflow').find('.movedLi:last-of-type').focusout( function () {
				$(this).parent().hide().removeAttr('style');
			});
		},

		navigationResize: function () {
			$('#nav li.more').before($('#overflow > li'));
  
			var $navItemMore = $('#nav > li.more'),
				$navItems = $('#nav > li:not(.more)'),
				$overflowItems = $('.movedLi'),
				navItemWidth = $navItemMore.width(),
				navItemMoreWidth = $navItemMore.width(),
				nav = $('.nav').width(),
				navItemMoreLeft, offset, navOverflowWidth;

			$navItems.each(function() {
				navItemWidth += $(this).width();
			});

			navItemWidth > nav ? $navItemMore.show() : $navItemMore.hide();

			while (navItemWidth > nav) {
				navItemWidth -= $navItems.last().width();
				$navItems.last().prependTo('#overflow').addClass('movedLi');
				$navItems.splice(-1,1);
			}

			navItemMoreLeft = $('#nav .more').offset().left;
			navOverflowWidth = $('#overflow').width();  
			offset = navItemMoreLeft + navItemMoreWidth - navOverflowWidth;
	    }
	};

	//respondMenu.init();

	return respondMenu;

});
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
require(['jquery-1.9'], function($) {
	'use strict';

	var mobileSearch = {

		el: {
			$headerSearch: $('#search01'),
            $header: $('.header'),
            $input: $('#search01').find('.search__input'),
            $button: $('#search01').find('.search__button'),
            $closeButton: $('#search01').find('.search__button--close')
        },
        searchOpenClass: 'search-open',
        searchButtonClicked: false,
        windowWidth: $(window).width(),	

		init: function () {
			if(mobileSearch.windowWidth <= 768){
            	mobileSearch.mobile();
	        }else if(mobileSearch.windowWidth > 768){
	            mobileSearch.desktop();
	        }
	        $(window).resize(function() {
	            var width = $(document).width();
	            if (width <= 768) {
	                mobileSearch.mobile();
	            }else if(width > 768){
	                mobileSearch.desktop();
	            }
	        });
		},

		mobile: function () {
		    mobileSearch.el.$button.on('click', function(event) {
		        if (mobileSearch.el.$header.hasClass(mobileSearch.searchOpenClass)) {
		            mobileSearch.searchButtonClicked = true;
		            return;
		        } else {
		            event.preventDefault();
		            mobileSearch.el.$header.addClass(mobileSearch.searchOpenClass);
		            mobileSearch.el.$input.focus();
		            mobileSearch.assignInputBlur();
		            mobileSearch.closeSearch();
		            $('.search__button--clear').removeClass('active');
		        }
		    });
		},

		desktop: function () {
			mobileSearch.el.$header.removeClass(mobileSearch.searchOpenClass);
			mobileSearch.searchButtonClicked = true;

            mobileSearch.el.$button.unbind('click').on('click', function() {
                if (mobileSearch.el.$header.hasClass(mobileSearch.searchOpenClass)) {
                    return true;
                }
            });
        },

        assignInputBlur: function () {
            mobileSearch.el.$input.on('blur', function() {
                setTimeout(function() {
                    if (mobileSearch.el.$header.hasClass(mobileSearch.searchOpenClass) && mobileSearch.searchButtonClicked == false) {
                        mobileSearch.el.$header.removeClass(mobileSearch.searchOpenClass);
                        mobileSearch.el.$input.val('');
                        $('.search__button--clear').removeClass('active');
                    }
                }, 200);
            });
        },

        closeSearch: function () {
            mobileSearch.el.$closeButton.on('click', function() {
                mobileSearch.el.$header.removeClass(mobileSearch.searchOpenClass);
                mobileSearch.el.$input.val('');
                $('.search__button--clear').removeClass('active');
            });
        }
	};

	mobileSearch.init();

	return mobileSearch;

});
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