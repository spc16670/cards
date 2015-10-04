var module = angular.module('cards.services.Display',[]);

module.service('DisplayService', ['$rootScope',function ($rootScope) {

	
	var Service = {
		fabricWidth : 200
		,fabricHeight : 150
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
	Service.setMaterialIndex = function(index) {
		Service.materialIndex = index;
		var canvasSize = Service.getEditingCanvasSize(index);
		if (canvasSize != undefined) {
			Service.fabricWidth = canvasSize.x;
			Service.fabricHeight = canvasSize.y;	
		}
		//Service.editingCanvas.renderAll();
	}
	Service.setEditingCanvas = function(canvas) {
		Service.editingCanvas = canvas;
	}
	Service.setBgColour = function(colour) {
		Service.bgColour = colour;
		Service.editingCanvas.setBackgroundColor(Service.bgColour,Service.editingCanvas.renderAll.bind(Service.editingCanvas));
	}
	Service.setModel = function(model) {
		Service.model = model;
		//$rootScope.$broadcast("fabric:resize");
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
			/*
			var canvas = Service.sideCanvasInstance(faceIndex);
			var textItem = new fabric.IText('Tap and Type', { 
				fontFamily: 'arial black',
				left: 10, 
				top: 10 
			});
			canvas.add(textItem)
			canvas.backgroundColor = "white";
			canvasObj = canvas.toObject();
			Service.editingCanvas.loadFromJSON(canvasObj);	*/
		}
	}
	
	Service.updateModel = function () {
		var i;
		var save = Service.editingCanvas.toObject();
		for (i=0;i<Service.model.fabrics.length;i++) {
			if (Service.model.fabrics[i].faceIndex == Service.materialIndex) {
				Service.model.fabrics[i].fabricJson = save;
				return;
			}
		}
		//Service.model.fabrics.push({ faceIndex: Service.materialIndex, fabricJson: save });
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
			if (face.faceIndex == faceIndex) {
				return { x : face.size.x * 1.5, y : face.size.y * 1.5};
			}
		}
		return undefined;
	}
	
	Service.sideCanvasInstance = function (face) {
		var name = "model_side_" + face.faceIndex;
		var canvas = document.getElementById(name);
		if (canvas == null) {
			canvas = document.createElement('canvas');
			canvas.id = name;
		}
		canvas.width = face.size.x;
		canvas.height = face.size.y;
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
				var fabric = Service.model.fabrics[i];
				var canvas = Service.sideCanvasInstance(fabric);
				canvas.loadFromJSON(fabric.fabricJson);		
				var texture = new THREE.Texture(canvas.getContext('2d').canvas);
				texture.needsUpdate = true;
				var faceMaterial = new THREE.MeshBasicMaterial( { map : texture } );
				material.materials[fabric.faceIndex] = faceMaterial;
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