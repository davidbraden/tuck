angular.module('tuckApp').factory('spreadsheetService', function ($http) {
		var spreadsheetService = {};

		var users = [];

		spreadsheetService.createUser = function (user) {
			console.log("Creating user: " + user.name + " - " + user.id + " with credit " + user.credit);

			for (var i = 0; i < users.length; i++) {
				if (users[i].id === user.id) {
					throw Error("User exists");
				}
			}
			users.push(user);

		};

		spreadsheetService.getUserDetails = function (userId) {
			console.log("Getting user details for user: " + userId);

			for (var i = 0; i < users.length; i++) {
				if (users[i].id === userId) {
					return users[i];
				}
			}

			throw Error("User not found");
		};

		spreadsheetService.purchase = function (userId, items) {
			console.log("Making purchase for user: " + userId);
			for (var i = 0; i < items.length; i++) {
				console.log(items[i].name, items[i].price);
			}

			var user = spreadsheetService.getUserDetails(userId);
			if (!user.items) {
				user.items = [];
			}
			user.items.concat(items);

		};

		spreadsheetService.loadItems = function () {
			return [
				{
					"name": "Coke",
					"price": 0.60
				},
				{
					"name": "Fanta",
					"price": 0.60
				},
				{
					"name": "Sprite",
					"price": 0.60
				},
				{
					"name": "Twix",
					"price": 0.40
				},
				{
					"name": "Mars",
					"price": 0.40
				},
				{
					"name": "Fudge",
					"price": 0.10
				},
				{
					"name": "Freddo",
					"price": 0.10
				}
			];
		};


		return spreadsheetService;
	}
)
;
