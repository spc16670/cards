var module = angular.module('cards.services.Bullet',[]);

module.service('BulletService', [function () {

	var Service = {
	}

	Service.businessCards = [
    	{ id: 1, dimensions: { x : 100, y: 160, z: 0 }}
	];
	Service.weddingInvitations = [
		{ id: 1, dimensions: { x : 100, y: 160, z: 0 }}
	];
	Service.flyers = [
		{ id: 1, dimensions: { x : 100, y: 160, z: 0 }}
	];
	Service.leaflets = [
		{ id: 1, dimensions: { x : 100, y: 160, z: 0 }}
	];
	
	return Service;

}]);