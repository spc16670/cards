
var module = angular.module('cards.controllers.Display',[]);

module.controller('DisplayController', ['$scope','DisplayService','CommonService', function ($scope,DisplayService,CommonService) {

	$scope.editingCanvas = DisplayService.editingCanvas;

	
    $scope.fabricWidth = DisplayService.fabricWidth;
    $scope.fabricHeight = DisplayService.fabricHeight;
	
	$scope.$watch( function() { return DisplayService.fabricWidth }, function() { 
		$scope.fabricWidth = DisplayService.fabricWidth;
	},true);
	
	$scope.$watch( function() { return DisplayService.fabricHeight }, function() { 
		$scope.fabricHeight = DisplayService.fabricHeight;
	},true);
	
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
			if (f != null) {
				colour = f.background;
			}
		}
		if (DisplayService.editingCanvas != null) {
			DisplayService.editingCanvas.setBackgroundColor(
				colour
				,DisplayService.editingCanvas.renderAll.bind(DisplayService.editingCanvas)
			);
		}
    });
	
	$scope.$watch( function() { return DisplayService.fabricShowing }, function() { 
		$scope.workspace.fabric = DisplayService.fabricShowing;
	},true);
	
	// Display area controls in panel heading and footer

	$scope.controls = { 
		scale : DisplayService.scale
		,spinning : DisplayService.spinning
		,wireframe : DisplayService.wireframe
		,helpers : DisplayService.helpers
		,normals : DisplayService.normals
	};
	
	// Display area controls in panel heading and footer
	$scope.$watch( 'controls.scale', function() { 
		DisplayService.setScale($scope.controls.scale);
	},true);
	
	$scope.$watch( 'controls.spinning', function() { 
		DisplayService.setSpinning($scope.controls.spinning);
	},true);
	
	$scope.$watch( 'controls.wireframe' , function() { 
		DisplayService.setWireframe($scope.controls.wireframe);
	});
	
	$scope.$watch( 'controls.helpers', function() { 
		DisplayService.setHelpers($scope.controls.helpers);
	},true);
	
	$scope.$watch( 'controls.normals', function() { 
		DisplayService.setNormals($scope.controls.normals);
	},true);
	
	$scope.fabricZoomTracker = DisplayService.fabricZoomTracker;
	
	$scope.$watch( function() { return DisplayService.fabricZoomTracker }, function() { 
		$scope.fabricZoomTracker = DisplayService.fabricZoomTracker;
	},true);
	
	$scope.zoomIn = function() {
		DisplayService.zoomFabricIn();
	}
	$scope.zoomOut = function() {
		DisplayService.zoomFabricOut();
	}
	$scope.resetZoom = function() {
		DisplayService.resetFabricZoom();
	}
	$scope.apply = function () {
		DisplayService.applyFabric();
	}
	$scope.hide = function () {
		DisplayService.setFabricShowing( !DisplayService.fabricShowing );
	}


	$scope.share = function(){
		console.log("Share");
	};
	$scope.save = function(){
		console.log("Save");

	};
	$scope.drook = function(){
		console.log("Drook");

	};
}]);
