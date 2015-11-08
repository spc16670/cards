var module = angular.module('cards.controllers.Tools',[]);

module.controller('ToolsController', ['$scope','$rootScope','DisplayService', function ($scope,$rootScope,DisplayService) {

	$scope.fonts = [
		{ name : "arial black", style: { fontFamily : "arial black" } }
		,{ name : "Aaargh", style: { fontFamily : "Aaargh" } }
	];
	
	$scope.toggled = function(open) {
		console.log('Dropdown is now: ', open);
	};

	$scope.toggleDropdown = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
	};
	
	$scope.canvas = {
		width : DisplayService.displayWidth
		,height : DisplayService.displayHeight
		,fill : DisplayService.dofillcontainer
		,scale : DisplayService.scale
		,material : DisplayService.materialType
		,spinning : DisplayService.spinning
		,wireframe : DisplayService.wireframe
		,bgColour : "#f0f0f0"
		,font : null
		,helpers : DisplayService.helpers
	}
	
	$scope.selectedImgFile = { };
	
	$scope.$watch( function() { return $scope.canvas  }, function() { 
		DisplayService.setDisplayWidth( $scope.canvas.width );
		DisplayService.setDisplayHeight( $scope.canvas.height );
		//DisplayService.setFillContainer( $scope.canvas.fill );
		DisplayService.setScale( $scope.canvas.scale );
		DisplayService.setMaterialType( $scope.canvas.material );
		DisplayService.setSpinning( $scope.canvas.spinning );
		DisplayService.setWireframe( $scope.canvas.wireframe );
		DisplayService.setHelpers( $scope.canvas.helpers );
	},true)
	
	$scope.$watch(function(){return $scope.canvas.bgColour}, function() {
		DisplayService.setBgColour($scope.canvas.bgColour);
    });
	
	$scope.fileSelected = function(element) {
		$scope.$apply(function(scope) {
			var photofile = element.files[0];
			var reader = new FileReader();
			reader.onload = function(e) {
				//console.log(element.value.replace(/^.*\\/, ""));
				$scope.selectedImgFile = { base64 : e.target.result };
				console.log("fabric.Image.fromURL");
				fabric.Image.fromURL($scope.selectedImgFile.base64, function(img) {
					img.scale(0.2).setLeft(10).setTop(10);
					DisplayService.editingCanvas.add(img);
					//DisplayService.editingCanvas.renderAll();
				});
			};
			reader.readAsDataURL(photofile);
		});
	};

	$scope.fitImage = function () {
		var shape = DisplayService.editingCanvas.getActiveObject();
		shape.set({
			top: 0,
			left: 0,
			scaleY: DisplayService.editingCanvas.height / shape.height,
			scaleX: DisplayService.editingCanvas.width / shape.width
		});
		DisplayService.editingCanvas.renderAll();
	}
	$scope.close = function () {
		DisplayService.setFabricShowing( !DisplayService.fabricShowing );
	}
	$scope.write = function () {
		var left = (DisplayService.editingCanvas.width / 2);
		var top = (DisplayService.editingCanvas.height / 2);
		var textItem = new fabric.IText('Tap and Type', { 
			fontFamily: $scope.canvas.font.name || 'arial black'
			,left: left 
			,top: top 
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
	}
	$scope.test = function () {
		window.open(DisplayService.editingCanvas.toDataURL('png'));
	}
	
	$scope.selectedFont = function (font) {
		$scope.canvas.font = font;
		console.log("selected font:",$scope.canvas.font);
	}
	
	$scope.$on('model:materialised', function () {
		console.log('model:materialised');
        DisplayService.setFabricShowing(false);
	})
}]);