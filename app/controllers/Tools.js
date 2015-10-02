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
		var texture = new THREE.Texture(DisplayService.editingCanvas.getContext('2d').canvas);
		texture.needsUpdate = true;
		DisplayService.mesh.material.materials[DisplayService.materialIndex] = new THREE.MeshBasicMaterial( { map: texture } );
		//DisplayService.setMaterialType("custom");
		DisplayService.setFabricShowing(false);
		DisplayService.updateModel();
	}
}]);