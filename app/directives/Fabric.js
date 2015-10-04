'use strict';
var module = angular.module('cards.directives.Fabric',[]);

module.directive('ngFabric', ['DisplayService',function (DisplayService) {
    return {
      restrict: 'A',
      scope: { 
		'width': '=',
        'height': '='
      },
      link: function postLink(scope, element, attrs) {
		  
		var contW;
		var contH;
		var canvas;
		
        scope.init = function () {
			canvas = document.createElement('canvas');
			canvas.id = "fabricCanvasElement";
			canvas.style.border = "1px solid";
			element[0].appendChild(canvas);
			DisplayService.setEditingCanvas(new fabric.Canvas('fabricCanvasElement'));
			scope.resizeCanvas();
			DisplayService.editingCanvas.on('text:changed',function(e){console.log("changed")});
        };
		
        // -----------------------------------
        // Event listeners
        // -----------------------------------
        scope.onWindowResize = function () {
			console.log("resizing onWindowResize");
			scope.resizeCanvas();
        };

        // -----------------------------------
        // Updates
        // -----------------------------------
        scope.resizeCanvas = function () {
			contW = scope.width; //element[0].clientWidth;
			contH = scope.height;
			canvas.width = contW;
			canvas.height = contH;
			console.log("fabric resize w h",contW,contH);
			DisplayService.editingCanvas.setWidth(contW);
			DisplayService.editingCanvas.setHeight(contH);
			DisplayService.editingCanvas.calcOffset();
			//DisplayService.editingCanvas.renderAll();
        };
		
        // -----------------------------------
        // Watches
        // -----------------------------------
        scope.$watch('width + height', function () {
			scope.resizeCanvas();
        });

        scope.$on("fabric:resize",function() {
			console.log("fabric:resize");
			scope.resizeCanvas();
		})
		
		scope.init();

      }
    };
  }]);