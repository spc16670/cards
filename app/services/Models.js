var module = angular.module('cards.services.Models',[]);

module.service('ModelsService', ['BulletService','UtilsService',function (BulletService,UtilsService) { 

	var Service = { };
	
	// this is used by the Saved Items section controlled by the SavesController
	Service.saves = [];
	
	/**
	* Return the default starter model for the given category
	* 
	* @param category
		{
			id: 1
			, type : "businessCards"
			, flatGeometry : 'Card'
			, title: 'Standard Card Econony'
			, icon: "images/tabs/card.jpg"
			, productSize: { x : 100, y: 160, z: 0 }
			, modelSize : { x : 250, y : 120 } 
			, thumbnailSize : 4
			, desc : "Standard card economy"
		}
					
	* @return minModel, assign uuid 
	*/
	Service.fetchNew = function (category) {
		var minModel = {};
		minModel.catId = category.id;
		minModel.type = category.type;
		minModel.desc = category.desc;
		minModel.productSize = category.productSize;
		minModel.modelSize = category.modelSize;
		minModel.flatGeometry = category.flatGeometry;
		minModel.snapshot = category.icon;
		minModel.uid = UtilsService.uuid();
		minModel.fabrics = [];
		var geometry = new WHALE[minModel.flatGeometry];
		var i;
		for (i=0;i<geometry.sides;i++) {
			var fabric = {};
			fabric.materialIndex = i;
			fabric.fabricJson = { objects : [], background : "#ff00ff"}
			minModel.fabrics.push(fabric);
		}
		geometry = null;
		return minModel;
	}
	
	/**
	* Fetch some sample models for the given category
	*
	* @return minModel with uuid
	*/
	Service.fetchSamples = function(category) {
		// return min model samples
	}
	
	/**
	* Fetch the fabrics for the given category
	*
	* @return { result : "ok", fabrics : [...] }
	*/
	Service.fetchModel = function(minModel) {
		var model = {};
		model.minSize = minModel.minSize;
	}
	
	Service.fetchModel = function(minModel) {
		var i;
		for (i=0;i<Service.models.length;i++) {
			var model = Service.models[i];
			if ((model.id == minModel.id) && (model.type === minModel.type) ) {
				var clonedModel = {};
				angular.copy(model, clonedModel);
				return clonedModel;
			}
		}
		return null;
	}
	
	return Service;
}]);

	
