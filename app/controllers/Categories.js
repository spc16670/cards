var module = angular.module('cards.controllers.Categories',[]);

module.controller('CategoriesController', ['$scope','CategoriesService','BulletService'
  ,'DisplayService', function ($scope,CategoriesService,BulletService,DisplayService) {
	
	$scope.categories = CategoriesService;

	$scope.expand = function(view) {
		for (var key in CategoriesService) {
			if (CategoriesService.hasOwnProperty(key)) {
				if (key !== view) {
					if (CategoriesService[key].expanded == true) {
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
		if(!CategoriesService[id].expanded) {
			content.style.border = '1px solid rgba(0,0,0,0)';
			var y = content.clientHeight;
			content.style.border = 0;
			target.style.height = y + 'px';
		} else {
			target.style.height = '0px';
		}
		CategoriesService[id].expanded = !CategoriesService[id].expanded;
	}

	
	$scope.clicked = function (selected) {
		$scope.toggle(selected.type);
		$scope.$parent.visible('editor');
		/**
		* @todo: add check to for object id
		*/
		if ((selected.type !== DisplayService.model.type) ) {
			var model = BulletService.fetchModel(selected);
			DisplayService.setModel(model);  
			DisplayService.materializeMesh();
		}
	}
	
}]);