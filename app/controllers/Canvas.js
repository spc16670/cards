
var module = angular.module('cards.controllers.Canvas',[]);

module.controller('CanvasController', ['$scope','CanvasService', function ($scope,CanvasService) {

    $scope.canvasWidth = CanvasService.canvasWidth;
    $scope.canvasHeight = CanvasService.canvasHeight;
    $scope.dofillcontainer = CanvasService.dofillcontainer;
    $scope.scale = CanvasService.scale;
    $scope.materialType = CanvasService.materialType;
	$scope.spinning = CanvasService.spinning;
	$scope.fabricShowing = CanvasService.fabricShowing;
	$scope.materialIndex = CanvasService.materialIndex;

	$scope.$watch( function() { return CanvasService }, function() { 
		$scope.canvasWidth = CanvasService.canvasWidth;
		$scope.canvasHeight = CanvasService.canvasHeight;
		$scope.dofillcontainer = CanvasService.dofillcontainer;
		$scope.scale = CanvasService.scale;
		$scope.materialType = CanvasService.materialType;
		$scope.spinning = CanvasService.spinning;
		$scope.fabricShowing = CanvasService.fabricShowing;
		$scope.materialIndex = CanvasService.materialIndex;
	},true)
	
	$scope.$watch( function() { return $scope.fabricShowing }, function() { 
		CanvasService.setFabricShowing( $scope.fabricShowing );
	},true);
	
	$scope.$watch( function() { return $scope.materialType }, function() { 
		CanvasService.setMaterialType( $scope.materialType );
	},true)
	
	$scope.$watch( function() { return $scope.materialIndex }, function() { 
		CanvasService.setMaterialIndex( $scope.materialIndex );
	},true)
}]);