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
