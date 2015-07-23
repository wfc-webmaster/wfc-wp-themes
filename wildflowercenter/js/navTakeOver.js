// Adds a wrapping <div> around both navs to center them but allow the contents to be right aligned

var actionNav = document.getElementById('menu-action-nav').outerHTML,
actionNavWrap = '<div id="menu-action-nav-wrap">' + actionNav + '</div>';

document.getElementById('menu-action-nav').outerHTML = actionNavWrap;

var mainNav = document.getElementById('menu-main-nav'),
	mainNavAdd = mainNav.outerHTML,
	mainNavWrap = '<div id="menu-main-nav-wrap">' + mainNavAdd + '</div>';
	

document.getElementById('menu-main-nav').outerHTML = mainNavWrap;

//Begin Take-Over nav

var takeoverContainer = document.getElementById('takeover-container'),
	navVisit = document.getElementById('menu-item-1779'),
	navPlants = document.getElementById('menu-item-1780'),
	navLearn = document.getElementById('menu-item-1781'),
	navWork = document.getElementById('menu-item-1782'),
	navNews = document.getElementById('menu-item-1783');

// Add takeover subnav content to each parent nav item that follows:

// Visit

var codeVisit = [
	'<div id="visit-takeover" class="takeover-show">',
		'<div id="visit-takeover-wrap" class="takeover-wrap">',
			'<div class="subnav-list-wrap">',
			'<ul class="subnav-list">',				
			'</ul>',
			'</div>',
			'<div class="subnav-images">',
			'</div>',
		'</div>',
	'</div>'
].join('');

// Plants

var codePlants = [
	'<div id="plants-takeover" class="takeover-show">',
		'<div id="plants-takeover-wrap" class="takeover-wrap">',
			'<div class="subnav-list-wrap">',
			'<ul class="subnav-list">',				
			'</ul>',
			'</div>',
			'<div class="subnav-images">',
			'</div>',
		'</div>',
	'</div>'
].join('');

// Learn

var codeLearn = [
	'<div id="learn-takeover" class="takeover-show">',
		'<div id="learn-takeover-wrap" class="takeover-wrap">',
			'<div class="subnav-list-wrap">',
			'<ul class="subnav-list">',				
			'</ul>',
			'</div>',
			'<div class="subnav-images">',
			'</div>',
		'</div>',
	'</div>'
].join('');

// Work

var codeWork = [
	'<div id="work-takeover" class="takeover-show">',
		'<div id="work-takeover-wrap" class="takeover-wrap">',
			'<div class="subnav-list-wrap">',
			'<ul class="subnav-list">',				
			'</ul>',
			'</div>',
			'<div class="subnav-images">',
			'</div>',
		'</div>',
	'</div>'
].join('');

// News

var codeNews = [
	'<div id="news-takeover" class="takeover-show">',
		'<div id="news-takeover-wrap" class="takeover-wrap">',
			'<div class="subnav-list-wrap">',
			'<ul class="subnav-list">',				
			'</ul>',
			'</div>',
			'<div class="subnav-images">',
			'</div>',
		'</div>',
	'</div>'
].join('');

// Adds the takeover subnav to the page
	
navVisit.innerHTML += codeVisit;
navPlants.innerHTML += codePlants;
navLearn.innerHTML += codeLearn;
navWork.innerHTML += codeWork;
navNews.innerHTML += codeNews;	

// Controls the Show/Hide of the takeover subnav

