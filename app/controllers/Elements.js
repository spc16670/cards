
var module = angular.module('cards.controllers.Elements',[]);

module.controller('ElementController', ['$scope','ElementsService'
  , function ($scope,ElementsService) {

	$scope.elements = ElementsService.elements;
	$scope.uploads = ElementsService.uploads;
	
	$scope.loadElement = function(element) {
		ElementsService.loadElement(element);
	}
	
	$scope.selectedImgFile = { };
	
	$scope.fileSelected = function(element) {
		/*
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
		});*/
	};
	
	$scope.selectElement = function(element) {

	}

}]);