'use strict';
var module = angular.module('cards.directives.Fabric',[]);

module.directive('ngFabric', ['DisplayService',function (DisplayService) {
    return {
      restrict: 'A',
      scope: { 
		'width': '='
        ,'height': '='
      },
      link: function postLink(scope, element, attrs) {
		
		var directive = {
			canvas : null
			,contW : 0
			,contH : 0
		}
		
        function init() {
			directive.canvas = document.createElement('canvas');
			directive.canvas.id = "fabricCanvasElement";
			directive.canvas.style.border = "1px solid";
			element[0].appendChild(directive.canvas);
			DisplayService.setEditingCanvas(new fabric.Canvas('fabricCanvasElement'));
			DisplayService.updateCanvas();
			scope.resizeCanvas();
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
			directive.contW = scope.width; //element[0].clientWidth;
			directive.contH = scope.height;
			directive.canvas.width = directive.contW;
			directive.canvas.height = directive.contH;
			DisplayService.editingCanvas.setWidth(directive.contW);
			DisplayService.editingCanvas.setHeight(directive.contH);
			DisplayService.editingCanvas.calcOffset();
			//console.log("resizeCanvas xy",directive.contW , directive.contH);
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
		
		scope.$on('$destroy', function() {
			function empty(elem) {
				while (elem.lastChild) elem.removeChild(elem.lastChild);
			}
			scope.onWindowResize = null;
			directive.canvas = null;
			empty(element[0]);
			element[0].remove();
			directive = null;
        });
		
		init();

      }
    };
  }]);