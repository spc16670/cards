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
		console.log("file: ",$scope.selectedImgFile);
    });
	
	$scope.$watch(function(){return $scope.canvas.bgColour}, function(colour) {
		DisplayService.setBgColour(colour);
    });
	
	$scope.loadImage = function () {
		document.getElementById('imgLoader').onchange = function handleImage(e) {
		var reader = new FileReader();
		  reader.onload = function (event){
			var imgObj = new Image();
			imgObj.src = event.target.result;
			imgObj.onload = function () {
			  var image = new fabric.Image(imgObj);
			  image.set({
					angle: 0,
					padding: 10,
					cornersize:10,
					height:110,
					width:110,
			  });
			  canvas.centerObject(image);
			  canvas.add(image);
			  canvas.renderAll();
			}
		  }
		  reader.readAsDataURL(e.target.files[0]);
		}
	}
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