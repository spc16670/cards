var module = angular.module('cards.controllers.Categories',[]);

module.controller('CategoriesController', ['$scope','$timeout','$location','$anchorScroll','$element','CategoriesService','BulletService'
  ,'DisplayService', function ($scope,$timeout,$location,$anchorScroll,$element,CategoriesService,BulletService,DisplayService) {
	
	$scope.categories = CategoriesService.categories;

	$scope.expand = function(view) {
		for (var key in CategoriesService.categories) {
			if (CategoriesService.categories.hasOwnProperty(key)) {
				if (key !== view) {
					if (CategoriesService.categories[key].expanded == true) {
						$scope.toggle(key);
					}
				} else {
					$scope.toggle(key);
				}
			}
		}
	};
  
	$scope.toggle = function (id) {
		var target, content;
		if (!target) target = document.querySelector('#'+id);
		if (!content) content = target.querySelector('.slideable_content');
		if(!CategoriesService.categories[id].expanded) {
			content.style.border = '1px solid rgba(0,0,0,0)';
			var y = content.clientHeight;
			content.style.border = 0;
			target.style.height = y + 'px';
		} else {
			target.style.height = '0px';
		}
		$scope.mobile.collapsed = !$scope.mobile.collapsed;
		CategoriesService.categories[id].expanded = !CategoriesService.categories[id].expanded;
	}

	
	$scope.clicked = function (selected) {
		$scope.toggle(selected.type);
		//console.log("$element",$element[0].clientHeight);
		$scope.$parent.visible('editor');
		/**
		* @todo: add check to for object id
		*/
		if ((selected.type !== DisplayService.model.type) || (selected.id != DisplayService.model.id) ) {
			CategoriesService.setSelected(selected);
			var model = BulletService.fetchModel(selected);
			DisplayService.setModel(model);  
			DisplayService.materializeMesh();
			$timeout(function() {
				//$anchorScroll.yOffset = -100;
				//$location.hash('menu');
				//$anchorScroll();
			});
		}
	}

}]);