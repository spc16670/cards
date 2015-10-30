var module = angular.module('cards.services.Display',[]);

module.service('DisplayService', ['$rootScope','$timeout',function ($rootScope,$timeout) {

	
	var Service = {
		fabricWidth : 50
		,fabricHeight : 50
		,displayWidth : 0
		,displayHeight : 400
		,scale : 1
		,materialType : 'basic'
		,spinning : true
		,fabricShowing : false
		,materialIndex : 0
		,bgColour : null
		,sideMaterial : []
		,model : {}
		,mesh : {}
		,editingCanvas : null
		,facePointed : 0
		,rendered : 0
		,material : new THREE.MeshFaceMaterial([
			new THREE.MeshBasicMaterial( { color: 0xd3d3d3 } )
			,new THREE.MeshBasicMaterial( { color: 0xd3d3d3 } )
			,new THREE.MeshBasicMaterial( { color: 0xd3d3d3 } )
			,new THREE.MeshBasicMaterial( { color: 0xd3d3d3 } )
			,new THREE.MeshBasicMaterial( { color: 0xd3d3d3 } )
			,new THREE.MeshBasicMaterial( { color: 0xd3d3d3 } )
		])
	}

	Service.resizeCanvases = function() {
		console.log("resizing");
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
	* setModel() is called from GroupController.
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
	* @param index - fabric index from the fabric array in model fabrics properties
	*/
	Service.render = function (index) {
		var f = this.model.fabrics[index];
		var image = f.canvas.getContext('2d').canvas;
		//console.log("fabric",f);
		//window.open(image.toDataURL());
		var texture = new THREE.Texture(image);
		//console.log("texture" + index,texture);
		Service.material.materials[f.materialIndex].map = texture;
		texture.needsUpdate = true;
		this.rendered++;
		if (this.rendered == this.model.fabrics.length) {
			this.rendered = 0;
			$timeout(function(){ Service.setFabricShowing(false); },1)
		} 
	}
	
	Service.materializeMesh = function() {
		// instantiate fabrics
		var fabricIndex;
		Service.mesh = new THREE.Mesh( Service.model.geometry, Service.material );
		for (fabricIndex=0;fabricIndex<this.model.fabrics.length;fabricIndex++) {
			var f = Service.model.fabrics[fabricIndex];
			//console.log("fabric canvas",f.canvas);
			f.canvas.loadFromJSON(f.fabricJson,Service.render(fabricIndex));		
		}
	}
	
	return Service;

}]);