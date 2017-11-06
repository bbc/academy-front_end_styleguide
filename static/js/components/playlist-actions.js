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