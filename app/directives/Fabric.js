'use strict';
var module = angular.module('cards.directives.Fabric',[]);

module.directive('ngFabric', [function () {
    return {
      restrict: 'A',
      scope: { 
        'face': '=',
		'width': '=',
        'height': '=',
		'fabricShowing': '=',
		'editingCanvas' : '='
      },
      link: function postLink(scope, element, attrs) {
		  
		var contW;
		var contH;
			
        scope.init = function () {
			scope.resizeCanvas();
			scope.editingCanvas.on('text:changed',function(e){console.log("changed")});
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
			scope.editingCanvas.width = contW;
			scope.editingCanvas.height = contH;
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