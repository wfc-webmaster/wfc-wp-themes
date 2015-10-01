var pressControllers = angular.module("pressControllers", ['ngSanitize']);

pressControllers.controller("SummaryController", function($scope, $http, $timeout){
	$http.get('http://localhost:8888/wildflower_2/wordpress/wp-content/themes/wildflowercenter/custom_code/press-releases/api.php').success(function(data) {
            // here the data from the api is assigned to a variable named users
        $scope.pressreleases = data;
        $scope.orderPressReleases = 'id';
        $scope.direction = 'reverse';
    });
});

pressControllers.controller("FullArticleController", function($scope, $http, $timeout, $routeParams){
	$http.get('http://localhost:8888/wildflower_2/wordpress/wp-content/themes/wildflowercenter/custom_code/press-releases/api.php').success(function(data) {
            // here the data from the api is assigned to a variable named users
        $scope.pressreleases = data;
        $scope.whichItem = $routeParams.itemId;
    });
});