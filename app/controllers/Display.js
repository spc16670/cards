
var module = angular.module('cards.controllers.Display',[]);

module.controller('DisplayController', ['$scope','DisplayService', function ($scope,DisplayService) {

    $scope.canvasWidth = DisplayService.canvasWidth;
    $scope.canvasHeight = DisplayService.canvasHeight;
    $scope.dofillcontainer = DisplayService.dofillcontainer;
    $scope.scale = DisplayService.scale;
    $scope.materialType = DisplayService.materialType;
	$scope.spinning = DisplayService.spinning;
	$scope.fabricShowing = DisplayService.fabricShowing;
	$scope.materialIndex = DisplayService.materialIndex;
	$scope.mesh = DisplayService.mesh;
	$scope.editingCanvas = DisplayService.editingCanvas;
	
	$scope.$watch( function() { return DisplayService.canvasWidth }, function() { 
		$scope.canvasWidth = DisplayService.canvasWidth;
	},true);
	
	$scope.$watch( function() { return DisplayService.canvasHeight }, function() { 
		$scope.canvasHeight = DisplayService.canvasHeight;
	},true);
	
	$scope.$watch( function() { return DisplayService.dofillcontainer }, function() { 
		$scope.dofillcontainer = DisplayService.dofillcontainer;
	},true);
	
	$scope.$watch( function() { return DisplayService.scale }, function() { 
		$scope.scale = DisplayService.scale;
	},true);
	
	$scope.$watch( function() { return DisplayService.materialType }, function() { 
		$scope.materialType = DisplayService.materialType;
	},true);
	
	$scope.$watch( function() { return DisplayService.spinning }, function() { 
		$scope.spinning = DisplayService.spinning;
	},true);
	
	$scope.$watch( function() { return DisplayService.fabricShowing }, function() { 
		$scope.fabricShowing = DisplayService.fabricShowing;
	},true);
	
	$scope.$watch( function() { return DisplayService.materialIndex }, function() { 
		$scope.materialIndex = DisplayService.materialIndex;
	},true);
	
	$scope.$watch( function() { return DisplayService.model }, function() { 
		//console.log("model changed");
		$scope.model = DisplayService.model;
	},false);

	$scope.$watch( function() { return DisplayService.mesh }, function() { 
		$scope.mesh = DisplayService.mesh;
	},false);
	
	$scope.$watch( function() { return DisplayService.editingCanvas }, function() { 
		$scope.editingCanvas = DisplayService.editingCanvas;
	},false);
	
	$scope.$watch( function() { return $scope.fabricShowing }, function() { 
		DisplayService.setFabricShowing( $scope.fabricShowing );
	},true);
	
	$scope.$watch( function() { return $scope.materialType }, function() { 
		DisplayService.setMaterialType( $scope.materialType );
	},true)
	
	$scope.$watch( function() { return $scope.materialIndex }, function() { 
		DisplayService.setMaterialIndex( $scope.materialIndex );
	},true)
	
	$scope.$watch( function() { return $scope.model }, function() { 
		DisplayService.materializeMesh();
	},true);

}]);