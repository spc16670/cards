var module = angular.module('cards.services.Bullet',[]);

module.service('BulletService', ['DisplayService',function (DisplayService) {

	var Service = {
	}

	Service.models = [
    	{ 
			type : 'businessCards'
			, id: 1
			//http://mrdoob.github.io/three.js/editor/
			, geometry : new THREE.BoxGeometry( 200, 100, 20, 40 )
			, fabrics : [
				//{ faceIndex : 0, size: { x : 20, y : 100 }, fabricJson : { objects : [], background : "white"} } // not clickable
				//,{ faceIndex : 1, size: { x : 20, y : 100 }, fabricJson : { objects : [], background : "white"} } // not clickable
				{ faceIndex : 2, size: { x : 200, y : 20 }, fabricJson : { objects : [], background : "pink"} }
				,{ faceIndex : 3, size: { x : 200, y : 20 }, fabricJson : { objects : [], background : "yellow"} }
				,{ faceIndex : 4, size: { x : 200, y : 100 }, fabricJson : JSON.parse("{\"objects\":[{\"type\":\"i-text\",\"originX\":\"left\",\"originY\":\"top\",\"left\":10,\"top\":60,\"width\":295.64,\"height\":52.43,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeLineJoin\":\"miter\",\"strokeMiterLimit\":10,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"clipTo\":null,\"backgroundColor\":\"\",\"fillRule\":\"nonzero\",\"globalCompositeOperation\":\"source-over\",\"text\":\"Front Face (4)\",\"fontSize\":40,\"fontWeight\":\"normal\",\"fontFamily\":\"arial black\",\"fontStyle\":\"\",\"lineHeight\":1.16,\"textDecoration\":\"\",\"textAlign\":\"left\",\"textBackgroundColor\":\"\",\"styles\":{}}],\"background\":\"red\"}") }
				,{ faceIndex : 5, size: { x : 200, y : 100 }, fabricJson : { objects : [], background : "blue"} }
			] 
		}
		,{ 
			type : 'invitations'
			, id: 1
			, size : { x : 250, y : 120, z : 90 } 
			, geometry : 'HorizontallyFoldedCard'
			, fabrics : [
				{ materialIndex : 0, fabricJson : { objects : [], background : "pink"} }
				,{ materialIndex : 1, fabricJson : { objects : [], background : "pink"} }
				,{ materialIndex : 2, fabricJson : { objects : [], background : "pink"} }
				,{ materialIndex : 3, fabricJson : { objects : [], background : "pink"} }
			]
		}
		,{ 
			type : 'businessCards'
			, id: 1
		}
		,{ 
			type : 'businessCards'
			, id: 1
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