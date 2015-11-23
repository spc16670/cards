var module = angular.module('cards.controllers.Main',[]);

module.controller('MainController', ['$scope', 'DisplayService', function ($scope, DisplayService) {

	$scope.mobile = { collapsed : true };
	
	$scope.workspace = { fabric : false };

	$scope.toggler = {
		'home' : true
		,'editor' : false
		,'basket' : false
		,'profile' : false
		,'contact' : false
	};
	
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