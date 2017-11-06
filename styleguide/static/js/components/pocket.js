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