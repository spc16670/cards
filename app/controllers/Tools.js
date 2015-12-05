var module = angular.module('cards.controllers.Tools',[]);

module.controller('ToolsController', ['$scope','DisplayService','CommonService', 
	function ($scope,DisplayService,CommonService) {
	
	$scope.collapsed = {
		text : true
		,selection : false
		,drawings : true
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
	
	$scope.uuid = function () {
		return CommonService.UUID();
	}
}]);
