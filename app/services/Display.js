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
		,model : null
		,mesh : {}
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
	}
	Service.setModel = function(model) {
		Service.model = model;
	}
	Service.materializeMesh = function() {
		if (Service.model != null) {
			console.log("Materializing model: ",Service.model);
			var i;
			// Fabric.js JSON -> BITMAP
			var material = new THREE.MeshFaceMaterial([
				new THREE.MeshBasicMaterial( )
				,new THREE.MeshBasicMaterial( )
				,new THREE.MeshBasicMaterial( )
				,new THREE.MeshBasicMaterial( )
				,new THREE.MeshBasicMaterial( )
				,new THREE.MeshBasicMaterial( )
			]);

			for (i=0;i<Service.model.fabrics.length;i++) {
				var fabricJson = Service.model.fabrics[i];
				var canvas = new fabric.Canvas('testCanvas');
				
				console.log("canvas",fabricJson.fabricJson);
				canvas.loadFromJSON(fabricJson.fabricJson);
				canvas.renderAll();				
								
				var texture = new THREE.Texture(canvas.getContext('2d').canvas);
				console.log("new canvas",canvas.getContext('2d').canvas);
				texture.needsUpdate = true;
				var faceMaterial = new THREE.MeshBasicMaterial( { map : texture } );
				material.materials[fabricJson.faceIndex] = faceMaterial;
			}	
			
			
			//var material = new THREE.MeshFaceMaterial(materials);
			
			
			material.needsUpdate = true;
			Service.mesh = new THREE.Mesh(
				Service.model.geometry
				,material
			);
		}
	}
	return Service;

}]);