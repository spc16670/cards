
var module = angular.module('cards.controllers.Samples',[]);

module.controller('SamplesController', ['$scope','MenuService','ModelsService',
	'DisplayService','UtilsService',function ($scope,MenuService,ModelsService,
	DisplayService,UtilsService) {
	  
	$scope.$watch(function(){return MenuService.selected}, function() {
		if (MenuService.selected == null) { return };
		console.log("selected category: ",MenuService.selected);
		$scope.updateNew(MenuService.selected);
	});

	$scope.blank = null;
	$scope.updateNew = function (category) {
		var minModel = ModelsService.fetchNew(category);
		$scope.blank = minModel;
		if (UtilsService.isEmpty(DisplayService.model)) {
			DisplayService.setModel(minModel);  
			DisplayService.materializeMesh();
		}
	}
	
	$scope.samples = [];
	$scope.fetchSamples = function (category) {
		if (category == null) { return };
		$scope.samples = ModelsService.fetchSamples(category);	
	}
	
	$scope.select = function(sample) {
		if (sample.uid !== DisplayService.model.uid) {
			DisplayService.setModel(sample);  
			DisplayService.materializeMesh();
		}
	}

}]);
