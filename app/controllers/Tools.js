var module = angular.module('cards.controllers.Tools',[]);

module.controller('ToolsController', ['$scope','$rootScope','DisplayService', function ($scope,$rootScope,DisplayService) {

	$scope.canvas = {
		width : DisplayService.displayWidth
		,height : DisplayService.displayHeight
		,fill : DisplayService.dofillcontainer
		,scale : DisplayService.scale
		,material : DisplayService.materialType
		,spinning : DisplayService.spinning
		,bgColour : "#f0f0f0"
	}
	
	$scope.$watch( function() { return $scope.canvas  }, function() { 
		DisplayService.setDisplayWidth( $scope.canvas.width );
		DisplayService.setDisplayHeight( $scope.canvas.height );
		//DisplayService.setFillContainer( $scope.canvas.fill );
		DisplayService.setScale( $scope.canvas.scale );
		DisplayService.setMaterialType( $scope.canvas.material );
		DisplayService.setSpinning( $scope.canvas.spinning );
	},true)
	
	$scope.$watch(function(){return $scope.canvas.bgColour}, function(colour) {
		DisplayService.setBgColour(colour);
    });
	
	$scope.close = function () {
		DisplayService.setFabricShowing( !DisplayService.fabricShowing );
	}
	$scope.write = function () {
		var textItem = new fabric.IText('Tap and Type', { 
			fontFamily: 'arial black',
			left: 100, 
			top: 100 
		})
		DisplayService.editingCanvas.add(textItem);
	}
	$scope.remove = function () {
		if(DisplayService.editingCanvas.getActiveGroup()) {
			DisplayService.editingCanvas.getActiveGroup().forEachObject(function(o){ DisplayService.editingCanvas.remove(o) });
			DisplayService.editingCanvas.discardActiveGroup().renderAll();
		} else {
			DisplayService.editingCanvas.remove(DisplayService.editingCanvas.getActiveObject());
		}
	}
	$scope.apply = function () {
		DisplayService.updateModel(); // saves editingCanvas in model's fabricJson
		DisplayService.materializeMesh();
		DisplayService.setFabricShowing(false);	
	}
}]);