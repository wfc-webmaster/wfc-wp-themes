var app = angular.module("featureArchive", ['ngSanitize']);

app.controller("getFeatures", function($scope, $http){
	$http.get('http://localhost:8888/wildflower_2/wordpress/wp-content/themes/wildflowercenter/custom_code/feature-achives/api.php').success(function(data) {
            // here the data from the api is assigned to a variable named users
            $scope.features = data;
    });
});