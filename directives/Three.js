'use strict';
var module = angular.module('cards.directives.Three',[]);

module.directive('ngWebgl', function () {
    return {
      restrict: 'A',
      scope: { 
        'width': '=',
        'height': '=',
        'fillcontainer': '=',
        'scale': '=',
        'materialType': '=',
		'spinning': '='
      },
      link: function postLink(scope, element, attrs) {

			var container;
			var camera, scene, renderer;
			var obj;
			var contW;
			var contH;
			var materials; 
			var controls;
			var hoovering;
			var mouse;
			var raycaster;
			var canvasPosition;
			var facePointed;
			
			contW = (scope.fillcontainer) ? element[0].clientWidth : scope.width,
			contH = scope.height, 
			materials = {};
			hoovering = true;
			raycaster = new THREE.Raycaster();
			mouse = new THREE.Vector2();
			
        scope.init = function () {

			// Camera
			camera = new THREE.PerspectiveCamera( 20, contW / contH, 1, 10000 );
			camera.position.z = 1800;

			// Scene
			scene = new THREE.Scene();

			var objGeometry = new THREE.BoxGeometry( 200, 200, 200 );

			for ( var i = 0; i < objGeometry.faces.length; i += 2 ) {
				var hex = Math.random() * 0xffffff;
				objGeometry.faces[ i ].color.setHex( hex );
				objGeometry.faces[ i + 1 ].color.setHex( hex );
			}

			materials.basic = new THREE.MeshBasicMaterial( 
				{ vertexColors: THREE.FaceColors, overdraw: 0.5 } );

			materials.wireframe = new THREE.MeshBasicMaterial({ 
				color: 0x000000, 
				shading: THREE.FlatShading, 
				wireframe: true, 
				transparent: true 
			});

			obj = new THREE.Mesh( objGeometry, materials[scope.materialType] );
			scene.add( obj );

			var axes = new THREE.AxisHelper(1000);
			scene.add(axes);
			var gridXZ = new THREE.GridHelper(1000, 100);
			scene.add(gridXZ);
			
			renderer = new THREE.CanvasRenderer();
			renderer.setClearColor( 0xffffff );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( contW, contH );

			// element is provided by the angular directive
			element[0].appendChild( renderer.domElement );
			canvasPosition = element[0].getBoundingClientRect();
			console.log("canvasPosition? ",canvasPosition);
			element[0].addEventListener('mouseover', scope.mouseOver);
			element[0].addEventListener('mouseout', scope.mouseOut);
			element[0].addEventListener('click', scope.onClick );
			element[0].addEventListener('mousemove', scope.onRendereMouseMove );
			controls = new THREE.OrbitControls( camera, renderer.domElement );
			controls.addEventListener('change', scope.render );
			window.addEventListener('resize', scope.onWindowResize, false );

        };
		
		scope.mouseOver = function () {
			hoovering = true;
		}
		
		scope.mouseOut = function () {
			hoovering = false;
		}

		scope.onRendereMouseMove = function (event) {
			mouse.x = ( (event.clientX - canvasPosition.left) / contW ) * 2 - 1;
			mouse.y = - ( (event.clientY - canvasPosition.top) / contH ) * 2 + 1;
			raycaster.setFromCamera( mouse, camera );
			var intersected = raycaster.intersectObjects( scene.children );
			if (intersected.length != 0) {
				facePointed = intersected[0].face.materialIndex
			} else {
				facePointed = null;
			}
		}

		scope.onClick = function (event) {
		    event.preventDefault();
			if (facePointed != null) {
				alert("face: " + facePointed);
			}
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
			contW = (scope.fillcontainer) ? element[0].clientWidth : scope.width;
			contH = scope.height;
			canvasPosition = element[0].getBoundingClientRect();
			camera.aspect = contW / contH;
			camera.updateProjectionMatrix();
			renderer.setSize( contW, contH );
        };

        scope.resizeObject = function () {
			obj.scale.set(scope.scale, scope.scale, scope.scale);
        };

        scope.changeMaterial = function () {
          obj.material = materials[scope.materialType];
        };


        // -----------------------------------
        // Draw and Animate
        // -----------------------------------
        scope.animate = function () {
			requestAnimationFrame( scope.animate );
			scope.render();
        };

		scope.render = function () {
			if (!hoovering && scope.spinning) {
				obj.rotation.y += 0.01
			}
			if (hoovering && facePointed != null) {
				// Set the camera to always point to the centre of our scene, i.e. at vector 0, 0, 0
				  camera.lookAt( scene.position );

			}
			renderer.render( scene, camera );
		};

        // -----------------------------------
        // Watches
        // -----------------------------------
        scope.$watch('fillcontainer + width + height', function () {
          scope.resizeCanvas();
        });

        scope.$watch('scale', function () {
          scope.resizeObject();
        });

        scope.$watch('materialType', function () {
          scope.changeMaterial();
        });

        // Begin

		scope.init();
        scope.animate();
			

      }
    };
  });