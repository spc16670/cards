var module = angular.module('cards.controllers.Tools',[]);

module.controller('ToolsController', ['$scope','$rootScope','DisplayService','CommonService', 
	function ($scope,$rootScope,DisplayService,CommonService) {

	$scope.fonts = CommonService.text.fonts;
	$scope.fontSizes = CommonService.text.fontSizes;
	
	// ------------------------------------------------------------------------
	// -------------------------- GENEREAL CANVAS -----------------------------
	// ------------------------------------------------------------------------
	
	$scope.canvas = {
		bgColour : CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_BCKG_COLOUR
		,width : DisplayService.displayWidth
		,height : DisplayService.displayHeight
	}
	
	$scope.$watch( function() { return $scope.canvas  }, function() { 
		DisplayService.setDisplayWidth( $scope.canvas.width );
		DisplayService.setDisplayHeight( $scope.canvas.height );
	},true)
	
	$scope.$watch(function(){return $scope.canvas.bgColour}, function() {
		var colour = $scope.canvas.bgColour;
		if (colour === CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_BCKG_COLOUR) {
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
	
	// ------------------------------------------------------------------------
	// ---------------------------- TEXT EDITING ------------------------------
	// ------------------------------------------------------------------------
	
	$scope.text = {
		font : $scope.fonts[0]
		,fontSize : CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_FONT_SIZE
		,fontStyle : CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_FONT_STYLE
		,fontColour : CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_FONT_COLOUR
		,strokeColour : CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_STROKE_COLOUR
		,bgColour : CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_TEXT_BCKG_COLOUR
		,fontWeight : CommonService.CONSTANTS.EMPTY_STRING
		,textDecoration : CommonService.CONSTANTS.EMPTY_STRING
		,textAlign : CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_TEXT_ALIGN
	}
	
	$scope.selectedTextFont = function (font) {
		$scope.text.font = font;
	}
	
	$scope.selectedTextFontSize = function (size) {
		$scope.text.fontSize = size;
	}
	
	$scope.selectedTextDecoration = function (index) {
		$scope.text.textDecoration = CommonService.text.textDecorations[index];
	}
	$scope.selectedFontWeight = function (index) {
		$scope.text.fontWeight = CommonService.text.fontWeights[index];
	}
	
	$scope.$watch(function(){return $scope.text}, function() {
		
    },true);

	
	$scope.write = function () {
		var left = (DisplayService.editingCanvas.width / 2);
		var top = (DisplayService.editingCanvas.height / 2);
		var textItem = new fabric.IText('Tap and Type', { 
			fontFamily: $scope.text.font.name
			,fontStyle : $scope.text.fontStyle
			,fontWeight : $scope.text.fontWeight
			,textDecoration : $scope.text.textDecoration
			,textBackgroundColor : $scope.text.bgColour
			,colour : $scope.text.fontColour
			,left: left 
			,top: top 
		})
		DisplayService.editingCanvas.add(textItem);
	}
	
	// ------------------------------------------------------------------------
	// --------------------------- UPLOAD EDITING -----------------------------
	// ------------------------------------------------------------------------
	
	$scope.selectedImgFile = { };
	
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
	

	$scope.remove = function () {
		var selected = DisplayService.getSelectedEditingElements();
		if (selected.length == 0) {
			return;
		} else if (selected.length == 1) {
			DisplayService.editingCanvas.remove(DisplayService.editingCanvas.getActiveObject());
		} else {
			var i;
			for (i=0;i<selected.length;i++) {
				DisplayService.editingCanvas.remove(selected[i]);
			}
			DisplayService.editingCanvas.discardActiveGroup().renderAll();
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
	
	
}]);
