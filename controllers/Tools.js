var module = angular.module('cards.controllers.Tools',[]);

module.controller('ToolsController', ['$scope','CanvasService', function ($scope,CanvasService) {

	$scope.canvas = {
		width : CanvasService.canvasWidth
		,height : CanvasService.canvasHeight
		,fill : CanvasService.dofillcontainer
		,scale : CanvasService.scale
		,material : CanvasService.materialType
		,spinning : CanvasService.spinning
	}
	

	$scope.$watch( function() { return $scope.canvas  }, function() { 
		CanvasService.setCanvasWidth( $scope.canvas.width );
		CanvasService.setCanvasHeight( $scope.canvas.height );
		CanvasService.setFillContainer( $scope.canvas.fill );
		CanvasService.setScale( $scope.canvas.scale );
		CanvasService.setMaterialType( $scope.canvas.material );
		CanvasService.setSpinning( $scope.canvas.spinning );
	},true)

}]);