var module = angular.module('cards.controllers.Main',[]);

module.controller('MainController', ['$scope', function ($scope) {
	
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
					$scope.toggler[key] = true;
				}
			}
		}
	};
}]);