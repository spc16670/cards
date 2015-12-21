
var module = angular.module('cards.controllers.Templates',[]);

module.controller('TemplateController', ['$scope','MenuService','TemplateService'
  , function ($scope,MenuService,TemplateService) {
	  
	$scope.$watch(function(){return MenuService.selected}, function() {
		console.log("selected category: ",MenuService.selected);
		$scope.loadTemplateGroup(MenuService.selected);
	});

	$scope.templateGroups = [];

	$scope.loadTemplateGroup = function (category) {
		if (category == null) { return };
		if (category.type === "leaflets") {
		
		} else if (category.type === "businessCards") {

		}
	}

	$scope.selectTemplate = function(template) {

	}

}]);
