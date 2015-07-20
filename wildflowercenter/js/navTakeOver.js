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
				'<li><a href="">Visit Item 1</a></li>',
				'<li><a href="">Visit Item 2</a></li>',
				'<li><a href="">Visit Item 3</a></li>',
			'</ul>',
			'</div>',
			'<div class="subnav-images">',
				'<div class="subnav-img-container">',
				'<a href=""><img src="wp-content/uploads/2013/03/image-alignment-150x150.jpg" /></a>',
				'<p>Caption text here.</p>',
				'</div>',
				'<div class="subnav-img-container">',
				'<a href=""><img src="wp-content/uploads/2013/03/image-alignment-150x150.jpg" /></a>',
				'<p>Caption text here.</p>',
				'</div>',
				'<div class="subnav-img-container">',
				'<a href=""><img src="wp-content/uploads/2013/03/image-alignment-150x150.jpg" /></a>',
				'<p>Caption text here.</p>',
				'</div>',
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
				'<li><a href="">Plants Item 1</a></li>',
				'<li><a href="">Plants Item 2</a></li>',
				'<li><a href="">Plants Item 3</a></li>',
			'</ul>',
			'</div>',
			'<div class="subnav-images">',
				'<div class="subnav-img-container">',
				'<img src="wp-content/uploads/2013/03/image-alignment-150x150.jpg" />',
				'<p>Caption text here.</p>',
				'</div>',
				'<div class="subnav-img-container">',
				'<img src="wp-content/uploads/2013/03/image-alignment-150x150.jpg" />',
				'<p>Caption text here.</p>',
				'</div>',
				'<div class="subnav-img-container">',
				'<img src="wp-content/uploads/2013/03/image-alignment-150x150.jpg" />',
				'<p>Caption text here.</p>',
				'</div>',
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
				'<li><a href="">Learn Item 1</a></li>',
				'<li><a href="">Learn Item 2</a></li>',
				'<li><a href="">Learn Item 3</a></li>',
			'</ul>',
			'</div>',
			'<div class="subnav-images">',
				'<div class="subnav-img-container">',
				'<img src="wp-content/uploads/2013/03/image-alignment-150x150.jpg" />',
				'<p>Caption text here.</p>',
				'</div>',
				'<div class="subnav-img-container">',
				'<img src="wp-content/uploads/2013/03/image-alignment-150x150.jpg" />',
				'<p>Caption text here.</p>',
				'</div>',
				'<div class="subnav-img-container">',
				'<img src="wp-content/uploads/2013/03/image-alignment-150x150.jpg" />',
				'<p>Caption text here.</p>',
				'</div>',
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
				'<li><a href="">Work Item 1</a></li>',
				'<li><a href="">Work Item 2</a></li>',
				'<li><a href="">Work Item 3</a></li>',
			'</ul>',
			'</div>',
			'<div class="subnav-images">',
				'<div class="subnav-img-container">',
				'<img src="wp-content/uploads/2013/03/image-alignment-150x150.jpg" />',
				'<p>Caption text here.</p>',
				'</div>',
				'<div class="subnav-img-container">',
				'<img src="wp-content/uploads/2013/03/image-alignment-150x150.jpg" />',
				'<p>Caption text here.</p>',
				'</div>',
				'<div class="subnav-img-container">',
				'<img src="wp-content/uploads/2013/03/image-alignment-150x150.jpg" />',
				'<p>Caption text here.</p>',
				'</div>',
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
				'<li><a href="">News Item 1</a></li>',
				'<li><a href="">News Item 2</a></li>',
				'<li><a href="">News Item 3</a></li>',
			'</ul>',
			'</div>',
			'<div class="subnav-images">',
				'<div class="subnav-img-container">',
				'<img src="wp-content/uploads/2013/03/image-alignment-150x150.jpg" />',
				'<p>Caption text here.</p>',
				'</div>',
				'<div class="subnav-img-container">',
				'<img src="wp-content/uploads/2013/03/image-alignment-150x150.jpg" />',
				'<p>Caption text here.</p>',
				'</div>',
				'<div class="subnav-img-container">',
				'<img src="wp-content/uploads/2013/03/image-alignment-150x150.jpg" />',
				'<p>Caption text here.</p>',
				'</div>',
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







});