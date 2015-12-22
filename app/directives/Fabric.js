'use strict';
var module = angular.module('cards.directives.Fabric',[]);

module.directive('ngFabric', ['DisplayService','UtilsService','$timeout',
	function (DisplayService,UtilsService,$timeout) {
    return {
      restrict: 'A',
      scope: { 
		'width': '='
        ,'height': '='
      },
      link: function postLink(scope, element, attrs) {
		
		var directive = {
			canvas : null
			,editingCanvas : null
			,onSelectListener : function(e) {
				$timeout(function(){ DisplayService.setActiveObject(e.target)});
			}
			,offSelectListener : function(e) {
				$timeout(function(){ DisplayService.setActiveObject({}); });
			}
			,contW : 0
			,contH : 0
		}
		
        function init() {
			console.log("ngFabric init()");
			directive.canvas = document.createElement('canvas');
			directive.canvas.id = "fabricCanvasElement";
			directive.canvas.style.border = "1px solid";
			element[0].appendChild(directive.canvas);
			directive.editingCanvas = new fabric.Canvas('fabricCanvasElement');
			DisplayService.setEditingCanvas(directive.editingCanvas);
			DisplayService.materializeFabric();
			directive.editingCanvas.on('object:selected', directive.onSelectListener);
			directive.editingCanvas.on('selection:cleared', directive.offSelectListener);
			window.addEventListener('resize', scope.resizeCanvas, false );
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

		scope.$on('$destroy', function() {
			fabric.util.removeListener(directive.canvas, 'object:selected', directive.onSelectListener);
			fabric.util.removeListener(directive.canvas, 'selection:cleared', directive.offSelectListener);
			directive.editingCanvas = null;
			directive.canvas = null;
			directive = null;
			
			var x = element[0];
			UtilsService.removeChildren(x);
			x.remove();
			
			x = window;
			UtilsService.removeListener(x,'resize',scope.resizeCanvas);
        });
		
		init();

      }
    };
  }]);