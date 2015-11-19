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
		,bgColour : null
		//,sideMaterial : []
		,model : {}
		,mesh : {}
		,editingCanvas : null
		,facePointed : 0
	}

	Service.resizeCanvases = function() {
		$rootScope.$broadcast("display:resize");
		$rootScope.$broadcast("fabric:resize");
	}
	
	window.addEventListener('resize', Service.resizeCanvases, false );
	
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
	Service.setScale = function(sc) { Service.scale = sc; }
	Service.setSpinning = function(spin) { Service.spinning = spin; }
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
	Service.setBgColour = function(colour) {
		Service.bgColour = colour || "#ffffff";
		if (Service.editingCanvas != null) {
			Service.editingCanvas.setBackgroundColor(Service.bgColour,Service.editingCanvas.renderAll.bind(Service.editingCanvas));
		}
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
		var canvasSize = Service.getEditingCanvasSize(face);
		if (canvasSize != undefined) {
			Service.fabricWidth = canvasSize.x;
			Service.fabricHeight = canvasSize.y;	
		}
	}
	
	/**
	* Fabric directive updates the materialIndex value first and then calls the 
	* method to update the canvas.
	*/
	Service.updateCanvas = function() {
		if (!Service.isEmpty(Service.model)) {
			var i;
			for (i=0;i<Service.model.fabrics.length;i++) {
				if (Service.model.fabrics[i].materialIndex == this.facePointed) {
					Service.editingCanvas.loadFromJSON(Service.model.fabrics[i].fabricJson);
					return;
				}
			}
		}
	}
	
	Service.updateModel = function () {
		var i;
		var save = Service.editingCanvas.toObject();
		//console.log("save:",save.objects[0]);
		for (i=0;i<Service.model.fabrics.length;i++) {
			console.log("asdf: ",Service.model.fabrics[i]);
			if (Service.model.fabrics[i].materialIndex == this.facePointed) {
				Service.model.fabrics[i].fabricJson = save;
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
			// CanvasRenderer: texture.onUpdate() support. See #7628 - 91110eb
			texture.onUpdate = function (t) {
				t.needsUpdate = true;
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
		$timeout(function(){ console.log(Service.mesh);Service.setFabricShowing(false); },10)
	}
	
	return Service;

}]);