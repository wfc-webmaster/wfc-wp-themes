// Adds a wrapping <div> around both navs to center them but allow the contents to be right aligned
var actionNav = document.getElementById('menu-action-nav').outerHTML,
actionNavWrap = '<div id="menu-action-nav-wrap">' + actionNav + '</div>';

document.getElementById('menu-action-nav').outerHTML = actionNavWrap;

var mainNav = document.getElementById('menu-main-nav').outerHTML,
mainNavWrap = '<div id="menu-main-nav-wrap">' + mainNav + '</div>';

document.getElementById('menu-main-nav').outerHTML = mainNavWrap;

//Begin Take-Over nav
var mainNavSection = document.getElementById('wrapper-wyt55789b870b1d1');
mainNavSection.outerHTML += '<div id="takeover-container"></div>';