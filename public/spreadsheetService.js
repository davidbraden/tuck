angular.module('tuckApp').factory('spreadsheetService', function (sheetsApi) {
		var spreadsheetService = {};

		var users = [];

		spreadsheetService.createUser = function (user) {
			console.log("Creating user: " + user.name + " - " + user.id + " with credit " + user.credit);

			sheetsApi.save("user", {
				"name" : user.name,
				"initial_credit" : user.credit
			});

		};

		spreadsheetService.getUserDetails = function (userId) {
			console.log("Getting user details for user: " + userId);

			return sheetsApi.get("user", userId);
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
