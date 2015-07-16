// Adds a wrapping <div> around both navs to center them but allow the contents to be right aligned
var actionNav = document.getElementById('menu-action-nav').outerHTML,
actionNavWrap = '<div id="menu-action-nav-wrap">' + actionNav + '</div>';

document.getElementById('menu-action-nav').outerHTML = actionNavWrap;

var mainNav = document.getElementById('menu-main-nav'),
	mainNavAdd = mainNav.outerHTML,
	mainNavWrap = '<div id="menu-main-nav-wrap">' + mainNavAdd + '</div>';
	

document.getElementById('menu-main-nav').outerHTML = mainNavWrap;

//Begin Take-Over nav
var mainNavSection = document.getElementById('wrapper-wyt55789b870b1d1');
	mainNavSection.outerHTML += '<div id="takeover-visit" class="takeover-show">One</div><div id="takeover-plants" class="takeover-show">Two</div>';


var takeoverContainer = document.getElementById('takeover-container'),
	navVisit = document.getElementById('menu-item-1779'),
	wfcGray = "#4d4d4d",
	wfcGreen = "#7ec23b";

	// navVisit.addEventListener("mouseover", showTakeover);
	// navVisit.addEventListener("mouseout", hideTakeover);
	// //takeoverContainer.addEventListener("mouseover", testFun);
	// takeoverContainer.addEventListener("mouseout", hideTakeover);
	
	// function showTakeover() {
	// 	takeoverContainer.style.display = "table";
	// 	this.style.backgroundColor = wfcGreen;
	// }

	// function testFun() {
	// 	navVisit.style.backgroundColor = "orange";
	// 	console.log('You moused over.');
	// }

	// function hideTakeover() {
	// 	takeoverContainer.style.display = "none";
	// 	navVisit.style.backgroundColor = wfcGray;
	// }

	
// jQuery(document).ready(function($) {
// 	var navTimeout;

// 	// $(navVisit).hover(function() {
// 	// 	$(this).css("background-color", wfcGreen);
// 	// 	$(takeoverContainer).show();
// 	// 	//console.log('You hovered over it.');
// 	// },

// 	// function() {
// 	// 	navTimeout = window.setTimeout(function() {
// 	// 		$(navVisit).css("background-color", wfcGray);
// 	// 		$(takeoverContainer).hide();
// 	// 	}, 200);
// 	// });

// navHover($('#menu-item-1779 a'));
// navHover($('#menu-item-1780 a'));
// navHover($('#menu-item-1781 a'));	

// 	$(takeoverContainer).hover(function() {
// 		clearTimeout(navTimeout);
// 		$(this).show;
// 	},
// 	function() {
// 		setTimeout(function() {
// 			$(navVisit).css("background-color", wfcGray);
// 			$(takeoverContainer).hide();				
// 		}, 200);
// 	}
// 	);

// function navHover(navName) {
// 	navName.hover(function(){
// 		clearTimeout(navTimeout);
// 		$(navName).css("background-color", wfcGreen);
// 		$(takeoverContainer).show();
//     },

//     function() {
// 		navTimeout = setTimeout(function() {
// 			$(navName).css("background-color", wfcGray);
// 			$(takeoverContainer).hide();
// 		}, 200);
// 	});
// }

// });

jQuery(document).ready(function($) {

var timeout; // store a timeout here

$('#menu-main-nav li a').hover(function() {
    clearTimeout(timeout);
    $('.takeover-show').hide().eq($(this).parent().index()).show();
}, 

    function() {
    timeout = setTimeout(function() {
        $('.takeover-show').hide();
    }, 1000);
});


$('.takeover-show').hover(function() {
    clearTimeout(timeout);
    $('.takeover-show').hide();
    $(this).show();
}, 

    function() {
    timeout = setTimeout(function() {
        $('.takeover-show').hide();
    }, 1000);
});
});




