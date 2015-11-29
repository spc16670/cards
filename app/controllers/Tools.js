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
	
	$scope.$watch( function() {return $scope.canvas.bgColour}, function() {
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
	
	$scope.write = function () {
		var left = (DisplayService.editingCanvas.width / 2);
		var top = (DisplayService.editingCanvas.height / 2);
		var textItem = new fabric.IText('Tap and Type', { 
			fontFamily: $scope.text.font.name
			,fontStyle : $scope.text.fontStyle
			,fontWeight : $scope.text.fontWeight
			,textDecoration : $scope.text.textDecoration
			,textBackgroundColor : $scope.text.bgColour
			,fill : $scope.text.fontColour
			,left: left 
			,top: top 
		})
		DisplayService.editingCanvas.add(textItem);
	}
	
	$scope.text = {
		font : $scope.fonts[0]
		,fontSize : CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_FONT_SIZE
		,fontStyle : CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_FONT_STYLE
		,fontColour : CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_FONT_COLOUR
		,strokeColour : CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_STROKE_COLOUR
		,bgColour : CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_TEXT_BCKG_COLOUR
		,fontWeight : CommonService.CONSTANTS.EMPTY_STRING
		,textDecoration : CommonService.CONSTANTS.EMPTY_ARRAY
		,textAlign : CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_TEXT_ALIGN
		,toggles : {
			bold : false
			,italic : false
			,underline : false
			,strikethrough : false
			,overline : false
		}
	}
	
	$scope.selectedTextFont = function (font) {
		$scope.text.font = font;
	}
	$scope.changeTextFontSize = function (font) {
		console.log("inputchanged:: ",font)
	}
	$scope.selectedTextFontSize = function (size) {
		$scope.text.fontSize = size;
	}
	
	$scope.toggleTextWeight = function (what) {
		$scope.text.toggles[what] = !$scope.text.toggles[what];
		if ($scope.text.toggles[what]) {
			$scope.text.fontWeight = what;
		} else {
			$scope.text.fontWeight = CommonService.CONSTANTS.EMPTY_STRING;
		}
	}
	
	$scope.toggleTextStyle = function (what) {
		$scope.text.toggles[what] = !$scope.text.toggles[what];
		if ($scope.text.toggles[what]) {
			$scope.text.fontStyle = what;
		} else {
			$scope.text.fontStyle = CommonService.CONSTANTS.EMPTY_STRING;
		}
	}
	
	$scope.toggleTextDecoration = function (what) {
		$scope.text.toggles[what] = !$scope.text.toggles[what];
		if ($scope.text.toggles[what]) {
			if (what === "strikethrough") {
				what = CommonService.text.textDecorations[3];
			}
			$scope.text.textDecoration.push(what);
		} else {
			if (what === "strikethrough") {
				what = CommonService.text.textDecorations[3];
			}
			var i = $scope.text.textDecoration.indexOf(what);
			$scope.text.textDecoration.splice(i,1);
		}
	}

	
	// ------------------------------------------------------------------------
	$scope.textChangeUpdate = function (prop,val) {
		var selected = DisplayService.getSelectedEditingElements();
		if (selected.length != 0) {
			var i;
			for (i=0;i<selected.length;i++) {
				if (selected[i] instanceof fabric.IText) {
					selected[i][prop] = val;
					DisplayService.editingCanvas.renderAll();
				}
			}
		}
	}
	$scope.$watch(function(){return $scope.text.font}, function() {
		$scope.textChangeUpdate('fontFamily',$scope.text.font.name);
    },true);

	$scope.$watch(function(){return $scope.text.fontSize}, function() {
		$scope.textChangeUpdate('fontSize',$scope.text.fontSize);
    },true);
	
	$scope.$watch(function(){return $scope.text.fontStyle}, function() {
		$scope.textChangeUpdate('fontStyle',$scope.text.fontStyle);
    },true);
	
	$scope.$watch(function(){return $scope.text.fontWeight}, function() {
		$scope.textChangeUpdate('fontWeight',$scope.text.fontWeight);
    },true);
	
	$scope.$watch(function(){return $scope.text.textDecoration}, function() {
		$scope.textChangeUpdate('textDecoration',$scope.text.textDecoration);
    },true);
	
	$scope.$watch(function(){return $scope.text.bgColour}, function() {
		$scope.textChangeUpdate('textBackgroundColor',$scope.text.bgColour);
    },true);
	
	$scope.$watch(function(){return $scope.text.fontColour}, function() {
		$scope.textChangeUpdate('fill',$scope.text.fontColour);
    },true);
	
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
		$scope.resetZoom();
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
	
	
	// ------------------------------------------------------------------------
	// ------------------------------ ZOOMING ---------------------------------
	// ------------------------------------------------------------------------


	$scope.zoomTracker = 0;
	$scope.canvasScale = 1;
	$scope.SCALE_FACTOR = 1.2;


	// Zoom In
	$scope.zoomIn = function() {
		// TODO limit the max canvas zoom in
		var canvas = DisplayService.editingCanvas;
		canvasScale = $scope.canvasScale * $scope.SCALE_FACTOR;
		
		canvas.setHeight(canvas.getHeight() * $scope.SCALE_FACTOR);
		canvas.setWidth(canvas.getWidth() * $scope.SCALE_FACTOR);
		
		var objects = canvas.getObjects();
		for (var i in objects) {
			var scaleX = objects[i].scaleX;
			var scaleY = objects[i].scaleY;
			var left = objects[i].left;
			var top = objects[i].top;
			
			var tempScaleX = scaleX * $scope.SCALE_FACTOR;
			var tempScaleY = scaleY * $scope.SCALE_FACTOR;
			var tempLeft = left * $scope.SCALE_FACTOR;
			var tempTop = top * $scope.SCALE_FACTOR;
			
			objects[i].scaleX = tempScaleX;
			objects[i].scaleY = tempScaleY;
			objects[i].left = tempLeft;
			objects[i].top = tempTop;
			
			objects[i].setCoords();
		}
			
		canvas.renderAll();
		$scope.zoomTracker++;
	}

	// Zoom Out
	$scope.zoomOut = function() {
		// TODO limit max cavas zoom out
		var canvas = DisplayService.editingCanvas;
		$scope.canvasScale = $scope.canvasScale / $scope.SCALE_FACTOR;
		
		canvas.setHeight(canvas.getHeight() * (1 / $scope.SCALE_FACTOR));
		canvas.setWidth(canvas.getWidth() * (1 / $scope.SCALE_FACTOR));
		
		var objects = canvas.getObjects();
		for (var i in objects) {
			var scaleX = objects[i].scaleX;
			var scaleY = objects[i].scaleY;
			var left = objects[i].left;
			var top = objects[i].top;
		
			var tempScaleX = scaleX * (1 / $scope.SCALE_FACTOR);
			var tempScaleY = scaleY * (1 / $scope.SCALE_FACTOR);
			var tempLeft = left * (1 / $scope.SCALE_FACTOR);
			var tempTop = top * (1 / $scope.SCALE_FACTOR);

			objects[i].scaleX = tempScaleX;
			objects[i].scaleY = tempScaleY;
			objects[i].left = tempLeft;
			objects[i].top = tempTop;

			objects[i].setCoords();
		}
		
		canvas.renderAll();
		$scope.zoomTracker--;		
	}

	// Reset Zoom
	$scope.resetZoom = function() {
		while ($scope.zoomTracker != 0) {
			if ($scope.zoomTracker > 0) {
				$scope.zoomOut();
			} else {
				$scope.zoomIn();
			}
		}

	}

}]);
