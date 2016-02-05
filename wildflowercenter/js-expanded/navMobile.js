// Set what happens when the menu is clicked
jQuery(document).ready(function($) {

	$('#mobile-menu-btn').click(function() {
		$('#menu-btn').addClass('menu-btn-nocolor');
		$('#open-menu').addClass('hide');
		$('#mobile-menu-overlay').addClass('flex-container-row show-menu');
	});

	$('#mobile-nav li#nav-menu-close #close-x i').click(function() {
		$('#menu-btn').removeClass('menu-btn-nocolor');
		$('#open-menu').removeClass('hide');
		$('#mobile-menu-overlay').removeClass('flex-container-row show-menu');
	});	
});