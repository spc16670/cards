
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
		/*if (DisplayService.activeObject instanceof fabric.Image) {
			$scope.collapsed.filters = false;
		} else {
			$scope.collapsed.filters = true;
		}*/
		if (DisplayService.activeObject instanceof fabric.IText) {
			$scope.collapsed.text = false;
		} 
	});
	
	$scope.filters = {
		opacity : {
			value : 0
			,range : { min : 0, max : 30, step : 1 }
		}
		,grayscale : {
			selected : false
			,index : 0
		}
		,invert : {
			selected : false
			,index : 1
		}
		,sharpen : {
			selected : false
			,index : 2
		}
		,emboss : {
			selected : false
			,index : 3
		}
		,sepia : {
			one : {
				selected : false
				,index : 4
			}
			,two : {
				selected : false
				,index : 5
			}
		}
		,brightness : {
			selected : false
			,value : 7
			,range : { min : 1, max : 30, step : 1 }
			,index : 6
		}
		,noise : {
			selected : false
			,value : 7
			,range : { min : 1, max : 30, step : 1 }
			,index : 7
		}
		,pixelate : {
			selected : false
			,value : 4
			,range : { min : 4, max : 40, step : 4 }
			,index : 8
		}
		,tint : {
			selected : false
			,colour : 'green'
			,opacity : {
				value : 7
				,range : { min : 1, max : 30, step : 1 }	
			}
			,index : 9
		}
	}
	
	$scope.$watch('filters.opacity.value', function () {
		if ($scope.filters.opacity.value == null) return;
		var obj = DisplayService.editingCanvas.getActiveObject();
		if (obj == null) return;
		obj.opacity = ($scope.filters.opacity.range.max 
		  - $scope.filters.opacity.value ) / $scope.filters.opacity.range.max;
		DisplayService.editingCanvas.renderAll();
	},true);
	
	$scope.$watch('filters.grayscale.selected', function () {
		$scope.applyFilter($scope.filters.grayscale.index
		  ,$scope.filters.grayscale.selected && new fabric.Image.filters.Grayscale());
	},true);
	
	$scope.$watch('filters.invert.selected', function () {
		$scope.applyFilter($scope.filters.invert.index
		  ,$scope.filters.invert.selected && new fabric.Image.filters.Invert());
	},true);
	
	$scope.$watch('filters.sharpen.selected', function () {
		$scope.applyFilter($scope.filters.sharpen.index
		  ,$scope.filters.sharpen.selected && new fabric.Image.filters.Convolute({
			    matrix: [  
					0, -1, 0,
					-1, 5, -1,
					0, -1, 0 
				] 
		  }));
	},true);
	
	$scope.$watch('filters.emboss.selected', function () {
		$scope.applyFilter($scope.filters.emboss.index
		  ,$scope.filters.emboss.selected && new fabric.Image.filters.Convolute({
			    matrix: [ 
					1, 1, 1,
					1, 0.7, -1,
					-1, -1, -1 
				]
		  }));
	},true);
	
	$scope.$watch('filters.invert.selected', function () {
		$scope.applyFilter($scope.filters.invert.index
		  ,$scope.filters.invert.selected && new fabric.Image.filters.Invert());
	},true);
	
	$scope.$watch('filters.sepia.one.selected', function () {
		$scope.applyFilter($scope.filters.sepia.one.index
		  ,$scope.filters.sepia.one.selected && new fabric.Image.filters.Sepia());
	},true);
	$scope.$watch('filters.sepia.two.selected', function () {
		$scope.applyFilter($scope.filters.sepia.two.index
		  ,$scope.filters.sepia.two.selected && new fabric.Image.filters.Sepia2());
	},true);
	
	$scope.$watch('filters.brightness.selected', function () {
		$scope.applyFilter($scope.filters.brightness.index
		  ,$scope.filters.brightness.selected && new fabric.Image.filters.Brightness({
			  brightness: $scope.filters.brightness.value
		  }));
	},true);
	$scope.$watch('filters.brightness.value', function () {
		$scope.applyFilterValue($scope.filters.brightness.index,'brightness',$scope.filters.brightness.value);
	},true);

	$scope.$watch('filters.noise.selected', function () {
		$scope.applyFilter($scope.filters.noise.index
		  ,$scope.filters.noise.selected && new fabric.Image.filters.Noise());
	},true);
	$scope.$watch('filters.noise.value', function () {
		$scope.applyFilterValue($scope.filters.noise.index,'noise',$scope.filters.noise.value);
	},true);

	$scope.$watch('filters.pixelate.selected', function () {
		$scope.applyFilter($scope.filters.pixelate.index
		  ,$scope.filters.pixelate.selected && new fabric.Image.filters.Pixelate({
				blocksize : $scope.filters.pixelate.value
		  }));
	},true);
	$scope.$watch('filters.pixelate.value', function () {
		 console.log("pixelate value",$scope.filters.pixelate.value)
		$scope.applyFilterValue($scope.filters.pixelate.index,'blocksize',$scope.filters.pixelate.value);
	},true);

	$scope.$watch('filters.tint.selected', function () {
		var opacity = ($scope.filters.tint.opacity.range.max 
		  - $scope.filters.tint.opacity.value ) / $scope.filters.tint.opacity.range.max;
		$scope.applyFilter($scope.filters.tint.index
		  ,$scope.filters.tint.selected && new fabric.Image.filters.Tint({
				color: $scope.filters.tint.colour
				,opacity : opacity
		  }));
	},true);
	$scope.$watch('filters.tint.colour', function () {
		$scope.applyFilterValue($scope.filters.tint.index,'color',$scope.filters.tint.colour);
	},true);
	$scope.$watch('filters.tint.opacity.value', function () {
		var opacity = ($scope.filters.tint.opacity.range.max 
		  - $scope.filters.tint.opacity.value ) / $scope.filters.tint.opacity.range.max;
		$scope.applyFilterValue($scope.filters.tint.index,'opacity',opacity);
	},true);
	
	$scope.applyFilter = function(index, filter) {
		var obj = DisplayService.editingCanvas.getActiveObject();
		if (obj== null) return;
		obj.filters[index] = filter;
		obj.applyFilters(DisplayService.editingCanvas.renderAll.bind(DisplayService.editingCanvas));
	}

	$scope.applyFilterValue = function(index, prop, value) {
		var obj = DisplayService.editingCanvas.getActiveObject();
		if (obj== null) return;
		if (obj.filters[index]) {
			obj.filters[index][prop] = value;
			obj.applyFilters(DisplayService.editingCanvas.renderAll.bind(DisplayService.editingCanvas));
		}
	}
	
}]);