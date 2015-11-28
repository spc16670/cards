var module = angular.module('cards.controllers.Tools',[]);

module.controller('ToolsController', ['CONSTANTS','$scope','$rootScope','DisplayService','CommonService', 
	function (CONSTANTS,$scope,$rootScope,DisplayService,CommonService) {

	$scope.fonts = CommonService.fonts;
	$scope.fontSizes = CommonService.fontSizes;
	/*
	$scope.toggleDropdown = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
	};*/
	
	$scope.canvas = {
		width : DisplayService.displayWidth
		,height : DisplayService.displayHeight
		,bgColour : CONSTANTS.FABRIC_CANVAS.DEFAULT_BCKG_COLOUR
		,textBgColour : CONSTANTS.FABRIC_CANVAS.DEFAULT_TEXT_FONT_COLOUR
		,fontColour : CONSTANTS.FABRIC_CANVAS.DEFAULT_FONT_COLOUR
		,strokeColour : CONSTANTS.FABRIC_CANVAS.DEFAULT_STROKE_COLOUR
		,font : $scope.fonts[0]
		,fontSize : CONSTANTS.FABRIC_CANVAS.DEFAULT_FONT_SIZE
	}
	
	$scope.selectedImgFile = { };
	
	$scope.$watch( function() { return $scope.canvas  }, function() { 
		DisplayService.setDisplayWidth( $scope.canvas.width );
		DisplayService.setDisplayHeight( $scope.canvas.height );
	},true)
	
	$scope.$watch(function(){return $scope.canvas.bgColour}, function() {
		var colour = $scope.canvas.bgColour;
		if (colour === CONSTANTS.FABRIC_CANVAS.DEFAULT_BCKG_COLOUR) {
			var f = DisplayService.getCurrentFabric();
			colour = f.background;
		}
		if (DisplayService.editingCanvas != null) {
			DisplayService.editingCanvas.setBackgroundColor(
				colour
				,DisplayService.editingCanvas.renderAll.bind(DisplayService.editingCanvas)
			);
		}
    });
	
	$scope.$watch(function(){return $scope.canvas.textBgColour}, function() {
    });
	
	$scope.$watch(function(){return $scope.canvas.fontColour}, function() {
    });
	
	$scope.$watch(function(){return $scope.canvas.strokeColour}, function() {
    });
	
	$scope.$watch(function(){return $scope.canvas.bgColour}, function() {
		var colour = $scope.canvas.bgColour;
		if (colour === CONSTANTS.FABRIC_CANVAS.DEFAULT_BCKG_COLOUR) {
			var f = DisplayService.getCurrentFabric();
			colour = f.background;
		}
		if (DisplayService.editingCanvas != null) {
			DisplayService.editingCanvas.setBackgroundColor(
				colour
				,DisplayService.editingCanvas.renderAll.bind(DisplayService.editingCanvas)
			);
		}
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
			fontFamily: $scope.canvas.font.name
			,fontStyle : "" // italic
			,textBackgroundColor : $scope.canvas.fontColour
			,colour : $scope.canvas.fontColour
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
		//$scope.workspace.fabric = true;
		var imgElement = document.getElementById('huge_image');
		var imgInstance = new fabric.Image(imgElement, {
		  left: 100,
		  top: 100,
		  angle: 30,
		  opacity: 0.85
		});
		imgInstance.crossOrigin = "";
		DisplayService.editingCanvas.add(imgInstance);
		//window.open(DisplayService.editingCanvas.toDataURL('png'));
	}
	
	$scope.selectedFont = function (font) {
		$scope.canvas.font = font;
		console.log("selected font:",$scope.canvas.font);
	}
	
	$scope.selectedFontSize = function (size) {
		$scope.canvas.fontSize = size;
		console.log("selected font size:",$scope.canvas.fontSize);
	}
	
}]);
