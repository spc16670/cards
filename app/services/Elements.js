var module = angular.module('cards.services.Elements',[]);

module.service('ElementsService', ['BulletService','UtilsService', function (BulletService,UtilsService) {

	var Service = {}
	
	Service.uploads = [];

	Service.removeUploads = function() {
		Service.uploads = [];
	}
	
	Service.elements = [
		{
			id : 2
			,name: 'flourishes'
			,title: 'Flourishes'
			,members: []
		}
		,{
			id : 3
			,name: 'graphics'
			,title: 'Graphics'
			,members: []
		}
		,{
			id : 4
			,name: 'symbols'
			,title: 'Symbols'
			,members: []
		}
		,{
			id : 5
			,name: 'pictures'
			,title: 'Pictures'
			,members: []
		}
	];
	
	Service.loadElement = function (element) {
		if (element.members.length == 0) {
			if (element.name === "flourishes") {
				element.members.push({ groupId : 2, title: "Baroque", img: "baroq1.jpg", id: 1, elementId : UtilsService.uuid() });
				element.members.push({ groupId : 3, title: "Migotka", img: "flourish1.png", id: 1, elementId : UtilsService.uuid() });
			} else if (element.name === "graphics") {
				element.members.push({ groupId : 10, title: "Lion", img: "lion1.png", id: 1, elementId : UtilsService.uuid()});
				element.members.push({ groupId : 11, title: "Earth", img: "earth1.png", id: 1, elementId : UtilsService.uuid()})
			} else if (element.name === "symbols") {
				element.members.push({ groupId : 20, title: "Fish", img: "christian1.jpg", id: 1, elementId : UtilsService.uuid()});
			} else if (element.name === "pictures") {
				element.members.push({ groupId : 30, title: "Rose", img: "rose1.jpg", id: 1, elementId : UtilsService.uuid()});
			}  
		}
	}
	
	return Service;
}]);
