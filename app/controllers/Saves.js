
var module = angular.module('cards.controllers.Saves',[]);

module.controller('SavesController', ['$scope','ModelsService','DisplayService','SessionService'
	,function ($scope,ModelsService,DisplayService,SessionService) {
	 
	$scope.user = SessionService.user;
	$scope.saves = ModelsService.saves;

	$scope.signIn = function() {
		$scope.$root.$broadcast('menu:login');
	}
	
	$scope.select = function(save) {
		DisplayService.setModel(save);  
		DisplayService.materializeMesh();
	}

}]);
