angular.module('tuckApp').factory('cartService', function($http) {
	var cart = {};
	cart.items = [];

	cart.getItems = function() {
		return cart.items;
	};

	cart.addItem = function(item) {
		cart.items.push(item);
	};

	cart.empty = function() {
		cart.items = [];
	};


	return cart;
});
