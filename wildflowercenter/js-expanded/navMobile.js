	var page = document.getElementById('whitewrap');
page.outerHTML += '<div id="mobile-menu-overlay"></div><div id="mobile-menu-btn"><div id="menu-btn"><span></span><span></span><span></span></div></div>';


// Set what happens when the menu is clicked
jQuery(document).ready(function($) {

	$('#mobile-menu-btn').click(function() {
		$(this).toggleClass('return-body');
		$('#whitewrap').toggleClass('no-scroll');
		$('#menu-btn').toggleClass('menu-btn-nocolor');
		$('#mobile-menu-overlay').toggleClass('expand');
		$('#mobile-menu-wrap').toggleClass('show-menu');
	});

	$('#mobile-menu-btn').click(function() {
		if ($('#mobile-menu-btn').hasClass('return-body')) {
			console.log('Has class');
			$('body').on('touchmove', function (e) {
				if (!$('.show-menu').has($(e.target)).length) e.preventDefault();
			});
		} else {
			console.log('No class');
			$('body').off();
		};
	});

	// $('body').on('touchmove', function (e) {
	//     if (!$('.show-menu').has($(e.target)).length) e.preventDefault();
	//  });


					
});

// Set up the menu
var mobile_menu = document.getElementById('mobile-menu-overlay');

var main_nav_visit = [
	'<div id="mobile-visit" class="mobile-menu-container">',
		'<div class="mobile-main-nav"><h3><a href="/">Visit</a></h3></div>',
		'<div class="mobile-subnav"><ul class="mobile-subnav-list"><ul></div>',
	'</div>'
].join('');

var main_nav_plants = [
	'<div id="mobile-plants" class="mobile-menu-container">',
		'<div class="mobile-main-nav"><h3><a href="/">Plants</a></h3></div>',
		'<div class="mobile-subnav"><ul class="mobile-subnav-list"><ul></div>',
	'</div>'
].join('');

var main_nav_learn = [
	'<div id="mobile-learn" class="mobile-menu-container">',
		'<div class="mobile-main-nav"><h3><a href="/">Learn</a></h3></div>',
		'<div class="mobile-subnav"><ul class="mobile-subnav-list"><ul></div>',
	'</div>'
].join('');

var main_nav_work = [
	'<div id="mobile-work" class="mobile-menu-container">',
		'<div class="mobile-main-nav"><h3><a href="/">Work</a></h3></div>',
		'<div class="mobile-subnav"><ul class="mobile-subnav-list"><ul></div>',
	'</div>'
].join('');

var main_nav_news = [
	'<div id="mobile-news" class="mobile-menu-container">',
		'<div class="mobile-main-nav"><h3><a href="/">News</a></h3></div>',
		'<div class="mobile-subnav"><ul class="mobile-subnav-list"><ul></div>',
	'</div>'
].join('');

var codeGoogleSearch = [
	'<form name="searchform" method="get" action="//www.google.com/search" autocomplete="off">',
		'<input type="hidden" name="sitesearch" value="www.wildflower.org">',
		'<input type="text" id="header_search_field" name="as_q" placeholder="What are you looking for?">',
		'<button id="header_search_field_go" type="submit" value="Go">GO</button>',
	'</form>'
].join('');

var main_nav_search = [
	'<div id="mobile-search" class="mobile-menu-container">',
		'<div class="mobile-main-nav"><h3>Search</h3></div>',
		'<div class="mobile-subnav">' + codeGoogleSearch + '</div>',
	'</div>'
].join('');


// Display the menu
mobile_menu.outerHTML += '<div id="mobile-menu-wrap"><div id="mobile-menu-centering">' + main_nav_visit + main_nav_plants + main_nav_learn + main_nav_work + main_nav_news + main_nav_search + '</div></div>';

jQuery(document).ready(function($) {

	$.getJSON('//localhost:8888/wildflower_2/wordpress/wp-content/themes/wildflowercenter/json/takeoverNavData.json', function(data) {

		var visitLinks = '',
			visitURL;

		for (var i = 0; i < data.nav_visit_links.length; i++) {
			for (key in data.nav_visit_links[i]) {
				if (data.nav_visit_links[i].hasOwnProperty(key)) {
					visitURL = data.nav_visit_links[i][key];
					visitLinks += '<li><a href="' + visitURL + '">' + key + '</a></li>';
					$('#mobile-visit > .mobile-subnav > .mobile-subnav-list').html(visitLinks);
				}
			}
		};

		var plantsLinks = '',
			plantsURL;

		for (var i = 0; i < data.nav_plants_links.length; i++) {
			for (key in data.nav_plants_links[i]) {
				if (data.nav_plants_links[i].hasOwnProperty(key)) {
					plantsURL = data.nav_plants_links[i][key];
					plantsLinks += '<li><a href="' + plantsURL + '">' + key + '</a></li>';
					$('#mobile-plants > .mobile-subnav > .mobile-subnav-list').html(plantsLinks);
				}
			}
		};

		var learnLinks = '',
			learnURL;

		for (var i = 0; i < data.nav_learn_links.length; i++) {
			for (key in data.nav_learn_links[i]) {
				if (data.nav_learn_links[i].hasOwnProperty(key)) {
					learnURL = data.nav_learn_links[i][key];
					learnLinks += '<li><a href="' + learnURL + '">' + key + '</a></li>';
					$('#mobile-learn > .mobile-subnav > .mobile-subnav-list').html(learnLinks);
				}
			}
		};

		var workLinks = '',
			workURL;

		for (var i = 0; i < data.nav_work_links.length; i++) {
			for (key in data.nav_work_links[i]) {
				if (data.nav_work_links[i].hasOwnProperty(key)) {
					workURL = data.nav_work_links[i][key];
					workLinks += '<li><a href="' + workURL + '">' + key + '</a></li>';
					$('#mobile-work > .mobile-subnav > .mobile-subnav-list').html(workLinks);
				}
			}
		};

		var newsLinks = '',
			newsURL;

		for (var i = 0; i < data.nav_news_links.length; i++) {
			for (key in data.nav_news_links[i]) {
				if (data.nav_news_links[i].hasOwnProperty(key)) {
					newsURL = data.nav_news_links[i][key];
					newsLinks += '<li><a href="' + newsURL + '">' + key + '</a></li>';
					$('#mobile-news > .mobile-subnav > .mobile-subnav-list').html(newsLinks);
				}
			}
		};


	});

});