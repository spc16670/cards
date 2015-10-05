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
	
	$scope.selectedImgFile = null;
	
	$scope.$watch( function() { return $scope.canvas  }, function() { 
		DisplayService.setDisplayWidth( $scope.canvas.width );
		DisplayService.setDisplayHeight( $scope.canvas.height );
		//DisplayService.setFillContainer( $scope.canvas.fill );
		DisplayService.setScale( $scope.canvas.scale );
		DisplayService.setMaterialType( $scope.canvas.material );
		DisplayService.setSpinning( $scope.canvas.spinning );
	},true)
	
	$scope.$watch(function(){return $scope.selectedImgFile}, function(colour) {
		fabric.util.loadImage($scope.selectedImgFile, function(img) {
			var oImg = new fabric.Image(img);
			oImg.scale(0.2).set({
				left: 10,
				top: 10,
			});
			DisplayService.editingCanvas.add(oImg);
			DisplayService.editingCanvas.renderOnAddiation = true;
            DisplayService.editingCanvas.renderAll();
		});
    });
	
	$scope.$watch(function(){return $scope.canvas.bgColour}, function(colour) {
		DisplayService.setBgColour(colour);
    });
	
	$scope.fileSelected = function(element) {
		$scope.$apply(function(scope) {
			var photofile = element.files[0];
			var reader = new FileReader();
			reader.onload = function(e) {
				$scope.selectedImgFile = e.target.result;
			};
			reader.readAsDataURL(photofile);
		});
	};

	$scope.close = function () {
		DisplayService.setFabricShowing( !DisplayService.fabricShowing );
	}
	$scope.write = function () {
		var left = (DisplayService.editingCanvas.width / 2);
		var top = (DisplayService.editingCanvas.height / 2);
		var textItem = new fabric.IText('Tap and Type', { 
			fontFamily: 'arial black',
			left: left, 
			top: top 
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