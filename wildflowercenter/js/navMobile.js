var page = document.getElementById('wrapper-wax55787a7014171');
page.outerHTML += '<div id="mobile-menu-overlay"></div><div id="mobile-menu-btn"><div id="menu-btn"><span></span><span></span><span></span></div></div>';


// Set what happens when the menu is clicked
jQuery(document).ready(function($) {

	$('#mobile-menu-btn').click(function(){
		$('#menu-btn').toggleClass('menu-btn-nocolor');
		$('#mobile-menu-overlay').toggleClass('expand');
		$('#mobile-menu-wrap').toggleClass('show-menu');
	});
});

var mobile_menu = document.getElementById('mobile-menu-overlay');

var main_nav = [
	'<li>Visit</li>',
	'<li>Plants</li>',
	'<li>Learn</li>',
	'<li>Our Work</li>',
	'<li>News</li>'
].join('');

mobile_menu.outerHTML += '<div id="mobile-menu-wrap"><ul>' + main_nav + '</ul></div>';