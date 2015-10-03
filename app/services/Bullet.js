var module = angular.module('cards.services.Bullet',[]);

module.service('BulletService', [function () {

	var Service = {
	}

	Service.models = [
    	{ 
			groupId: 1
			, id: 1
			//http://mrdoob.github.io/three.js/editor/
			, geometry : new THREE.BoxGeometry( 200, 100, 20 )
			, fabrics : [
				{ faceIndex : 4, fabricJson : JSON.parse("{\"objects\":[{\"type\":\"rect\",\"originX\":\"left\",\"originY\":\"top\",\"left\":100,\"top\":100,\"width\":20,\"height\":20,\"fill\":\"red\",\"stroke\":null,\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeLineJoin\":\"miter\",\"strokeMiterLimit\":10,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"clipTo\":null,\"backgroundColor\":\"\",\"fillRule\":\"nonzero\",\"globalCompositeOperation\":\"source-over\",\"rx\":0,\"ry\":0},{\"type\":\"i-text\",\"originX\":\"left\",\"originY\":\"top\",\"left\":100,\"top\":100,\"width\":295.64,\"height\":52.43,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeLineJoin\":\"miter\",\"strokeMiterLimit\":10,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"clipTo\":null,\"backgroundColor\":\"\",\"fillRule\":\"nonzero\",\"globalCompositeOperation\":\"source-over\",\"text\":\"Tap and Type\",\"fontSize\":40,\"fontWeight\":\"normal\",\"fontFamily\":\"arial black\",\"fontStyle\":\"\",\"lineHeight\":1.16,\"textDecoration\":\"\",\"textAlign\":\"left\",\"textBackgroundColor\":\"\",\"styles\":{}}],\"background\":\"red\"}") }
				,{ faceIndex : 3, fabricJson : { objects : [], background : "yellow"} }
			] 
		}
		,{ 
			groupId: 2
			, id: 1
		}
		,{ 
			groupId: 3
			, id: 1
		}
		,{ 
			groupId: 4
			, id: 1
		}
	];
	
	Service.fetchModel = function(minModel) {
		var i;
		for (i=0;i<Service.models.length;i++) {
			if (Service.models[i].groupId == minModel.groupId) {
				return Service.models[i];
			}
		}
		return null;
	}
	return Service;

}]);