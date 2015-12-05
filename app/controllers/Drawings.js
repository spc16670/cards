var module = angular.module('cards.controllers.Drawings',[]);

module.controller('DrawingsController', ['$scope','DisplayService','CommonService'
	,'UtilsService',function ($scope,DisplayService,CommonService,UtilsService) {

	$scope.drawings = {
		isDrawing : false
		,brush : {
			value : 'Pencil'
			,colour : 'blue'
			,width : {
				value : 3
				,range : {
					min : 0
					,max : 100
					,step : 1
				}
			}
		}
		
	}
	
	$scope.brush = function (which) {
		$scope.drawings.brush.value = which;
	}
	$scope.draw = function () {
		$scope.drawings.isDrawing = !$scope.drawings.isDrawing;
		DisplayService.editingCanvas.isDrawingMode = $scope.drawings.isDrawing;
	}
	
	$scope.$watch( function() { return $scope.collapsed.drawings }, function() { 
		$scope.drawings.isDrawing = false;
	},true);
	
	$scope.$watch( function() { return $scope.drawings.brush.value }, function() { 
		if ($scope.drawings.brush.value === 'v') {
			DisplayService.editingCanvas.freeDrawingBrush = vLinePatternBrush;
		} else if ($scope.drawings.brush.value === 'h') {
			DisplayService.editingCanvas.freeDrawingBrush = hLinePatternBrush;
		} else if ($scope.drawings.brush.value === 'square') {
			DisplayService.editingCanvas.freeDrawingBrush = squarePatternBrush;
		} else if ($scope.drawings.brush.value === 'diamond') {
			DisplayService.editingCanvas.freeDrawingBrush = diamondPatternBrush;
		} else {
			var b = $scope.drawings.brush.value;
			DisplayService.editingCanvas.freeDrawingBrush = new fabric[b + 'Brush'](DisplayService.editingCanvas);
		}
		DisplayService.editingCanvas.freeDrawingBrush.color = $scope.drawings.brush.colour;
		DisplayService.editingCanvas.freeDrawingBrush.width = parseInt($scope.drawings.brush.width.value, 10) || 1;
	},true);
	
	$scope.$watch( function() { return $scope.drawings.brush.colour }, function() { 
		DisplayService.editingCanvas.freeDrawingBrush.color = $scope.drawings.brush.colour;
	},true);
	
	$scope.$watch( function() { return $scope.drawings.brush.width.value }, function() { 
		DisplayService.editingCanvas.freeDrawingBrush.width = parseInt($scope.drawings.brush.width.value, 10) || 1;
	},true);

	// --------------------------- BRUSHES ------------------------------------
	
	
	var vLinePatternBrush = new fabric.PatternBrush(DisplayService.editingCanvas);
	vLinePatternBrush.getPatternSrc = function() {
		var patternCanvas = fabric.document.createElement('canvas');
		patternCanvas.width = patternCanvas.height = 10;
		var ctx = patternCanvas.getContext('2d');
		ctx.strokeStyle = this.color;
		ctx.lineWidth = 5;
		ctx.beginPath();
		ctx.moveTo(0, 5);
		ctx.lineTo(10, 5);
		ctx.closePath();
		ctx.stroke();
		return patternCanvas;
	};
	
	var hLinePatternBrush = new fabric.PatternBrush(DisplayService.editingCanvas);
    hLinePatternBrush.getPatternSrc = function() {
		var patternCanvas = fabric.document.createElement('canvas');
		patternCanvas.width = patternCanvas.height = 10;
		var ctx = patternCanvas.getContext('2d');
		ctx.strokeStyle = this.color;
		ctx.lineWidth = 5;
		ctx.beginPath();
		ctx.moveTo(5, 0);
		ctx.lineTo(5, 10);
		ctx.closePath();
		ctx.stroke();
		return patternCanvas;
    };
	
	var squarePatternBrush = new fabric.PatternBrush(DisplayService.editingCanvas);
    squarePatternBrush.getPatternSrc = function() {
		var squareWidth = 10, squareDistance = 2;
		var patternCanvas = fabric.document.createElement('canvas');
		patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
		var ctx = patternCanvas.getContext('2d');
		ctx.fillStyle = this.color;
		ctx.fillRect(0, 0, squareWidth, squareWidth);
		return patternCanvas;
    };
	
	var diamondPatternBrush = new fabric.PatternBrush(DisplayService.editingCanvas);
    diamondPatternBrush.getPatternSrc = function() {
		var squareWidth = 10, squareDistance = 5;
		var patternCanvas = fabric.document.createElement('canvas');
		var rect = new fabric.Rect({
		width: squareWidth,
		height: squareWidth,
		angle: 45,
		fill: this.color
		});
		var canvasWidth = rect.getBoundingRectWidth();
		patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
		rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });
		var ctx = patternCanvas.getContext('2d');
		rect.render(ctx);
		return patternCanvas;
    };

	
}]);
