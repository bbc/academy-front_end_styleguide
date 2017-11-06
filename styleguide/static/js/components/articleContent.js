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