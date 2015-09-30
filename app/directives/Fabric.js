'use strict';
var module = angular.module('cards.directives.Fabric',[]);

module.directive('ngFabric', [function () {
    return {
      restrict: 'A',
      scope: { 
        'face': '=',
		'width': '=',
        'height': '=',
		'fabricShowing': '='
      },
      link: function postLink(scope, element, attrs) {

	  
		var canvas;
		var contW;
		var contH;
			
        scope.init = function () {
			
			canvas = document.createElement('canvas');
			canvas.id = "fabricCanvasElement"
			canvas.style.border  = "1px solid";
			scope.resizeCanvas();
			element[0].appendChild( canvas );
			
			canvas = new fabric.Canvas('fabricCanvasElement');
			
			var rect = new fabric.Rect({
				left: 100,
				top: 100,
				fill: 'red',
				width: 20,
				height: 20
			});
			canvas.add(rect);
			//.addEventListener('click',function(e) {console.log("click"); scope.showing = true });

			scope.$on("add:write",function() {
				var textItem = new fabric.IText('Tap and Type', { 
					fontFamily: 'arial black',
					left: 100, 
					top: 100 
				})
				canvas.add(textItem);
				console.log("JSON: ",JSON.stringify(canvas));
			})
			
			scope.$on("remove",function() {
				if(canvas.getActiveGroup()) {
					canvas.getActiveGroup().forEachObject(function(o){ canvas.remove(o) });
					canvas.discardActiveGroup().renderAll();
				} else {
					canvas.remove(canvas.getActiveObject());
				}
			})
			
			
			canvas.on('text:changed',function(e){console.log("changed")});
			window.addEventListener('resize', scope.onWindowResize, false );
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
			contW = element[0].clientWidth;
			contH = scope.height;
			canvas.width = contW;
			canvas.height = contH;
        };
		
        // -----------------------------------
        // Watches
        // -----------------------------------
        scope.$watch('width + height', function () {
			scope.resizeCanvas();
        });

		scope.init();

      }
    };
  }]);