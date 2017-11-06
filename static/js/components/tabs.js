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