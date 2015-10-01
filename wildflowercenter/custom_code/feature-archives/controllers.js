var featureControllers = angular.module("featureControllers", ['ngSanitize']);

featureControllers.controller("SummaryController", function($scope, $http, $timeout){
	$http.get('http://localhost:8888/wildflower_2/wordpress/wp-content/themes/wildflowercenter/custom_code/feature-archives/api.php').success(function(data) {
            // here the data from the api is assigned to a variable named users
        $scope.features = data;
        $scope.orderFeatures = 'date';
        $scope.direction = 'reverse';
    });
});

featureControllers.controller("FullArticleController", function($scope, $http, $timeout, $routeParams){
	$http.get('http://localhost:8888/wildflower_2/wordpress/wp-content/themes/wildflowercenter/custom_code/feature-archives/api.php').success(function(data) {
            // here the data from the api is assigned to a variable named users
        $scope.features = data;
        $scope.whichItem = $routeParams.itemId;
    });
});