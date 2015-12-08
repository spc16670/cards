
var module = angular.module('cards.controllers.Selection',[]);

module.controller('SelectionController', ['$scope','DisplayService','CommonService'
	,'$timeout', function ($scope,DisplayService,CommonService,$timeout) {
	
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
	
	$scope.$watch(function () {return DisplayService.activeObject}, function () {
		if (DisplayService.activeObject instanceof fabric.Image) {
			$scope.collapsed.filters = false;
		} else {
			$scope.collapsed.filters = true;
		}
		if (DisplayService.activeObject instanceof fabric.IText) {
			$scope.collapsed.text = false;
		} 
	});
	
	$scope.filters = {
		grayscale : {
			selected : false
		}
		,invert : {
			selected : false
		}
		,sharpen : {
			selected : false
		}
		,emboss : {
			selected : false
		}
		,sepia : {
			one : {
				selected : false
			}
			,two : {
				selected : false
			}
		}
		,brightness : {
			selected : false
			,value : 7
			,range : { min : 1, max : 30, step : 1 }
		}
		,noise : {
			selected : false
			,value : 7
			,range : { min : 1, max : 30, step : 1 }
		}
		,pixelate : {
			selected : false
			,value : 7
			,range : { min : 1, max : 30, step : 1 }
		}
		,tint : {
			selected : false
			,colour : 'blue'
			,opacity : {
				value : 7
				,range : { min : 1, max : 30, step : 1 }	
			}
		}
	}
	
	function applyFilter(index, filter) {
		var obj = DisplayService.editingCanvas.getActiveObject();
		obj.filters[index] = filter;
		obj.applyFilters(DisplayService.editingCanvas.renderAll.bind(DisplayService.editingCanvas));
	}

	function applyFilterValue(index, prop, value) {
		var obj = DisplayService.editingCanvas.getActiveObject();
		if (obj.filters[index]) {
			obj.filters[index][prop] = value;
			obj.applyFilters(DisplayService.editingCanvas.renderAll.bind(DisplayService.editingCanvas));
		}
	}
	
}]);