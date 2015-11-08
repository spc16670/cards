var module = angular.module('cards.services.Bullet',[]);

module.service('BulletService', ['DisplayService',function (DisplayService) {

	var Service = {
	}

	Service.models = [
    	{ 
			type : 'businessCards'
			, id: 1
			, size : { x : 250, y : 120 } 
			, geometry : 'Card'
			, fabrics : [
				{ materialIndex : 0, fabricJson : { objects : [], background : "#BBDDFF"} }
				,{ materialIndex : 1, fabricJson : { objects : [], background : "#BBDDFF"} }
			]
		}
		,{ 
			type : 'invitations'
			, id: 1
			, size : { x : 250, y : 120, z : 90 } 
			, geometry : 'HorizontallyFoldedCard'
			, fabrics : [
				{ materialIndex : 0, fabricJson : { objects : [], background : "#BBDDFF"} }
				,{ materialIndex : 1, fabricJson : { objects : [], background : "#BBDDFF"} }
				,{ materialIndex : 2, fabricJson : { objects : [], background : "#6EB7FF"} }
				,{ materialIndex : 3, fabricJson : { objects : [], background : "#6EB7FF" } }
			]
		}
		,{ 
			type : 'leaflets'
			, id: 1
			, size : { x : 99, y : 210, z : 0 } 
			, geometry : 'VerticallyCFoldedDLLeaflet'
			, fabrics : [
				{ materialIndex : 0, fabricJson : { objects : [], background : "#BBDDFF"} }
				,{ materialIndex : 1, fabricJson : { objects : [], background : "#BBDDFF"} }
				,{ materialIndex : 2, fabricJson : { objects : [], background : "#BBDDFF"} }
				,{ materialIndex : 3, fabricJson : { objects : [], background : "#BBDDFF" } }
				,{ materialIndex : 4, fabricJson : { objects : [], background : "#6EB7FF"} }
				,{ materialIndex : 5, fabricJson : { objects : [], background : "#6EB7FF" } }
			]
		}
	];
	
	Service.fetchModel = function(minModel) {
		var i;
		for (i=0;i<Service.models.length;i++) {
			var model = Service.models[i];
			if ((model.id == minModel.id) && (model.type === minModel.type) ) {
				model.geometry = new WHALE[model.geometry](model.size.x,model.size.y,model.size.z);
				// instantiate canvases
				var f;
				for (f=0;f<model.fabrics.length;f++) {
					var faceFabric = model.fabrics[f];
					var canvas = document.createElement('canvas');
					var name = "model_side_" + faceFabric.materialIndex;
					canvas.id = name;
					var size = model.geometry.getMaterialSize();
					canvas.width = size.x;
					canvas.height = size.y;
					//console.log("canvas",canvas);
					faceFabric['canvas'] = new fabric.Canvas(canvas.id);
					faceFabric.canvas.setWidth(size.x);
					faceFabric.canvas.setHeight(size.y);
				}
				return model;
			}
		}
		return null;
	}
	return Service;

}]);