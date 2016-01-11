var module = angular.module('cards.services.Elements',[]);

module.service('ElementsService', ['BulletService','UtilsService', function (BulletService,UtilsService) {

	var Service = {}
	
	Service.uploads = [];
	
	Service.elements = [
		{
			id : 2
			,name: 'flourishes'
			,title: 'Flourishes'
			,path: "images/elements/flourishes/"
			,members: [{ id : UtilsService.randomId(), src : "baroq1.jpg" }
				,{ id : UtilsService.randomId(), src : "flourish1.png"}]
		}
		,{
			id : 3
			,name: 'graphics'
			,title: 'Graphics'
			,path: "images/elements/graphics/"
			,members: [{ id : UtilsService.randomId(), src : "lion1.png"}
				,{ id : UtilsService.randomId(), src : "earth1.png"}]
		}
		,{
			id : 4
			,name: 'symbols'
			,title: 'Symbols'
			,path: "images/elements/symbols/"
			,members: [{ id : UtilsService.randomId(), src : "christian1.jpg"}]
		}
		,{
			id : 5
			,name: 'pictures'
			,title: 'Pictures'
			,path: "images/elements/pictures/"
			,members: [{ id : UtilsService.randomId(), src : "rose1.jpg"}]
		}
	];
	
	return Service;
}]);
