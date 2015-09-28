var module = angular.module('cards.services.Canvas',[]);

module.service('CanvasService', [function () {

	var Service = {
		canvasWidth : 400
		,canvasHeight : 400
		,dofillcontainer : true
		,scale : 1
		,materialType : 'basic'
		,spinning : true
		,fabricShowing : false
	}

	Service.setCanvasWidth = function(width) {
		Service.canvasWidth = width;
	}
	Service.setFillContainer = function(fill) {
		Service.dofillcontainer = fill;
	}
	Service.setCanvasHeight = function(height) {
		Service.canvasHeight = height;
	}
	Service.setScale = function(sc) {
		Service.scale = sc;
	}
	Service.setSpinning = function(spin) {
		Service.spinning = spin;
	}
	Service.setMaterialType = function(material) {
		Service.materialType = material;
	}
	Service.setFabricShowing = function(showing) {
		Service.fabricShowing = showing;
	}	

	return Service;

}]);