

(function(){
	$(document).ready(function() {
		function slider(){
			$('.slider-area .bxslider').bxSlider({
				captions: false,
				slideWidth: 1200,
				pager : false,
				minSlides: 6,
				maxSlides: 6,
				moveSlides: 1,
				slideMargin: 30,
				infiniteLoop: true,
			});
		}
		slider();
	});

})();
