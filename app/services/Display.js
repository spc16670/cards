var module = angular.module('cards.services.Display',[]);

module.service('DisplayService', [function () {

	var Service = {
		canvasWidth : 400
		,canvasHeight : 400
		,dofillcontainer : true
		,scale : 1
		,materialType : 'basic'
		,spinning : true
		,fabricShowing : false
		,materialIndex : 0
		,bgColour : null
		,sideMaterial : []
		,model : {}
		,mesh : {}
		,editingCanvas : new fabric.Canvas('fabricCanvasElement')
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
	Service.setMaterialIndex = function(index) {
		Service.materialIndex = index;
	}
	Service.setBgColour = function(colour) {
		Service.bgColour = colour;
		Service.editingCanvas.setBackgroundColor(Service.bgColour,Service.editingCanvas.renderAll.bind(Service.editingCanvas));
	}
	Service.setModel = function(model) {
		Service.model = model;
		Service.materializeMesh();
	}
	
	Service.updateCanvas = function(faceIndex) {
		if (!Service.isEmpty(Service.model)) {
			var i;
			for (i=0;i<Service.model.fabrics.length;i++) {
				if (Service.model.fabrics[i].faceIndex == faceIndex) {
					Service.editingCanvas.loadFromJSON(Service.model.fabrics[i].fabricJson);
					return;
				}
			}
			var canvas = Service.sideCanvasInstance(faceIndex);
			var textItem = new fabric.IText('Tap and Type', { 
				fontFamily: 'arial black',
				left: 10, 
				top: 10 
			});
			canvas.add(textItem)
			canvas.backgroundColor = "white";
			canvasObj = canvas.toObject();
			Service.editingCanvas.loadFromJSON(canvasObj);	
		}
	}
	
	Service.updateModel = function () {
		var i;
		var save = Service.editingCanvas.toObject();
		console.log("Save: ",save)
		for (i=0;i<Service.model.fabrics.length;i++) {
			if (Service.model.fabrics[i].faceIndex == Service.materialIndex) {
				Service.model.fabrics[i].fabricJson = save;
				return;
			}
		}
		Service.model.fabrics.push({ faceIndex: Service.materialIndex, fabricJson: save });
	}
	
	Service.isEmpty = function isEmpty(obj) {
		for(var prop in obj) {
			if(obj.hasOwnProperty(prop)) 
				return false;
		}
		return true;
	}
	
	Service.sideCanvasInstance = function (sideIndex) {
		var name = "model_side_" + sideIndex;
		var canvas = document.getElementById(name);
		if (canvas == null) {
			canvas = document.createElement('canvas');
			canvas.id = name;
		} 
		return new fabric.Canvas(canvas.id);
	}
	
	Service.materializeMesh = function() {
		if (!Service.isEmpty(Service.model)) {
			var i;
			// Fabric.js JSON -> BITMAP
			var material = new THREE.MeshFaceMaterial([
				new THREE.MeshBasicMaterial( { color: 0xd3d3d3 } )
				,new THREE.MeshBasicMaterial( { color: 0xd3d3d3 } )
				,new THREE.MeshBasicMaterial( { color: 0xd3d3d3 } )
				,new THREE.MeshBasicMaterial( { color: 0xd3d3d3 } )
				,new THREE.MeshBasicMaterial( { color: 0xd3d3d3 } )
				,new THREE.MeshBasicMaterial( { color: 0xd3d3d3 } )
			]);

			for (i=0;i<Service.model.fabrics.length;i++) {
				var fabricJson = Service.model.fabrics[i];
				var canvas = Service.sideCanvasInstance(fabricJson.faceIndex);
				canvas.loadFromJSON(fabricJson.fabricJson);		
				var texture = new THREE.Texture(canvas.getContext('2d').canvas);
				texture.needsUpdate = true;
				var faceMaterial = new THREE.MeshBasicMaterial( { map : texture } );
				material.materials[fabricJson.faceIndex] = faceMaterial;
			}	
			
			material.needsUpdate = true;
			Service.mesh = new THREE.Mesh(
				Service.model.geometry
				,material
			);
		}
	}
	return Service;

}]);