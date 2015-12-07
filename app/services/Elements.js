var module = angular.module('cards.services.Elements',[]);

module.service('ElementsService', ['BulletService','Upload', function (BulletService,Upload) {

	var Service = {}
	
	Service.uploads =  {
		id : 1
		,name: 'uploads'
		,title: 'Uploads'
		,members: []
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
	
	Service.loadUploads = function () {
		Service.uploads.members.push({ groupId : 1, title: "Huge", img: "huge.jpg", id: 1});
	}

	Service.loadElement = function (element) {
		if (element.members.length == 0) {
			if (element.name === "flourishes") {
				element.members.push({ groupId : 2, title: "Baroque", img: "baroq1.jpg", id: 1});
			} else if (element.name === "graphics") {
				element.members.push({ groupId : 3, title: "Lion", img: "lion1.jpg", id: 1});
			} else if (element.name === "symbols") {
				element.members.push({ groupId : 4, title: "Fish", img: "christian1.jpg", id: 1});
			} else if (element.name === "pictures") {
				element.members.push({ groupId : 5, title: "Rose", img: "rose1.jpg", id: 1});
			}  
		}
	}
	
	// load upload members
	Service.loadUploads();
	
	return Service;
}]);