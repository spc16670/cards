var module = angular.module('cards.services.Display',[]);

module.service('DisplayService', ['$rootScope','$timeout',function ($rootScope,$timeout) {

	
	var Service = {
		fabricWidth : 50
		,fabricHeight : 50
		,displayWidth : 0
		,displayHeight : 400
		
		,scale : 1
		,spinning : true
		,helpers : false
		,normals : false
		,wireframe : false
		
		,fabricShowing : false
		,materialIndex : 0
		//,bgColour : null
		,model : {}
		,mesh : {}
		,editingCanvas : null
		,facePointed : 0
	}
	
	Service.setResizeFabric = function(value) {
		Service.resizeFabric = value;
	}
	
	Service.setDisplayWidth = function(width) {
		Service.displayWidth = width;
	}
	
	Service.setDisplayHeight = function(height) {
		Service.displayHeight = height;
	}
	
	Service.setResizeDisplay = function(value) {
		Service.resizeDisplay = value;
	}

	//----------------------- Display Area Controls ---------------------------
	Service.setScale = function(set) { Service.scale = set; }
	Service.setSpinning = function(set) { Service.spinning = set; }
	Service.setWireframe = function(set) { Service.wireframe = set; }
	Service.setHelpers = function(set) { Service.helpers = set; }
	Service.setNormals = function(set) { Service.normals = set; }
	//-------------------------------------------------------------------------
	
	Service.setFabricShowing = function(showing) {
		Service.fabricShowing = showing;
	}
	
	Service.setEditingCanvas = function(canvas) {
		Service.editingCanvas = canvas;
	}
	
	Service.setMesh = function(m) {
		Service.mesh = m;
	}
	
	/**
	* setModel() is called from CategoriesController.
	*/
	Service.setModel = function(model) {
		this.model = model;
	}
	
	Service.setFacePointed = function(face) {
		this.facePointed = face;
	}
	
	Service.getCurrentFabric = function() {
		return Service.editingCanvas.toObject();
	}
	/**
	* Fabric directive updates the materialIndex value first and then calls the 
	* method to update the canvas.
	*/
	Service.materializeFabric = function() {
		console.log("Service.materializeFabric",Service.model);
		if (!Service.isEmpty(Service.model)) {
			var i;
			for (i=0;i<Service.model.fabrics.length;i++) {
				if (Service.model.fabrics[i].materialIndex == this.facePointed) {
					console.log(" FACE " + this.facePointed,Service.model.fabrics[i].fabricJson);
					Service.editingCanvas.loadFromJSON(Service.model.fabrics[i].fabricJson,Service.editingCanvas.renderAll.bind(Service.editingCanvas));
					var canvasSize = Service.getEditingCanvasSize(this.facePointed);
					if (canvasSize != undefined) {
						Service.fabricWidth = canvasSize.x;
						Service.fabricHeight = canvasSize.y;	
					}
					return;
				}
			}
		}
	}
	
	Service.updateModel = function () {
		var i;
		for (i=0;i<Service.model.fabrics.length;i++) {
			if (Service.model.fabrics[i].materialIndex == this.facePointed) {
				Service.model.fabrics[i].fabricJson = Service.getCurrentFabric();
				return;
			}
		}
	}
	
	Service.isEmpty = function isEmpty(obj) {
		for(var prop in obj) {
			if(obj.hasOwnProperty(prop)) 
				return false;
		}
		return true;
	}
	
	Service.getEditingCanvasSize = function (faceIndex) {
		var i;
		for (i=0;i<Service.model.fabrics.length;i++) {
			var face = Service.model.fabrics[i];
			if (face.materialIndex == faceIndex) {
				var materialSize = Service.model.geometry.getMaterialSize();
				//console.log("getEditingCanvasSize xy",materialSize.x , materialSize.y);
				return { x : materialSize.x  , y : materialSize.y  };
				//return { x : 300  , y : 150  };
			}
		}
		return undefined;
	}
	
	/**
	*
	*/
	Service.materializeMesh = function() {
		var updateMaterial = function(index) {
			var f = Service.model.fabrics[index];
			var image = f.canvas.getContext('2d').canvas;
			var texture = new THREE.Texture(image);
			/**
			* CanvasRenderer: texture.onUpdate() support. See #7628 - 91110eb
			* 
			*/			
			texture.onUpdate = function (t) {
				$timeout(function(){ t.needsUpdate = true; });
			};
			Service.mesh.material.materials[f.materialIndex].map = texture;
			texture.needsUpdate = true;
		}
		
		var materials = [];
		var i;
		for (i=0;i<Service.model.geometry.sides;i++) {
			materials.push(new THREE.MeshBasicMaterial( { color: 0xd3d3d3, overdraw : true } ));
		}
		var material = new THREE.MeshFaceMaterial(materials);
		Service.mesh = new THREE.Mesh( Service.model.geometry, material );
		var fabricIndex;
		for (fabricIndex=0;fabricIndex<this.model.fabrics.length;fabricIndex++) {
			var f = this.model.fabrics[fabricIndex];
			f.canvas.loadFromJSON(f.fabricJson,updateMaterial(fabricIndex));		
		}
		$timeout(function(){ console.log(Service.mesh);Service.setFabricShowing(false); })
	}
	
	return Service;

}]);