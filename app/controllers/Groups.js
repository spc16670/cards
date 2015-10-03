
var module = angular.module('cards.controllers.GroupController',[]);

module.controller('GroupController', ['$scope','DisplayService','BulletService'
  , function ($scope,DisplayService,BulletService) {

	$scope.groups = [
		{
			id : 1
			,name: 'business_cards'
			,title: 'Business Cards'
			,models: []
		}
		,{
			id : 2
			,name: 'wedding_invitations'
			,title: 'Wedding Invitations'
			,models: []
		}
		,{
			id : 3
			,name: 'flyers'
			,title: 'Flyers'
			,models: []
		}
		,{
			id : 4
			,name: 'leaflets'
			,title: 'Leafets'
			,models: []
		}
	];

	$scope.loadGroup = function (group) {
		if (group.models.length == 0) {
			if (group.name === "business_cards") {
				group.models.push({ groupId : 1, title: "Standard Card", icon: "card.jpg", size: { x : 100, y: 160, z: 0 }, id: 1});
			} else if (group.name === "wedding_invitations") {
				group.models.push({ groupId : 2, title: "Standard Wedding Invitation", icon: "invitation.jpg", size: { x : 100, y: 160, z: 0 }, id: 1});
			} else if (group.name === "flyers") {
				group.models.push({ groupId : 3, title: "Standard Flyer", icon: "flyer.jpg", size: { x : 100, y: 160, z: 0 }, id: 1});
			} else if (group.name === "leaflets") {
				group.models.push({ groupId : 4, title: "Standard Leaflet", icon: "leaflet.jpg", size: { x : 100, y: 160, z: 0 }, id: 1});
			} 
		}
	}

	$scope.selectModel = function(minModel) {
		if (minModel.groupId != DisplayService.model.groupId) {
		var model = BulletService.fetchModel(minModel);
			DisplayService.setModel(model);  
		}
	}

}]);