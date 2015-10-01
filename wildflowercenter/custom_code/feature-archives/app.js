var featureArchive = angular.module('featureArchive', [
	'ngRoute',
	'featureControllers'
]);

featureArchive.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/summary', {
		templateUrl: 'http://localhost:8888/wildflower_2/wordpress/wp-content/themes/wildflowercenter/custom_code/feature-archives/partials/summary.html',
		controller: 'SummaryController'
	}).
	when('/fullarticles/:itemId', {
		templateUrl: 'http://localhost:8888/wildflower_2/wordpress/wp-content/themes/wildflowercenter/custom_code/feature-archives/partials/fullarticles.html',
		controller: 'FullArticleController'
	}).
	otherwise({
		redirectTo: '/summary'
	});
}]);

featureArchive.directive('fullArticle', function($compile) {
	return {
		restrict: 'E',
		link: function($scope, element, attr) {
			// Prepend feature article links so they go to wildflower.org pages
			featureLink = $('a[href^="/plants"]');
			// $(featureLink).attr('href', function(i,v) {
   //  			return "http://wildflower.org" + v;
			// });
			// Prepend feature article images so they display
			// Need to change when images are migrated to permanent home
			featureImg = $('img[src^="/_images"');
			// $(featureImg).attr('src', function(i,s) {
			// 	return "http://wildflower.org" + s;
			// });
			// Some image links have ../ in front. That needs to be removed
			featureImgParDir = $('img[src^="../_images"');
			//$(featureImgParDir).attr('src').replace(/\.\.\//g, '');
			console.log('Still works');			
		}
	};
})