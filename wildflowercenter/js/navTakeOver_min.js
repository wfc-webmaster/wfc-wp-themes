var actionNav=document.getElementById("menu-action-nav").outerHTML,actionNavWrap='<div id="menu-action-nav-wrap">'+actionNav+"</div>";document.getElementById("menu-action-nav").outerHTML=actionNavWrap;var mainNav=document.getElementById("menu-main-nav"),mainNavAdd=mainNav.outerHTML,mainNavWrap='<div id="menu-main-nav-wrap">'+mainNavAdd+"</div>";document.getElementById("menu-main-nav").outerHTML=mainNavWrap;var takeoverContainer=document.getElementById("takeover-container"),navVisit=document.getElementById("menu-item-1779"),navPlants=document.getElementById("menu-item-1780"),navLearn=document.getElementById("menu-item-1781"),navWork=document.getElementById("menu-item-1782"),navNews=document.getElementById("menu-item-1783"),codeVisit=['<div id="visit-takeover" class="takeover-show">','<div id="visit-takeover-wrap" class="takeover-wrap">','<div class="subnav-list-wrap">','<ul class="subnav-list">',"</ul>","</div>",'<div class="subnav-images">',"</div>","</div>","</div>"].join(""),codePlants=['<div id="plants-takeover" class="takeover-show">','<div id="plants-takeover-wrap" class="takeover-wrap">','<div class="subnav-list-wrap">','<ul class="subnav-list">',"</ul>","</div>",'<div class="subnav-images">',"</div>","</div>","</div>"].join(""),codeLearn=['<div id="learn-takeover" class="takeover-show">','<div id="learn-takeover-wrap" class="takeover-wrap">','<div class="subnav-list-wrap">','<ul class="subnav-list">',"</ul>","</div>",'<div class="subnav-images">',"</div>","</div>","</div>"].join(""),codeWork=['<div id="work-takeover" class="takeover-show">','<div id="work-takeover-wrap" class="takeover-wrap">','<div class="subnav-list-wrap">','<ul class="subnav-list">',"</ul>","</div>",'<div class="subnav-images">',"</div>","</div>","</div>"].join(""),codeNews=['<div id="news-takeover" class="takeover-show">','<div id="news-takeover-wrap" class="takeover-wrap">','<div class="subnav-list-wrap">','<ul class="subnav-list">',"</ul>","</div>",'<div class="subnav-images">',"</div>","</div>","</div>"].join("");navVisit.innerHTML+=codeVisit,navPlants.innerHTML+=codePlants,navLearn.innerHTML+=codeLearn,navWork.innerHTML+=codeWork,navNews.innerHTML+=codeNews,jQuery(document).ready(function(a){a("#menu-main-nav > li").hover(function(){a(this).addClass("active-nav"),a(this).children(".takeover-show").css("display","table")},function(){a(".takeover-show").hide(),a(this).removeClass("active-nav")}),a(window).width()<769&&!a("#menu-main-nav > li").hasClass("active-nav")&&(a("ul#menu-main-nav > li > a").replaceWith(function(){return a(this).contents()}),a("ul#menu-main-nav > li").addClass("nav-responsive-touch"),a("#menu-main-nav > li").click(function(){console.log("You clicked it.")})),a.getJSON("wp-content/themes/wildflowercenter/json/takeoverNavData.json",function(n){for(var e,i="",s=0;s<n.nav_visit_links.length;s++)for(key in n.nav_visit_links[s])n.nav_visit_links[s].hasOwnProperty(key)&&(e=n.nav_visit_links[s][key],i+='<li><a href="'+e+'">'+key+"</a></li>",a("#visit-takeover-wrap > .subnav-list-wrap > .subnav-list").html(i));a.each(n.nav_visit_pics,function(n,e){var i=a("<div>").attr("class","subnav-img-container"),s=a("<img/>").attr("src",e.image),t=a("<a>").attr("href",e.url);imageCap=a("<p>").append(e.caption),t.append(s),i.append(t),i.append(imageCap),a("#visit-takeover-wrap .subnav-images").append(i)});for(var t,v="",s=0;s<n.nav_plants_links.length;s++)for(key in n.nav_plants_links[s])n.nav_plants_links[s].hasOwnProperty(key)&&(t=n.nav_plants_links[s][key],v+='<li><a href="'+t+'">'+key+"</a></li>",a("#plants-takeover-wrap > .subnav-list-wrap > .subnav-list").html(v));a.each(n.nav_plants_pics,function(n,e){var i=a("<div>").attr("class","subnav-img-container"),s=a("<img/>").attr("src",e.image),t=a("<a>").attr("href",e.url);imageCap=a("<p>").append(e.caption),t.append(s),i.append(t),i.append(imageCap),a("#plants-takeover-wrap .subnav-images").append(i)});for(var r,l="",s=0;s<n.nav_learn_links.length;s++)for(key in n.nav_learn_links[s])n.nav_learn_links[s].hasOwnProperty(key)&&(r=n.nav_learn_links[s][key],l+='<li><a href="'+r+'">'+key+"</a></li>",a("#learn-takeover-wrap > .subnav-list-wrap > .subnav-list").html(l));a.each(n.nav_learn_pics,function(n,e){var i=a("<div>").attr("class","subnav-img-container"),s=a("<img/>").attr("src",e.image),t=a("<a>").attr("href",e.url);imageCap=a("<p>").append(e.caption),t.append(s),i.append(t),i.append(imageCap),a("#learn-takeover-wrap .subnav-images").append(i)});for(var o,d="",s=0;s<n.nav_work_links.length;s++)for(key in n.nav_work_links[s])n.nav_work_links[s].hasOwnProperty(key)&&(o=n.nav_work_links[s][key],d+='<li><a href="'+o+'">'+key+"</a></li>",a("#work-takeover-wrap > .subnav-list-wrap > .subnav-list").html(d));a.each(n.nav_work_pics,function(n,e){var i=a("<div>").attr("class","subnav-img-container"),s=a("<img/>").attr("src",e.image),t=a("<a>").attr("href",e.url);imageCap=a("<p>").append(e.caption),t.append(s),i.append(t),i.append(imageCap),a("#work-takeover-wrap .subnav-images").append(i)});for(var p,c="",s=0;s<n.nav_news_links.length;s++)for(key in n.nav_news_links[s])n.nav_news_links[s].hasOwnProperty(key)&&(p=n.nav_news_links[s][key],c+='<li><a href="'+p+'">'+key+"</a></li>",a("#news-takeover-wrap > .subnav-list-wrap > .subnav-list").html(c));a.each(n.nav_news_pics,function(n,e){var i=a("<div>").attr("class","subnav-img-container"),s=a("<img/>").attr("src",e.image),t=a("<a>").attr("href",e.url);imageCap=a("<p>").append(e.caption),t.append(s),i.append(t),i.append(imageCap),a("#news-takeover-wrap .subnav-images").append(i)})})});