
var module = angular.module('cards.controllers.Templates',[]);

module.controller('TemplateController', ['$scope','MenuService','BulletService'
  , function ($scope,MenuService,BulletService) {
	  
	$scope.$watch(function(){return MenuService.selected}, function() {
		console.log("selected category: ",MenuService.selected);
		$scope.loadTemplateGroup(MenuService.selected);
    });

	$scope.templateGroups = [];

	$scope.loadTemplateGroup = function (category) {
		if (category != null) {
			if (category.type === "leaflets") {
			
			}
		}
	}

	$scope.selectTemplate = function(template) {

	}

}]);