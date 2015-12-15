var module = angular.module('cards.controllers.Main',[]);

module.controller('MainController', ['$scope', 'DisplayService', 'AuthService', function ($scope, DisplayService, AuthService) {

	$scope.mobile = { collapsed : true };
	$scope.workspace = { fabric : false };

	$scope.toggler = {
		home : true
		,editor : false
		,basket : false
		,profile : false
		,contact : false
		,login : false
	};
	
	$scope.user = { isLogged : false, user : AuthService.user };
	
	$scope.$watch(function() { return AuthService.user }, function () {
		if (AuthService.user != null) {
			$scope.user = { loggedIn : true, user : AuthService.user };
		} else {
			$scope.user = { loggedIn : false, user : AuthService.user };
		}
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
	
	/*
	$scope.$watch(function() { return DisplayService.fabricShowing }, function () {
		$scope.workspace.fabric = DisplayService.fabricShowing;
	},true);
	
	$scope.$watch('workspace.fabric', function () {
		console.log("fabric showing:::::::",$scope.workspace.fabric);
	},true);
	*/
	
}]);