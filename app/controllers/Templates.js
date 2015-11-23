
var module = angular.module('cards.controllers.Templates',[]);

module.controller('TemplateController', ['$scope','CategoriesService','BulletService'
  , function ($scope,CategoriesService,BulletService) {
	  
	$scope.$watch(function(){return CategoriesService.selected}, function() {
		console.log("selected category: ",CategoriesService.selected);
		$scope.loadTemplateGroup(CategoriesService.selected);
    });

	$scope.templateGroups = [];

	$scope.loadTemplateGroup = function (category) {

	}

	$scope.selectTemplate = function(template) {

	}

}]);