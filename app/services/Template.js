var module = angular.module('cards.services.Template',[]);

module.service('TemplateService', ['BulletService',function (BulletService) { 

	var Service = { selected : null };
	
	
	
	Service.setSelected = function (set) {
		Service.selected = set;
	}
	
	return Service;
}]);

	
