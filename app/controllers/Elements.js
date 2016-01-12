
var module = angular.module('cards.controllers.Elements',[]);

module.controller('ElementController', ['$scope','ElementsService'
  ,'CommonService','DisplayService'
  ,function ($scope,ElementsService,CommonService,DisplayService) {
	
	$scope.elements = ElementsService.elements;
	
	
	$scope.selectElement = function(element) {
		var img = document.getElementById(element.id)
		var imgInstance = new fabric.Image(img, {
			left: CommonService.CONSTANTS.FABRIC_CANVAS.ELEMENT_DROP_OFFSET
			,top: CommonService.CONSTANTS.FABRIC_CANVAS.ELEMENT_DROP_OFFSET
			//angle: 30,
			//opacity: 0.85
		});
		imgInstance.crossOrigin = "";
		DisplayService.editingCanvas.add(imgInstance);
	}

}]);
