
var module = angular.module('cards.controllers.Display',[]);

module.controller('DisplayController', ['$scope','DisplayService', function ($scope,DisplayService) {

	$scope.mesh = DisplayService.mesh;
	$scope.editingCanvas = DisplayService.editingCanvas;
	
    $scope.fabricWidth = DisplayService.fabricWidth;
    $scope.fabricHeight = DisplayService.fabricHeight;
	
	$scope.$watch( function() { return DisplayService.fabricWidth }, function() { 
		console.log("$scope.fabricWidth");
		$scope.fabricWidth = DisplayService.fabricWidth;
	},true);
	
	$scope.$watch( function() { return DisplayService.fabricHeight }, function() { 
		console.log("$scope.fabricHeight");
		$scope.fabricHeight = DisplayService.fabricHeight;
	},true);
	
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
		console.log("$controls.scale");
		DisplayService.setScale($scope.controls.scale);
	},true);
	
	$scope.$watch( 'controls.spinning', function() { 
		console.log("$controls.spinning");
		DisplayService.setSpinning($scope.controls.spinning);
	},true);
	
	$scope.$watch( 'controls.wireframe' , function() { 
		DisplayService.setWireframe($scope.controls.wireframe);
	});
	
	$scope.$watch( 'controls.helpers', function() { 
		console.log("$controls.helpers");
		DisplayService.setHelpers($scope.controls.helpers);
	},true);
	
	$scope.$watch( 'controls.normals', function() { 
		console.log("$controls.normals");
		DisplayService.setNormals($scope.controls.normals);
	},true);

}]);