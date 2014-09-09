/*   banner   */
	var bannerlen = $('#banner .photo').find('li').length;
	var bnow,bpre,bnext;
	

//banner 点击左边的按钮事件
	$('#banner').find('.pre').click(function(){
		
		$('#banner .photo').find('li').each(function(index) {
			if($(this).attr('class') == 'on'){
				bnow = index;
				if(index == 0){
					bpre = bannerlen - 1;	
				}else{
					bpre = bnow - 1;	
				}
			}
		});
		
		$('#banner .photo').find('li').eq(bpre).attr('class','on').siblings().attr('class','');
		$('#banner_cir').find('a').eq(bpre).attr('class','on').siblings().attr('class','');
	});

//banner 点击右边的按钮事

	$('#banner').find('.next').click(function(){
		$('#banner .photo').find('li').each(function(index) {
			if($(this).attr('class') == 'on'){
				bnow = index;
				if(index == bannerlen - 1){
					bnext = 0;	
				}else{
					bnext = bnow + 1;	
				}
			}
		});	
		
		$('#banner .photo').find('li').eq(bnext).attr('class','on').siblings().attr('class','');
		$('#banner_cir').find('a').eq(bnext).attr('class','on').siblings().attr('class','');
	});

/*  banner swipre begin */

	var banner_photo = document.getElementById('banner_photo');
	
	banner_photo.addEventListener("touchstart", touchStart0, false);
	banner_photo.addEventListener("touchmove", touchMove0, false);
	banner_photo.addEventListener("touchend", touchEnd0, false);
	
	function touchStart0(event,target) {
		
		event.preventDefault();
		var touch = event.targetTouches[0]; //位于当前DOM元素上的手指的一个列表
		startX = touch.pageX;
		moveX = 0;
		
	}
	function touchMove0(event) {
		
		event.preventDefault();
		var touch = event.touches[0];
		moveX = touch.pageX - startX;
	}
	
	function touchEnd0(event) {
		event.preventDefault();
	   if(moveX > 50){		
			//有左向右滑动的时候，显示上一张
			var bannerpre;
			$('#banner_photo').find('li').each(function() {
				if($(this).attr('class') == 'on'){
					if($(this).index() == 0){
						banner_photo = $('#banner_photo').find('li').length - 1;
					}else{
						banner_photo = $(this).index() - 1;	
					}
				}
			});
			$('#banner .photo').find('li').eq(banner_photo).attr('class','on').siblings().attr('class','');
			$('#banner_cir').find('a').eq(banner_photo).attr('class','on').siblings().attr('class','');
			
	   }else if(moveX < -50){	
			//由右向左滑动的时候，显示下一张
			var bannernext;
			$('#banner_photo').find('li').each(function() {
				if($(this).attr('class') == 'on'){
					if($(this).index() == $('#banner_photo').find('li').length - 1){
						bannernext = 0;
					}else{
						bannernext = $(this).index() + 1;	
					}
				}
			});
			$('#banner .photo').find('li').eq(bannernext).attr('class','on').siblings().attr('class','');
			$('#banner_cir').find('a').eq(bannernext).attr('class','on').siblings().attr('class','');
	   }
	}
	



/* banner swipre end*/

/* 0618 banner cir */
var bannercir_count = $('#banner_photo').find('li').length - 1;
for(var b = 0; b < bannercir_count; b++){
	$('#banner_cir').append('<a> </a>');	
}
$('#banner_cir').css('margin-left',($(window).width() - 20*(bannercir_count+1))/2 + 'px');