"use strict";

/******************************************************************************************

Labour Cost Report controller

******************************************************************************************/

var app = angular.module("labourcost.controller", []);

app.controller("ctrlLabourCost", ["$rootScope", "$scope", "$timeout", "restalchemy", "navigation", function LabourCostCtrl($rootScope, $scope, $timeout, $restalchemy, $navigation) {
	// Set the navigation tabs
	$navigation.select({
		forward: "reports",
		selected: "labourreport"
	});

	// Initialise the REST api
	var rest = $restalchemy.init({ root: $rootScope.config.api.labourstats.root });
	rest.api = $rootScope.config.api.labourstats;

	rest.at(rest.api.costs).get().then(function(costdata) {
		console.log(costdata);
		$scope.costdata = costdata[0];
		$scope.total = costdata[0].total[0];
	});
	$scope.getWorkForce = function (workerCount){
		//console.log(workerCount);
		var percent = workerCount * 100 / $scope.total.workerCount;
		return percent.toFixed(1);
	}
	$scope.getCompliance = function (compliance){
		var compScore = (compliance) ? Math.ceil(compliance) : 0 ;
		return compScore;
	}
	$scope.numberWithCommas = function (x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
}]);
