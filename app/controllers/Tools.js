var module = angular.module('cards.controllers.Tools',[]);

module.controller('ToolsController', ['$scope','$rootScope','DisplayService', function ($scope,$rootScope,DisplayService) {

	$scope.canvas = {
		width : DisplayService.canvasWidth
		,height : DisplayService.canvasHeight
		,fill : DisplayService.dofillcontainer
		,scale : DisplayService.scale
		,material : DisplayService.materialType
		,spinning : DisplayService.spinning
		,bgColour : null
	}
	
	$scope.$watch( function() { return $scope.canvas  }, function() { 
		DisplayService.setCanvasWidth( $scope.canvas.width );
		DisplayService.setCanvasHeight( $scope.canvas.height );
		DisplayService.setFillContainer( $scope.canvas.fill );
		DisplayService.setScale( $scope.canvas.scale );
		DisplayService.setMaterialType( $scope.canvas.material );
		DisplayService.setSpinning( $scope.canvas.spinning );
		DisplayService.setBgColour( $scope.canvas.bgColour );
	},true)
	
	$scope.close = function () {
		DisplayService.setFabricShowing( !DisplayService.fabricShowing );
	}
	$scope.write = function () {
		$rootScope.$broadcast("add:write");
	}
	$scope.remove = function () {
		$rootScope.$broadcast("remove");
	}
	$scope.apply = function () {
		$rootScope.$broadcast("apply");
	}
}]);