
var module = angular.module('cards.controllers.Elements',[]);

module.controller('ElementController', ['$scope','DisplayService','BulletService'
  , function ($scope,DisplayService,BulletService) {

	$scope.elements = [
		{
			id : 1
			,name: 'ornaments'
			,title: 'Ornaments'
			,members: []
		}
		,{
			id : 2
			,name: 'graphics'
			,title: 'Graphics'
			,members: []
		}
		,{
			id : 3
			,name: 'symbols'
			,title: 'Symbols'
			,members: []
		}
		,{
			id : 4
			,name: 'pictures'
			,title: 'Pictures'
			,members: []
		}
		,{
			id : 5
			,name: 'uploads'
			,title: 'Uploads'
			,members: []
		}
	];

	$scope.loadElement = function (element) {
		if (element.members.length == 0) {
			if (element.name === "ornaments") {
				element.members.push({ groupId : 1, title: "Baroque", img: "baroq1.jpg", id: 1});
			} else if (element.name === "graphics") {
				element.members.push({ groupId : 2, title: "Lion", img: "lion1.jpg", id: 1});
			} else if (element.name === "symbols") {
				element.members.push({ groupId : 3, title: "Fish", img: "christian1.jpg", id: 1});
			} else if (element.name === "pictures") {
				element.members.push({ groupId : 4, title: "Rose", img: "rose1.jpg", id: 1});
			} else if (element.name === "uploads") {
				element.members.push({ groupId : 5, title: "Huge", img: "huge.jpg", id: 1});
			} 
		}
	}

	$scope.selectElement = function(member) {
		if (member.groupId != DisplayService.model.groupId) {
			var model = BulletService.fetchModel(member);
			DisplayService.setModel(member);  
			DisplayService.materializeMesh();
		}
	}

}]);