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
			
        scope.init = function () {
			scope.resizeCanvas();
			DisplayService.editingCanvas.on('text:changed',function(e){console.log("changed")});
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
			DisplayService.editingCanvas.width = contW;
			DisplayService.editingCanvas.height = contH;
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