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
