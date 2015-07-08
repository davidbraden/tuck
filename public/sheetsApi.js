angular.module('tuckApp').factory('sheetsApi', function ($http) {
	var sheetsApi = {};

	var config = {
		"worksheetId" : "1UhVdGRoCV0_WOi6HjbUeq06Jzsi2cR1wt2yxeplyRTU",
		"sheets" : {
			"user" : {
				"id" : "od6",
				"fields" : ["uid", "name", "initialcredit", "balance"]
			},
			"transaction" : {
				"id" : "oe258fy",
				"fields" : ["userid", "itemid"]
			},
			"item" : {
				"id" : "okrz7gi",
				"fields" : ["uid", "name", "price"]
			}
		}
	};

	var updateTemplate = '<entry xmlns="http://www.w3.org/2005/Atom" xmlns:openSearch="http://a9.com/-/spec/opensearchrss/1.0/" xmlns:gsx="http://schemas.google.com/spreadsheets/2006/extended" >{props}</entry>';
	var updatePropTemplate = "<gsx:{name}>{value}</gsx:{name}>";

	var getUrl = "/feeds/list/{key}/{sheet}/private/full?sq=uid={id}";
	var saveUrl = "/feeds/list/{key}/{sheet}/private/full";
	var findUrl = "/feeds/list/{key}/{sheet}/private/full/sq={field}={value}";

	var parseEntity = function (entry, sheetName) {
		var entity = {};
		config.sheets[sheetName].fields.forEach(function(field) {
			entity[field] = entry.getElementsByTagName(field)[0].innerHTML
		});
		return entity;
	};

	sheetsApi.get = function(sheetName, id) {
		var url = getUrl
			.replace("{key}", config.worksheetId)
			.replace("{sheet}", config.sheets[sheetName].id)
			.replace("{id}", id);

		return $http.get(url).then(function(res) {
			var dom = new DOMParser().parseFromString(res.data, "text/xml");
			var entry = dom.getElementsByTagName("entry")[0];
			return parseEntity(entry, sheetName);
		});
	};

	sheetsApi.find = function(sheetName, field, value) {
		var url = findUrl
			.replace("{key}", config.worksheetId)
			.replace("{sheet}", config.sheets[sheetName].id)
			.replace("{field}", field)
			.replace("{value}", value);

		return $http.get(url).then(function(res) {
			var dom = new DOMParser().parseFromString(res.data, "text/xml");
			var entities = [];
			var entry = dom.getElementsByTagName("entry").forEach(function(el) {
				entities.push(parseEntity(el, sheetName));
			});
			return entities;
		});
	};

	sheetsApi.save = function(sheetName, entity) {
		var props = "";
		config.sheets[sheetName].fields.forEach(function(property) {
			if (entity[property]) {
				props += (updatePropTemplate.replace(/\{name}/g, property).replace("{value}", entity[property]));
			}
		});

		var xml = updateTemplate.replace("{props}", props);

		var url = saveUrl
			.replace("{key}", config.worksheetId)
			.replace("{sheet}", config.sheets[sheetName].id)
			.replace("{id}", (entity.id || ""));

		return $http.post(url, xml);
	};

	return sheetsApi;

});
