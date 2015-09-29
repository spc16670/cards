var module = angular.module('cards.controllers.Tools',[]);

module.controller('ToolsController', ['$scope','$rootScope','CanvasService', function ($scope,$rootScope,CanvasService) {

	$scope.canvas = {
		width : CanvasService.canvasWidth
		,height : CanvasService.canvasHeight
		,fill : CanvasService.dofillcontainer
		,scale : CanvasService.scale
		,material : CanvasService.materialType
		,spinning : CanvasService.spinning
		,bgColour : null
	}
	
	$scope.$watch( function() { return $scope.canvas  }, function() { 
		CanvasService.setCanvasWidth( $scope.canvas.width );
		CanvasService.setCanvasHeight( $scope.canvas.height );
		CanvasService.setFillContainer( $scope.canvas.fill );
		CanvasService.setScale( $scope.canvas.scale );
		CanvasService.setMaterialType( $scope.canvas.material );
		CanvasService.setSpinning( $scope.canvas.spinning );
		CanvasService.setCanvasBgColour( $scope.canvas.bgColour );
	},true)

	
	
	$scope.close = function () {
		CanvasService.setFabricShowing( !CanvasService.fabricShowing );
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