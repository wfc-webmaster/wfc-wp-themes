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

var codeVisit = [
	'<div id="visit-takeover" class="takeover-show">',
		'<div id="visit-takeover-wrap" class="visit-wrap">',
			'<div class="subnav-list-wrap">',
			'<ul class="subnav-list">',
				'<li>Item 1</li>',
				'<li>Item 2</li>',
				'<li>Item 3</li>',
			'</ul>',
			'</div>',
			'<div class="subnav-images">',
			'</div>',
		'</div>',
	'</div>'
].join('');

var codePlants = [
	'<div id="plants-takeover" class="takeover-show">',
		'<div id="plants-takeover-wrap" class="visit-wrap">',
			'<div class="subnav-list-wrap">',
			'<ul class="subnav-list">',
				'<li>Item 4</li>',
				'<li>Item 5</li>',
				'<li>Item 6</li>',
			'</ul>',
			'</div>',
		'</div>',
	'</div>'
].join('');

var codeLearn = [
	'<div id="learn-takeover" class="takeover-show">',
		'<div id="learn-takeover-wrap" class="visit-wrap">',
			'<div class="subnav-list-wrap">',
			'<ul class="subnav-list">',
				'<li>Item 7</li>',
				'<li>Item 8</li>',
				'<li>Item 9</li>',
			'</ul>',
			'</div>',
		'</div>',
	'</div>'
].join('');

var codeWork = [
	'<div id="work-takeover" class="takeover-show">',
		'<div id="work-takeover-wrap" class="visit-wrap">',
			'<div class="subnav-list-wrap">',
			'<ul class="subnav-list">',
				'<li>Item 10</li>',
				'<li>Item 11</li>',
				'<li>Item 12</li>',
			'</ul>',
			'</div>',
		'</div>',
	'</div>'
].join('');

var codeNews = [
	'<div id="news-takeover" class="takeover-show">',
		'<div id="news-takeover-wrap" class="visit-wrap">',
			'<div class="subnav-list-wrap">',
			'<ul class="subnav-list">',
				'<li>Item 13</li>',
				'<li>Item 14</li>',
				'<li>Item 15</li>',
			'</ul>',
			'</div>',
		'</div>',
	'</div>'
].join('');
	
navVisit.innerHTML += codeVisit;
// navPlants.innerHTML += codePlants;
// navLearn.innerHTML += codeLearn;
// navWork.innerHTML += codeWork;
// navNews.innerHTML += codeNews;	

jQuery(document).ready(function($) {

	$('#menu-main-nav > li').hover(function() {
		$(this).addClass('active-nav');
		$(this).children('.takeover-show').css('display', 'table');
	},
	 function() {    		
		$('.takeover-show').hide();
		$(this).removeClass('active-nav');
	});

});