jQuery(document).ready(function($) {

	$('#menu-main-nav > li').hover(function() {
		$(this).addClass('active-nav');
		$(this).children('.takeover-show').css('display', 'table');
	},

	 function() {    		
		$('.takeover-show').hide();
		$(this).removeClass('active-nav');
	});

	if ($(window).width() < 769 && !$('#menu-main-nav > li').hasClass('active-nav')) {

		$('ul#menu-main-nav > li > a').replaceWith(function() {
			return $(this).contents();
		});

		$('ul#menu-main-nav > li').addClass('nav-responsive-touch');

		$('#menu-main-nav > li').click(function() {
			console.log('You clicked it.');
		});
}

// DoubleTapToGo by Osvaldas Valutis :: www.osvaldas.info :: Available for use under the MIT License
	
	$.fn.doubleTapToGo = function(params) {
			if( !( 'ontouchstart' in window ) &&
				!navigator.msMaxTouchPoints &&
				!navigator.userAgent.toLowerCase().match( /windows phone os 7/i ) ) return false;

			this.each( function() {
				var curItem = false;

				$( this ).on( 'click', function(e) {
					var item = $( this );
					if (item[0] != curItem[0]) {
						e.preventDefault();
						curItem = item;
					}
				});

				$(document).on('click touchstart MSPointerDown', function(e) {
					var resetItem = true,
						parents	= $(e.target).parents();

					for (var i = 0; i < parents.length; i++)
						if(parents[i] == curItem[0])
							resetItem = false;

					if(resetItem)
						curItem = false;
				});
			});
			return this;
		};

	$('#menu-main-nav > li').doubleTapToGo();

// Get link and image data from JSON file and insert it into takeover subnav		

	$.getJSON('wp-content/themes/wildflowercenter/json/takeoverNavData.json', function(data) {
						
			// Gets JSON data and inserts it into Visit subnav

			var visitLinks = '',
				visitURL;

			for (var i = 0; i < data.nav_visit_links.length; i++) {
				for (key in data.nav_visit_links[i]) {
					if (data.nav_visit_links[i].hasOwnProperty(key)) {
						visitURL = data.nav_visit_links[i][key];
						visitLinks += '<li><a href="' + visitURL + '">' + key + '</a></li>';
						$('#visit-takeover-wrap > .subnav-list-wrap > .subnav-list').html(visitLinks);
					}
				}
			};

			$.each(data.nav_visit_pics, function(i, nav_visit_pic) {
				var imageContainer = $('<div>').attr('class', 'subnav-img-container'),
					image = $('<img/>').attr('src', nav_visit_pic.image),
					imageLink = $('<a>').attr('href', nav_visit_pic.url);
					imageCap = $('<p>').append(nav_visit_pic.caption);

				imageLink.append(image);
				imageContainer.append(imageLink);
				imageContainer.append(imageCap);
				$('#visit-takeover-wrap .subnav-images').append(imageContainer);
			});

			// Gets JSON data and inserts it into Plants subnav

			var plantsLinks = '',
				plantsURL;

			for (var i = 0; i < data.nav_plants_links.length; i++) {
				for (key in data.nav_plants_links[i]) {
					if (data.nav_plants_links[i].hasOwnProperty(key)) {
						plantsURL = data.nav_plants_links[i][key];
						plantsLinks += '<li><a href="' + plantsURL + '">' + key + '</a></li>';
						$('#plants-takeover-wrap > .subnav-list-wrap > .subnav-list').html(plantsLinks);
					}
				}
			};

			$.each(data.nav_plants_pics, function(i, nav_plants_pic) {
				var imageContainer = $('<div>').attr('class', 'subnav-img-container'),
					image = $('<img/>').attr('src', nav_plants_pic.image),
					imageLink = $('<a>').attr('href', nav_plants_pic.url);
					imageCap = $('<p>').append(nav_plants_pic.caption);

				imageLink.append(image);
				imageContainer.append(imageLink);
				imageContainer.append(imageCap);
				$('#plants-takeover-wrap .subnav-images').append(imageContainer);
			});

			// Gets JSON data and inserts it into Learn subnav

			var learnLinks = '',
				learnURL;

			for (var i = 0; i < data.nav_learn_links.length; i++) {
				for (key in data.nav_learn_links[i]) {
					if (data.nav_learn_links[i].hasOwnProperty(key)) {
						learnURL = data.nav_learn_links[i][key];
						learnLinks += '<li><a href="' + learnURL + '">' + key + '</a></li>';
						$('#learn-takeover-wrap > .subnav-list-wrap > .subnav-list').html(learnLinks);
					}
				}
			};

			$.each(data.nav_learn_pics, function(i, nav_learn_pic) {
				var imageContainer = $('<div>').attr('class', 'subnav-img-container'),
					image = $('<img/>').attr('src', nav_learn_pic.image),
					imageLink = $('<a>').attr('href', nav_learn_pic.url);
					imageCap = $('<p>').append(nav_learn_pic.caption);

				imageLink.append(image);
				imageContainer.append(imageLink);
				imageContainer.append(imageCap);
				$('#learn-takeover-wrap .subnav-images').append(imageContainer);
			});

			// Gets JSON data and inserts it into Work subnav

			var workLinks = '',
				workURL;

			for (var i = 0; i < data.nav_work_links.length; i++) {
				for (key in data.nav_work_links[i]) {
					if (data.nav_work_links[i].hasOwnProperty(key)) {
						workURL = data.nav_work_links[i][key];
						workLinks += '<li><a href="' + workURL + '">' + key + '</a></li>';
						$('#work-takeover-wrap > .subnav-list-wrap > .subnav-list').html(workLinks);
					}
				}
			};

			$.each(data.nav_work_pics, function(i, nav_work_pic) {
				var imageContainer = $('<div>').attr('class', 'subnav-img-container'),
					image = $('<img/>').attr('src', nav_work_pic.image),
					imageLink = $('<a>').attr('href', nav_work_pic.url);
					imageCap = $('<p>').append(nav_work_pic.caption);

				imageLink.append(image);
				imageContainer.append(imageLink);
				imageContainer.append(imageCap);
				$('#work-takeover-wrap .subnav-images').append(imageContainer);
			});

			// Gets JSON data and inserts it into News subnav

			var newsLinks = '',
				newsURL;

			for (var i = 0; i < data.nav_news_links.length; i++) {
				for (key in data.nav_news_links[i]) {
					if (data.nav_news_links[i].hasOwnProperty(key)) {
						newsURL = data.nav_news_links[i][key];
						newsLinks += '<li><a href="' + newsURL + '">' + key + '</a></li>';
						$('#news-takeover-wrap > .subnav-list-wrap > .subnav-list').html(newsLinks);
					}
				}
			};

			$.each(data.nav_news_pics, function(i, nav_news_pic) {
				var imageContainer = $('<div>').attr('class', 'subnav-img-container'),
					image = $('<img/>').attr('src', nav_news_pic.image),
					imageLink = $('<a>').attr('href', nav_news_pic.url);
					imageCap = $('<p>').append(nav_news_pic.caption);

				imageLink.append(image);
				imageContainer.append(imageLink);
				imageContainer.append(imageCap);
				$('#news-takeover-wrap .subnav-images').append(imageContainer);
			});


	});

});