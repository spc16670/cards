var module = angular.module('cards.controllers.Menu',[]);

module.controller('MenuController', ['$scope','$timeout','$location','$anchorScroll','$element','MenuService','BulletService'
  ,'DisplayService', function ($scope,$timeout,$location,$anchorScroll,$element,MenuService,BulletService,DisplayService) {
	
	$scope.tabs = MenuService.tabs;
	
	$scope.expand = function(view) {
		for (var key in $scope.tabs) {
			if ($scope.tabs.hasOwnProperty(key)) {
				if (key !== view) {
					if ($scope.tabs[key].expanded == true) {
						$scope.toggle(key);
					}
				} else {
					$scope.toggle(key);
				}
			}
		}
	};
  
  /*
  * tab.type needs to reflect the name of the element id associated with a slideable
  */
	$scope.toggle = function (id) {
		var target, content;
		if (!target) target = document.querySelector('#'+id);
		if (!content) content = target.querySelector('.slideable_content');
		if(!$scope.tabs[id].expanded) {
			MenuService.expanded = id;
			content.style.border = '1px solid rgba(0,0,0,0)';
			var y = content.clientHeight;
			content.style.border = 0;
			target.style.height = y + 'px';
		} else {
			MenuService.expanded = null;
			target.style.height = '0px';
		}
		$scope.mobile.collapsed = !$scope.mobile.collapsed;
		$scope.tabs[id].expanded = !$scope.tabs[id].expanded;
	}

	
	$scope.clicked = function (selected) {
		$scope.toggle(selected.type);
		//console.log("$element",$element[0].clientHeight);
		$scope.$parent.visible('editor');
		/**
		* @todo: add check to for object id
		*/
		if ((selected.type !== DisplayService.model.type) || (selected.id != DisplayService.model.id) ) {
			MenuService.setSelected(selected);
			var model = BulletService.fetchModel(selected);
			DisplayService.setModel(model);  
			DisplayService.materializeMesh();
			DisplayService.setFabricShowing(false);
			$timeout(function() {
				//$anchorScroll.yOffset = -100;
				//$location.hash('menu');
				//$anchorScroll();
			});
		}
	}

}]);