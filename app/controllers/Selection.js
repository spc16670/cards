
var module = angular.module('cards.controllers.Selection',[]);

module.controller('SelectionController', ['$scope','DisplayService','CommonService', 
	function ($scope,DisplayService,CommonService) {
	
	$scope.stretch = function () {
		var shape = DisplayService.editingCanvas.getActiveObject();
		shape.set({
			top: 0,
			left: 0,
			scaleY: DisplayService.editingCanvas.height / shape.height,
			scaleX: DisplayService.editingCanvas.width / shape.width
		});
		DisplayService.editingCanvas.renderAll();
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
	
	$scope.bringToFront = function() {
		var selected = DisplayService.getSelectedEditingElements();
		for (var i in selected) {
			DisplayService.editingCanvas.bringForward(selected[i]);
		}
	}
	
	$scope.sendToBack = function() {
		var selected = DisplayService.getSelectedEditingElements();
		for (var i in selected) {
			DisplayService.editingCanvas.sendBackwards(selected[i]);
		}
	}
		
}]);