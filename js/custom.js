$(function(){


$(window).stellar();

    var links = $('.navigation').find('li');
    slide = $('.slide');
    button = $('.button');
    mywindow = $(window);
    htmlbody = $('html,body');

    slide.waypoint(function (event, direction) {

        dataslide = $(this).attr('data-slide');

        if (direction === 'down') {
            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
			$('.navigation li[data-slide="1"]').removeClass('active');
        }
        else {
            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').next().removeClass('active');
        }
    });

    mywindow.scroll(function () {
        if (mywindow.scrollTop() == 0) {
            $('.navigation li[data-slide="1"]').addClass('active');
            $('.navigation li[data-slide="2"]').removeClass('active');
        }
    });

	function goToByScroll(dataslide) {
		var goal = $('.slide[data-slide="' + dataslide + '"]').offset().top;
		if (mywindow.scrollTop()<goal) {
			var goalPx = goal + 1;
		} else {
			var goalPx = goal - 1;
		}
        htmlbody.animate({
            scrollTop: goalPx
        }, 1500, 'easeInOutQuint');
    }

	links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });

    button.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);

    });

	// Lazybox
		$("a[rel^='lazybox']").lazybox({opacity: 0.8, modal: false, close: false, fixed: true});

	// Sticky Navigation
		$(".menu").sticky({topSpacing:0});

});

// Sort Portfolio
$(function(){

  $('.projects').isotope({ itemSelector : '.element' });

});
