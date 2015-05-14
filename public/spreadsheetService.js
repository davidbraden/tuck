angular.module('tuckApp').factory('spreadsheetService', function($http) {
	var spreadsheetService = {};

	spreadsheetService.createUser = function(user) {
		console.log("Creating user: " + user.name + " - " + user.id + " with credit " + user.credit);
	};

	spreadsheetService.getUserDetails = function(userId) {
		console.log("Getting user details for user: " + id);
	};

	spreadsheetService.purchase = function(userId, items) {
		console.log("Making purchase for user: " + userId);
		for (var i = 0; i<items.length; i++) {
			console.log(items[i].name, items[i].price);
		}
	};

	return spreadsheetService;

});
