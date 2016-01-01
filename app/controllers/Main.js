var module = angular.module('cards.controllers.Main',[]);

module.controller('MainController', ['$scope', 'DisplayService', 'SessionService','UtilsService','ModelsService',
 'SessionService',function ($scope, DisplayService, SessionService,UtilsService,ModelsService,SessionService) {

	$scope.mobile = { collapsed : true };
	$scope.workspace = { fabric : false };
	$scope.year = UtilsService.getYear();
	
	$scope.toggler = {
		home : true
		,editor : false
		,contact : false
	};
	
	$scope.user = SessionService.user;

	$scope.signOut = function() {
		SessionService.destroy();
	}

	$scope.$watch(function() { return SessionService.info }, function () {
	});
	
	$scope.visible = function(view) {
		for (var key in $scope.toggler) {
			if ($scope.toggler.hasOwnProperty(key)) {
				if (key !== view) {
					if ($scope.toggler[key] == true) {
						$scope.toggler[key] = false;
					}
				} else {
					$scope.mobile.collapsed = !$scope.mobile.collapsed;
					$scope.toggler[key] = true;
					$scope.$broadcast('categories:hide', {});
				}
			}
		}
	};
	
	$scope.showDrookSpace = function() {
		$scope.visible('editor');
	}
	
	/*
	$scope.$watch(function() { return DisplayService.fabricShowing }, function () {
		$scope.workspace.fabric = DisplayService.fabricShowing;
	},true);
	
	$scope.$watch('workspace.fabric', function () {
		console.log("fabric showing:::::::",$scope.workspace.fabric);
	},true);
	*/
	
}]);
