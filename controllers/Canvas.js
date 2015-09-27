
var module = angular.module('cards.controllers.Canvas',[]);

module.controller('CanvasController', ['$scope','CanvasService', function ($scope,CanvasService) {

    $scope.canvasWidth = CanvasService.canvasWidth;
    $scope.canvasHeight = CanvasService.canvasHeight;
    $scope.dofillcontainer = CanvasService.dofillcontainer;
    $scope.scale = CanvasService.scale;
    $scope.materialType = CanvasService.materialType;
	$scope.spinning = CanvasService.spinning;

	$scope.$watch( function() { return CanvasService }, function() { 
		$scope.canvasWidth = CanvasService.canvasWidth;
		$scope.canvasHeight = CanvasService.canvasHeight;
		$scope.dofillcontainer = CanvasService.dofillcontainer;
		$scope.scale = CanvasService.scale;
		$scope.materialType = CanvasService.materialType;
		$scope.spinning = CanvasService.spinning;
	},true)
	
	$scope.showing = true;
}]);