'use strict';
var module = angular.module('cards.directives.Display',[]);

module.directive('ngWebgl', ['DisplayService','$timeout','$rootScope','UtilsService'
	,function (DisplayService,$timeout,$rootScope,UtilsService) {
		
    return {
      restrict: 'A'
      ,link: function postLink(scope, element, attrs) {

		var directive = {
			contW : DisplayService.displayWidth == 0 ? element[0].clientWidth : DisplayService.displayWidth
			,contH : DisplayService.displayHeight == 0 ? element[0].clientHeight : DisplayService.displayHeight
			,camera : null
			,scene : null
			,renderer : null
			,rafId : null 
			,obj : null
			,sprites : null
			,materials : {}
			,controls : null
			,hoovering : false
			,sceneClicked : false
			,clickPromise : null 
			,clickIsValid : true
			,raycaster : new THREE.Raycaster()
			,mouse : new THREE.Vector2()
		}
			
         function init() {
			console.log("Display init()");
			// Camera
			directive.camera = new THREE.PerspectiveCamera( 20, directive.contW / directive.contH, 1, 8000 );
			directive.camera.position.set( 0, 500, 1000 );
			
			// Scene
			directive.scene = new THREE.Scene();
			
			var objGeometry = new THREE.BoxGeometry( 200, 200, 200 );

			for ( var i = 0; i < objGeometry.faces.length; i += 2 ) {
				var hex = Math.random() * 0xffffff;
				objGeometry.faces[ i ].color.setHex( hex );
				objGeometry.faces[ i + 1 ].color.setHex( hex );
			}

			directive.materials.printed = new THREE.MeshBasicMaterial( 
				{ vertexColors: THREE.FaceColors, overdraw: 0.5 } );

			directive.materials.wireframe = new THREE.MeshBasicMaterial({ 
				color: 0x000000, 
				shading: THREE.FlatShading, 
				wireframe: true, 
				transparent: true 
			});
	
			directive.obj = new THREE.Mesh( objGeometry, directive.materials.printed );
			directive.scene.add( directive.obj );
			
			directive.renderer = new THREE.CanvasRenderer();
			directive.renderer.setClearColor( 0xffffff ); // renderer background 
			directive.renderer.setPixelRatio( window.devicePixelRatio );
			directive.renderer.setSize( directive.contW, directive.contH );
			
			element[0].appendChild( directive.renderer.domElement );
			
			element[0].addEventListener('mouseover', scope.mouseOver);
			element[0].addEventListener('mouseout', scope.mouseOut);
			element[0].addEventListener('mousedown', scope.mouseDown );
			element[0].addEventListener('mouseup', scope.mouseUp );
			window.addEventListener('resize', scope.resizeCanvas, false );

			directive.controls = new THREE.OrbitControls( directive.camera, directive.renderer.domElement );
			directive.controls.addEventListener('change', render );
        };
		
		scope.resetAnimation = function () {
			directive.sceneClicked = false;
			if (directive.sprites != null) {
				scope.removeSideLabels();
			}
			if (directive.obj.geometry.reset != undefined) { 
				directive.obj.geometry.reset();
			}
		}
		
		scope.mouseOver = function (event) {
			directive.hoovering = true;
		}
		
		scope.mouseOut = function () {
			directive.hoovering = false;
			scope.resetAnimation();
		}
		
		scope.mouseDown = function (event) {
			directive.clickPromise = $timeout( scope.beenDragged , 300);
		}

		scope.beenDragged = function () {
			directive.clickIsValid = false;
		}

		scope.mouseUp = function (event) {
			$timeout.cancel(directive.clickPromise);
			if (directive.clickIsValid) {
				if (directive.sceneClicked) {
					var pointed = scope.intersected(event);
					if (pointed != null) {
						directive.sceneClicked = false;
						scope.resetAnimation();
						DisplayService.setFacePointed(pointed);
						$timeout(function(){ DisplayService.setFabricShowing(true) });
						//scope.$apply();
					} else {
						scope.resetAnimation();
					}	
				} else {
					directive.sceneClicked = true;
					scope.sideLabelSprites();
					directive.obj.rotation.x = 0;
					directive.obj.rotation.z = 0;
					directive.obj.rotation.y = 0;
					directive.obj.lookAt(directive.camera.position);
					directive.obj.rotation.x = 0;
					directive.obj.rotation.z = 0;
					directive.obj.rotation.y = 0;
				}
			} else {
				directive.clickIsValid = true;
			}
        };
		
		scope.intersected = function (event) {
			var canvasPosition = element[0].getBoundingClientRect();
			directive.mouse.x = ( (event.clientX - canvasPosition.left) / directive.contW ) * 2 - 1;
			directive.mouse.y = - ( (event.clientY - canvasPosition.top) / directive.contH ) * 2 + 1;
			directive.raycaster.setFromCamera( directive.mouse, directive.camera );
			var intersected = directive.raycaster.intersectObjects( directive.scene.children );
			if (intersected.length != 0) {
				var i;
				for (i=0;i<intersected.length;i++) {
					var obj = intersected[i];
					if (obj.face != null) {
						return obj.face.materialIndex;
					} 
				}
				return null;
			} else {
				return null;
			}
		}
        // -----------------------------------
        // Event listeners
        // -----------------------------------

		
        // -----------------------------------
        // Updates
        // -----------------------------------
        scope.resizeCanvas = function () {
			directive.contW = DisplayService.displayWidth == 0 ? element[0].clientWidth : DisplayService.displayWidth;
			directive.contH = DisplayService.displayHeight == 0 ? element[0].clientHeight : DisplayService.displayHeight;
			directive.camera.aspect = directive.contW / directive.contH;
			directive.camera.updateProjectionMatrix();
			directive.renderer.setSize( directive.contW, directive.contH );
        };
		
		/**
		* @TODO: Position by x and z and from any object position
		*/
		scope.positionCamera = function() {
			var y = directive.obj.geometry.height / 2;
			directive.controls.target.copy( new THREE.Vector3(0,y,0) );
			directive.controls.update();
		}
		
		
		scope.removeSideLabels = function () {
			var i;
			for (i=0;i<directive.sprites.length;i++) {
				directive.scene.remove(directive.sprites[i]);
			}
			directive.sprites = null;
		}
		
		scope.updateSpritePositions = function () {
			var i;
			for (i=0;i<directive.sprites.length;i++) {
				var position = directive.obj.geometry.getSideLabelVertex(i);
				directive.sprites[i].position.set(position.x,position.y,position.z);
			} 
		}
		
		scope.sideLabelSprites = function() {
			directive.sprites = [];
			var i;
			for (i=0;i<directive.obj.geometry.sides;i++) {
				var position = directive.obj.geometry.getSideLabelVertex(i);
				var spritey = WHALE.makeTextSprite( " Side " + (i + 1), i,
					{ fontsize: 24, borderColor: {r: 255, g: 0, b: 0, a: 1.0}, backgroundColor: {r:255, g:100, b:100, a:0.8} } );
				spritey.position.set(position.x,position.y,position.z);
				directive.sprites.push(spritey);
				directive.scene.add(spritey);
			}
		};

        // -----------------------------------
        // Watches
        // -----------------------------------


		scope.$watch(function () {return DisplayService.spinning}, function () {
			scope.spinning = DisplayService.spinning;
        },true);
		
        scope.$watch(function () {return DisplayService.scale}, function () {
			directive.obj.scale.set(DisplayService.scale, DisplayService.scale, DisplayService.scale);
        },true);
		
		scope.$watch(function () {return DisplayService.helpers}, function () {
			if (DisplayService.helpers) {
				var axes = new THREE.AxisHelper(1200);
				directive.scene.add(axes);
				var gridXZ = new THREE.GridHelper(1000, 10);
				directive.scene.add(gridXZ);
			} else {
				var i;
				for (i=0;i<directive.scene.children.length;i++) {
					if (directive.scene.children[i] instanceof THREE.AxisHelper) {
						directive.scene.remove(directive.scene.children[i]);
					}
					if (directive.scene.children[i] instanceof THREE.GridHelper) {
						directive.scene.remove(directive.scene.children[i]);
					}
				}
			}
        },true);
		
		scope.$watch(function () {return DisplayService.wireframe}, function () {
			if (DisplayService.wireframe) {
				directive.obj.material = directive.materials.wireframe;
			} else {
				directive.obj.material = directive.materials.printed;
			}
        },true);
		
		scope.$watch(function () {return DisplayService.normals}, function () {
			if (DisplayService.normals) {
				var faceNormals = new THREE.FaceNormalsHelper( directive.obj, 20, 0x00ff00, 1 );
				directive.scene.add( faceNormals );
				var vertexNormals = new THREE.VertexNormalsHelper( directive.obj, 20, 0x00ff00, 1 );
				directive.scene.add( vertexNormals );
			} else {
				var i;
				for (i=0;i<directive.scene.children.length;i++) {
					if (directive.scene.children[i] instanceof THREE.FaceNormalsHelper) {
						directive.scene.remove(directive.scene.children[i]);
					}
					if (directive.scene.children[i] instanceof THREE.VertexNormalsHelper) {
						directive.scene.remove(directive.scene.children[i]);
					}
				}
			}
        },true);
		
		scope.$watch(function () {return DisplayService.mesh}, function () {
			if (!DisplayService.isEmpty(DisplayService.mesh)) {
				directive.scene.remove(directive.obj);
				directive.obj = DisplayService.mesh;
				directive.materials.printed = directive.obj.material;
				directive.scene.add(directive.obj);	
				directive.obj.geometry.print();
				$timeout(function() { scope.resizeCanvas (); scope.positionCamera() },1);
			}
        });

		scope.$on('$destroy', function() {
			$timeout.cancel(directive.clickPromise);
			cancelAnimationFrame(directive.rafId);// Stop the animation
	
			directive.scene = null;
			directive.projector = null;
			directive.camera = null;
			directive.controls = null;
			directive.raycaster = null;
			directive.materials = null;
			directive.sprites = null;
			directive.mouse = null;
			directive.obj = null;
			directive.clickPromise = null;
			directive = null;
			
			var x = element[0];
			UtilsService.removeListener(x,'mouseover',scope.mouseOver);
			UtilsService.removeListener(x,'mouseout',scope.mouseOut);
			UtilsService.removeListener(x,'mousedown', scope.mouseDown);
			UtilsService.removeListener(x,'mouseup',scope.mouseUp);
			UtilsService.removeChildren(x);
			x.remove();
			
			x = window;
			UtilsService.removeListener(x,'resize',scope.resizeCanvas);
			
			
        });

		// -----------------------------------
        // Draw and Animate
        // -----------------------------------
        function animate () {
			directive.rafId = requestAnimationFrame( animate );
			render();
        };

		function render () {
			if (!directive.hoovering && scope.spinning) {
				directive.obj.rotation.y += 0.005
			}
			if (directive.obj.geometry.play != undefined) {
				if (directive.sceneClicked) { 
					directive.obj.geometry.play();
					scope.updateSpritePositions();
				}
			}
			directive.renderer.render( directive.scene, directive.camera );
		};
		
		init();
        animate();
			

      }
    };
  }]);