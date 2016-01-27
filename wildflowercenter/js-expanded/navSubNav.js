jQuery(document).ready(function($) {

	// MAIN NAV
	var navVisit = document.getElementById('menu-item-1919');
	var navPlants = document.getElementById('menu-item-1918');
	var navLearn = document.getElementById('menu-item-1917');
	var navOurWork = document.getElementById('menu-item-1916');
	var navNews = document.getElementById('menu-item-1878');

	// SUB NAV
	var subNavBlock = document.getElementById('block-b7q56a906c3d19c4');
	var subNavVisit = document.getElementById('header-nav-sub-visit');
	var subNavPlants = document.getElementById('header-nav-sub-plants');
	var subNavLearn = document.getElementById('header-nav-sub-learn');
	var subNavOurWork = document.getElementById('header-nav-sub-work');
	var subNavNews = document.getElementById('header-nav-sub-news');

	// Show/Hide sub-nav block on main-nav item hover
	$([navVisit, navPlants, navLearn, navOurWork, navNews]).hover(function() {
		$(subNavBlock).css('display', 'block');
		console.log('Howdy!');
	},
	function() {
		$(subNavBlock).hide();
	
	});

	// Show/Hide sub-nav menu on main-nav item hover
	$(navVisit).hover(function() {
		$(subNavVisit).removeClass('hide-nav');
	},
	function() {
		$(subNavVisit).addClass('hide-nav');
	});

});
