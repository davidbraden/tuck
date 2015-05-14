var tuckApp = angular.module('tuckApp', [
	'ngRoute',
	'qrScanner'
]);

tuckApp.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.
			when('/main', {
				templateUrl: 'main.html',
				controller: 'MainCtrl'
			}).
			when('/newUser', {
				templateUrl: 'newUser.html',
				controller: 'NewUserCtrl'
			}).
			when('/userDetails', {
				templateUrl: 'userDetails.html',
				controller: 'UserDetailsCtrl'
			}).
			when('/purchase', {
				templateUrl: 'purchase.html',
				controller: 'PurchaseCtrl'
			}).
			when('/items', {
				templateUrl: 'items.html',
				controller: 'ItemsCtrl'
			}).
			otherwise({
				redirectTo: '/main'
			});
	}]);

angular.module('tuckApp').controller('NewUserCtrl',
	['$scope', '$location', 'spreadsheetService',
		function($scope, $location, spreadsheetService) {

	$scope.signup = function (data) {
		var user = {
			"id": data,
			"name": $scope.name,
			"credit": $scope.credit
		};
		spreadsheetService.createUser(user);
		$location.path('/');
	}
}]);

angular.module('tuckApp').controller('PurchaseCtrl', function ($scope) {

});

angular.module('tuckApp').controller('MainCtrl', function ($scope) {

});

angular.module('tuckApp').controller('ItemsCtrl', function ($scope) {

});

angular.module('tuckApp').controller('UserDetailsCtrl', function ($scope) {

});


