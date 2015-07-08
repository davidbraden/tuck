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

angular.module('tuckApp').controller('AppCtrl', function ($http, $scope, $location, spreadsheetService, $timeout) {
	var token = document.getElementsByTagName("html")[0].getAttribute("data-token");
	$http.defaults.headers.common.Authorization = 'Bearer ' + token;
	$http.defaults.headers.post["Content-Type"] = "application/atom+xml;";

	$scope.showNotification = function (message) {
		$scope.notification = message;
		$timeout(function () {
			$scope.notification = '';
		}, 1500);
	}
});

angular.module('tuckApp').controller('NewUserCtrl', function ($scope, $location, spreadsheetService) {

	$scope.scan = false;
	$scope.startScan = function () {
		$scope.scan = true;
	};

	$scope.createTmp = function() {
		var user = {
			"name" : "test123",
			"credit" : 10
		};
		spreadsheetService.createUser(user)
	};

	$scope.signup = function (data) {
		var user = {
			"id": data,
			"name": $scope.name,
			"credit": $scope.credit
		};
		spreadsheetService.createUser(user);
		$scope.showNotification("User " + user.name + " created");
		$location.path('/');
	}
});

angular.module('tuckApp').controller('PurchaseCtrl', function ($scope, cartService, spreadsheetService, $location) {

	$scope.cartItems = cartService.getItems();

	$scope.total = 0;
	for (var i = 0; i < $scope.cartItems.length; i++) {
		$scope.total += $scope.cartItems[i].price;
	}
	$scope.scan = false;
	$scope.startScan = function () {
		$scope.scan = true;
	};

	$scope.purchase = function (id) {
		spreadsheetService.purchase(id, $scope.cartItems);
		$scope.showNotification("Purchase complete");
		cartService.empty();
		$location.path('/');
	}
});

angular.module('tuckApp').controller('MainCtrl', function ($scope, cartService, spreadsheetService, $location) {

});

angular.module('tuckApp').controller('ItemsCtrl', function ($scope, cartService, spreadsheetService, $location) {

	$scope.items = spreadsheetService.loadItems();
	$scope.cartItems = cartService.getItems();

	$scope.addItem = function (item) {
		$scope.showNotification(item.name + " added");
		cartService.addItem(item);
	};

	$scope.clear = function () {
		$scope.showNotification("Cart emptied");
		cartService.clear();
	}
});

angular.module('tuckApp').controller('UserDetailsCtrl', function ($scope, cartService, spreadsheetService, $location) {

	$scope.lookup = function (id) {
		spreadsheetService.getUserDetails(id).then(function(user) {
			$scope.user = user;
		});
	}

});


