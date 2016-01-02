
var module = angular.module('cards.controllers.Display',[]);

module.controller('DisplayController', ['$scope','DisplayService'
	,'CommonService','UtilsService','ModelsService','SessionService'
	,'$loading'
	,function ($scope,DisplayService,CommonService,UtilsService
	,ModelsService,SessionService,$loading) {

	$scope.editingCanvas = DisplayService.editingCanvas;
	$scope.user = SessionService.user;
	
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
		if (DisplayService.editingCanvas != null) {
			DisplayService.editingCanvas.setBackgroundColor(
				 $scope.canvas.bgColour
				,DisplayService.editingCanvas.renderAll.bind(DisplayService.editingCanvas)
			);
		}
    });
	
	$scope.$watch( function() {return DisplayService.editingCanvas}, function() {
		if (DisplayService.fabricShowing) {
			var f = DisplayService.getCurrentFabric();
			if (f != null) {
				$scope.canvas.bgColour = f.background;
			}
		}
    });
	
	$scope.$watch( function() { return DisplayService.fabricShowing }, function() { 
		$scope.workspace.fabric = DisplayService.fabricShowing;
	});
	
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
	
	$scope.exported = function(){
		function takeSnapshot(callback) {
			var display = document.getElementById("displayRenderer");
			var url = display.toDataURL();
			var targetWidth = 100;
			var targetHeight = 100;
			UtilsService.resizeImage(url, targetWidth, targetHeight, callback);
		}
		var callback = function (base64PngImg) {
			window.open(base64PngImg);
		}
		takeSnapshot(callback);
	}
	
	$scope.save = function(){
		$loading.start("display");
		function takeSnapshot(callback) {
			var display = document.getElementById("displayRenderer");
			var url = display.toDataURL();
			var targetWidth = 77;
			var targetHeight = 77;
			UtilsService.resizeImage(url, targetWidth, targetHeight, callback);
		}
		var callback = function (base64PngImg) {
			// create a copy of everything except materialised geometry
			var id = DisplayService.model.id;
			var uid = DisplayService.model.uid;
			var flatGeometry = DisplayService.model.flatGeometry;
			var fabrics = [];
			var i;
			for(i=0;i<DisplayService.model.fabrics.length;i++) {
				var cloned = {};
				angular.copy(DisplayService.model.fabrics[i],cloned);
				fabrics.push(cloned);
			}
			var modelSize = {};
			angular.copy(DisplayService.model.modelSize,modelSize);
			var productSize = {};
			angular.copy(DisplayService.model.productSize,productSize);
			var type = DisplayService.model.type;
			// ----------------------------------------------------------------
			var saved = {
				snapshot : base64PngImg
				,id : id
				,uid : uid
				,type : type
				,flatGeometry : flatGeometry
				,fabrics : fabrics
				,modelSize : modelSize
				,productSize : productSize
			};
			
			/*
			* update
			*/
			var i;
			var updated = false;
			for(i=0;i<ModelsService.saves.length;i++) {
				if (ModelsService.saves[i].uid === saved.uid) {
					ModelsService.saves[i] = saved;
					updated = true;
				}
			}
			if (!updated) {
				ModelsService.saves.push(saved);
			}
			$loading.finish("display");
		}
		takeSnapshot(callback);
	};
	
	$scope.drook = function(){
		console.log("Drook");
	};
}]);
