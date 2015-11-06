'use strict';
var module = angular.module('cards.directives.Display',[]);

module.directive('ngWebgl', ['DisplayService','$timeout',function (DisplayService,$timeout) {
    return {
      restrict: 'A',
      scope: { 
        'scale': '='
        ,'materialType': '='
		,'spinning': '='
      },
      link: function postLink(scope, element, attrs) {

		var directive = {
			camera : null
			,scene : null
			,renderer : null
			,rafId : null 
			,obj : null
			,contW : 0
			,contH : 0
			,materials : {}
			,controls : null
			,hoovering : false
			,sceneClicked : false
			,clickPromise : null 
			,clickIsValid : true
			,raycaster : new THREE.Raycaster()
			,mouse : new THREE.Vector2()
		}
		
		directive.contW = DisplayService.displayWidth == 0 ? element[0].clientWidth : DisplayService.displayWidth;
		directive.contH = DisplayService.displayHeight == 0 ? element[0].clientHeight : DisplayService.displayHeight;
			
         function init() {
			// Camera
			directive.camera = new THREE.PerspectiveCamera( 20, directive.contW / directive.contH, 1, 10000 );
			directive.camera.position.z = 1400;

			// Scene
			directive.scene = new THREE.Scene();

			var objGeometry = new THREE.BoxGeometry( 200, 200, 200 );

			for ( var i = 0; i < objGeometry.faces.length; i += 2 ) {
				var hex = Math.random() * 0xffffff;
				objGeometry.faces[ i ].color.setHex( hex );
				objGeometry.faces[ i + 1 ].color.setHex( hex );
			}

			directive.materials.basic = new THREE.MeshBasicMaterial( 
				{ vertexColors: THREE.FaceColors, overdraw: 0.5 } );

			directive.materials.wireframe = new THREE.MeshBasicMaterial({ 
				color: 0x000000, 
				shading: THREE.FlatShading, 
				wireframe: true, 
				transparent: true 
			});

			directive.materials.custom = new THREE.MeshFaceMaterial([
				new THREE.MeshBasicMaterial( )
				,new THREE.MeshBasicMaterial( )
				,new THREE.MeshBasicMaterial( )
				,new THREE.MeshBasicMaterial( )
				,new THREE.MeshBasicMaterial( )
				,new THREE.MeshBasicMaterial( )
			]);
	
			directive.obj = new THREE.Mesh( objGeometry, directive.materials[scope.materialType] );
			directive.scene.add( directive.obj );
			
			directive.renderer = new THREE.CanvasRenderer();
			directive.renderer.setClearColor( 0xffffff );
			directive.renderer.setPixelRatio( window.devicePixelRatio );
			directive.renderer.setSize( directive.contW, directive.contH );
			
			element[0].appendChild( directive.renderer.domElement );
			
			element[0].addEventListener('mouseover', scope.mouseOver);
			element[0].addEventListener('mouseout', scope.mouseOut);
			element[0].addEventListener('mousedown', scope.mouseDown );
			element[0].addEventListener('mouseup', scope.mouseUp );

			directive.controls = new THREE.OrbitControls( directive.camera, directive.renderer.domElement );
			directive.controls.addEventListener('change', render );
        };
		
		scope.resetAnimation = function () {
			directive.sceneClicked = false;
			if (directive.obj.geometry.reset != undefined) { 
				directive.obj.geometry.reset();
			}
		}
		
		scope.mouseOver = function () {
			directive.hoovering = true;
		}
		
		scope.mouseOut = function () {
			directive.hoovering = false;
			scope.resetAnimation();
		}

		scope.mouseUp = function (event) {
			$timeout.cancel(directive.clickPromise);
			if (directive.clickIsValid) {
				if (directive.sceneClicked) {
					var canvasPosition = element[0].getBoundingClientRect();
					directive.mouse.x = ( (event.clientX - canvasPosition.left) / directive.contW ) * 2 - 1;
					directive.mouse.y = - ( (event.clientY - canvasPosition.top) / directive.contH ) * 2 + 1;
					directive.raycaster.setFromCamera( directive.mouse, directive.camera );
					var intersected = directive.raycaster.intersectObjects( directive.scene.children );
					if (intersected.length != 0) {
						directive.sceneClicked = false;
						scope.resetAnimation();
						var facePointed = intersected[0].face.materialIndex
						DisplayService.setFacePointed(facePointed);
						DisplayService.setFabricShowing(true);
						scope.$apply();
						//var start = new THREE.Vector3(0,0,0);
						//var end = new THREE.Vector3(camera.position.x,camera.position.y,camera.position.z + 200);
						//drawLine(start,end);
						//camera.position.set(0,0,1200);
						//camera.lookAt(scene.position);
					} else {
						scope.resetAnimation();
					}	
				} else {
					directive.sceneClicked = true;
					directive.obj.rotation.x = 0;
					directive.obj.rotation.y = 0;
					directive.obj.rotation.z = 0;
					directive.obj.lookAt(directive.camera.position);
					directive.obj.rotation.x = 0;
					directive.obj.rotation.y = 0;
					directive.obj.rotation.z = 0;

				}
			} else {
				directive.clickIsValid = true;
			}
        };
		
		scope.mouseDown = function (event) {
			directive.clickPromise = $timeout( scope.beenDragged , 300);
		}

		scope.beenDragged = function () {
			directive.clickIsValid = false;
		}
		
        // -----------------------------------
        // Event listeners
        // -----------------------------------
        scope.onWindowResize = function () {
			scope.resizeCanvas();
        };
		
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

        scope.resizeObject = function () {
			directive.obj.scale.set(scope.scale, scope.scale, scope.scale);
        };

        // -----------------------------------
        // Watches
        // -----------------------------------
        //scope.$watch('dofillcontainer + width + height', function () {
		//	scope.resizeCanvas();
        //});

        scope.$watch('scale', function () {
          scope.resizeObject();
        });
		
		scope.$watch('materialType', function () {
			directive.obj.material = directive.materials[scope.materialType] ;
        });
		
		scope.$watch(function () {return DisplayService.mesh}, function () {
			if (!DisplayService.isEmpty(DisplayService.mesh)) {
				console.log("....changing mesh in service....");
				directive.scene.remove(directive.obj);
				directive.obj = DisplayService.mesh;
				directive.scene.add(directive.obj);
			}
        });

        scope.$on("display:resize",function() {
			scope.resizeCanvas();
		})

		scope.$on('$destroy', function() {
			function empty(elem) {
				while (elem.lastChild) elem.removeChild(elem.lastChild);
			}
			$timeout.cancel(directive.clickPromise);
			cancelAnimationFrame(directive.rafId);// Stop the animation
			directive.renderer.domElement.addEventListener('mouseover', null, false); //remove listener to render
			directive.renderer.domElement.addEventListener('mouseout', null, false); //remove listener to render
			directive.renderer.domElement.addEventListener('mousedown', null, false); //remove listener to render
			directive.renderer.domElement.addEventListener('mouseup', null, false); //remove listener to render
			directive.scene = null;
			directive.projector = null;
			directive.camera = null;
			directive.controls = null;
			directive.raycaster = null;
			directive.materials = null;
			directive.mouse = null;
			directive.obj = null;
			directive.clickPromise = null;
			empty(element[0]);
			element[0].remove();
			directive = null;
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
				directive.obj.rotation.y += 0.01
			}
			
			if (directive.obj.geometry.play != undefined) {
				if (directive.sceneClicked) { 
					directive.obj.geometry.play(); 
				}
			}

			
			directive.renderer.render( directive.scene, directive.camera );
		};
		
		init();
        animate();
			

      }
    };
  }]);