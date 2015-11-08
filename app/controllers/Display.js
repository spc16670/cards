
var module = angular.module('cards.controllers.Display',[]);

module.controller('DisplayController', ['$scope','DisplayService', function ($scope,DisplayService) {

    $scope.fabricWidth = DisplayService.fabricWidth;
    $scope.fabricHeight = DisplayService.fabricHeight;
    $scope.scale = DisplayService.scale;
    $scope.materialType = DisplayService.materialType;
	$scope.spinning = DisplayService.spinning;
	$scope.wireframe = DisplayService.wireframe;
	$scope.helpers = DisplayService.helpers;
	$scope.normals = DisplayService.normals;
	$scope.fabricShowing = DisplayService.fabricShowing;
	$scope.mesh = DisplayService.mesh;
	$scope.editingCanvas = DisplayService.editingCanvas;
	
	$scope.$watch( function() { return DisplayService.fabricWidth }, function() { 
		console.log("$scope.fabricWidth");
		$scope.fabricWidth = DisplayService.fabricWidth;
	},true);
	
	$scope.$watch( function() { return DisplayService.fabricHeight }, function() { 
		console.log("$scope.fabricHeight");
		$scope.fabricHeight = DisplayService.fabricHeight;
	},true);
	
	$scope.$watch( function() { return DisplayService.scale }, function() { 
		console.log("$scope.scale");
		$scope.scale = DisplayService.scale;
	},true);
	
	$scope.$watch( function() { return DisplayService.materialType }, function() { 
	console.log("$scope.materialType");
		$scope.materialType = DisplayService.materialType;
	},true);
	
	$scope.$watch( function() { return DisplayService.spinning }, function() { 
		console.log("$scope.spinning");
		$scope.spinning = DisplayService.spinning;
	},true);
	
	$scope.$watch( function() { return DisplayService.wireframe }, function() { 
		console.log("$scope.wireframe");
		$scope.wireframe = DisplayService.wireframe;
	},true);
	
	$scope.$watch( function() { return DisplayService.helpers }, function() { 
		console.log("$scope.helpers");
		$scope.helpers = DisplayService.helpers;
	},true);
	
	$scope.$watch( function() { return DisplayService.normals }, function() { 
		console.log("$scope.normals");
		$scope.normals = DisplayService.normals;
	},true);
	
	$scope.$watch( function() { return DisplayService.fabricShowing }, function() { 
		$scope.fabricShowing = DisplayService.fabricShowing;
	},true);

}]);