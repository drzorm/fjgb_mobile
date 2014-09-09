
(function($) {
	$.fn.touchwipe = function(settings) {
		var config = {
			min_move_x: 20,
			min_move_y: 20,
			wipeLeft: function() {},
			wipeRight: function() {},
			wipeUp: function() {},
			wipeDown: function() {},
			preventDefaultEvents: true
		};
		if (settings == 'destroy') {
			this.each(function() {
				$(this).trigger('destroy')
			});
			return
		};
		if (settings) $.extend(config, settings);
		this.each(function() {
			var startX;
			var startY;
			var isMoving = false;
			function cancelTouch() {
				this.removeEventListener('touchmove', onTouchMove);
				startX = null;
				isMoving = false
			};
			function onTouchMove(e) {
				if (config.preventDefaultEvents) {
					e.preventDefault()
				};
				if (isMoving) {
					var x = e.touches[0].pageX;
					var y = e.touches[0].pageY;
					var dx = startX - x;
					var dy = startY - y;
					if (Math.abs(dx) >= config.min_move_x) {
						cancelTouch();
						if (dx > 0) {
							config.wipeLeft()
						} else {
							config.wipeRight()
						}
					} else if (Math.abs(dy) >= config.min_move_y) {
						cancelTouch();
						if (dy > 0) {
							config.wipeDown()
						} else {
							config.wipeUp()
						}
					}
				}
			};
			function onTouchStart(e) {
				if (e.touches.length == 1) {
					startX = e.touches[0].pageX;
					startY = e.touches[0].pageY;
					isMoving = true;
					this.addEventListener('touchmove', onTouchMove, false)
				}
			};
			function onDestroy(e) {
				this.removeEventListener('touchmove', onTouchMove);
				this.removeEventListener('touchstart', onTouchStart)
			};
			if ('ontouchstart' in document.documentElement) {
				this.addEventListener('touchstart', onTouchStart, false);
				$(this).bind('destroy', onDestroy)
			}
		});
		return this
	}
})(jQuery);
function getcurrentfilename() {
	pathnameurl = window.location.pathname;
	pathnameurl = pathnameurl.split(".php");
	pathnameurl = pathnameurl[0].split("/");
	urllength = pathnameurl.length - 1;
	return pathnameurl[urllength]
};
$(document).delegate("[data-role='page'].webapp", "pageshow",
function() {

	$('.homeslider:last').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: false,
		touch: false
	});
	$(".homeslider img").touchwipe('destroy');
	$(".homeslider img").touchwipe({
		wipeLeft: function() {
			$('.homeslider:last').flexslider("next")
		},
		wipeRight: function() {
			$('.homeslider:last').flexslider("prev")
		},
		preventDefaultEvents: false
	});

});

var myScroll = [];
var myScroll2 = [];
$(document).delegate("[data-role='page'].webapp", 'pageshow',
function() {
	var $page = $(this);
	$($page.find('#wrapper_menu')).each(function(index) {
		var scroller_id = $(this).get(0);
		myScroll.push(new iScroll(scroller_id, {
			snap: true,
			momentum: false,
			hScrollbar: false
		}))
	});
	$($page.find('#wrapper_homepic')).each(function(index) {
		var scroller_id = $(this).get(0);
		myScroll2.push(new iScroll(scroller_id, {
			snap: true,
			momentum: false,
			hScrollbar: false
		}))
	})
});
$(document).delegate("[data-role='page'].webapp", 'pagehide',
function() {
	for (x in myScroll) {
		myScroll[x].destroy();
		myScroll[x] = null;
		myScroll.splice(x, 1)
	};
	for (x in myScroll2) {
		myScroll2[x].destroy();
		myScroll2[x] = null;
		myScroll2.splice(x, 1)
	}
});