jQuery(document).ready(function($) {

	// MAIN NAV
	var navVisit = document.getElementById('menu-item-1919');
	var navPlants = document.getElementById('menu-item-1918');
	var navLearn = document.getElementById('menu-item-1917');
	var navOurWork = document.getElementById('menu-item-1916');
	var navNews = document.getElementById('menu-item-1948');

	var mainNavArr = [navVisit, navPlants, navLearn, navOurWork, navNews];

	// SUB NAV
	var subNavBlock = document.getElementById('block-b7q56a906c3d19c4');
	var subNavVisit = document.getElementById('header-nav-sub-visit');
	var subNavPlants = document.getElementById('header-nav-sub-plants');
	var subNavLearn = document.getElementById('header-nav-sub-learn');
	var subNavOurWork = document.getElementById('header-nav-sub-work');
	var subNavNews = document.getElementById('header-nav-sub-news');

	var subNavArr = [subNavVisit, subNavPlants, subNavLearn, subNavOurWork, subNavNews];

	// Hide nav arrow
	function hideNavArrow() {
		$('#menu-navigation-main > li > a').filter(function() {
			return ($(this).hasClass('show-arrow'))
		}).removeClass('show-arrow');
	}

	// Show sub-nav block on main-nav item hover
	$(mainNavArr).hover(function() {
		$(subNavBlock).css('display', 'block');
		if ($(subNavArr).hasClass('active')) {
			$(subNavArr).removeClass('active');			
		}
		hideNavArrow();		
	});
		
	var timer;

	function navTimeout() {
		timer = setTimeout(function() {
			$(subNavBlock).css('display', '');
			hideNavArrow();
		}, 500);
	}		
			
	// Hide sub-nav block
	$('#header-nav-main').mouseleave(function() {
		navTimeout();
	});

	// Show nav arrow
	$('#menu-navigation-main > li').hover(function() {
		$(this).children('a').addClass('show-arrow');					
	});


	// Show/Hide sub-nav menu on main-nav item hover
	function showHideSubNav(i) {
		$(mainNavArr[i]).hover(function() {
			$(subNavArr[i]).addClass('active');	
		});
		$(subNavArr[i]).hover(function() {
			$(subNavBlock).css('display', 'block');
			$(subNavArr[i]).addClass('active');
			clearTimeout(timer);
		},
			function() {
		 	$(subNavBlock).hide();
		 	$(subNavArr).removeClass('active');
		 	hideNavArrow();	
		});
	}

	// Visit
	showHideSubNav(0);

	// Plants
	showHideSubNav(1);

	// Learn
	showHideSubNav(2);

	// Our Work
	showHideSubNav(3);

	// News
	showHideSubNav(4);

});
