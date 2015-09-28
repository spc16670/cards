'use strict';
var module = angular.module('cards.directives.Three',[]);

module.directive('ngWebgl', function () {
    return {
      restrict: 'A',
      scope: { 
        'width': '=',
        'height': '=',
        'dofillcontainer': '=',
        'scale': '=',
        'materialType': '=',
		'spinning': '=',
		'fabricShowing':'='
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
		var line;
		
		contW = (scope.dofillcontainer) ? element[0].clientWidth : scope.width,
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

			materials.custom = new THREE.MeshBasicMaterial();
			
			scope.$on("apply",function() {		
				var fabricCanvas = document.getElementById("fabricCanvasElement");
				var texture = new THREE.Texture(fabricCanvas.getContext('2d').canvas);
				texture.needsUpdate = true;
				materials.custom = new THREE.MeshBasicMaterial({
					map : texture
				})
				scope.materialType = "custom";
				scope.fabricShowing = false;
				//scope.$apply();
			})
	
	
			obj = new THREE.Mesh( objGeometry, materials[scope.materialType] );
			scene.add( obj );

			//var axes = new THREE.AxisHelper(1000);
			//scene.add(axes);
			//var gridXZ = new THREE.GridHelper(1000, 100);
			//scene.add(gridXZ);
			
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
			element[0].addEventListener('click', scope.click );
			//element[0].addEventListener('mousedown', scope.onRendereMouseDown );
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

		scope.click = function (event) {
			mouse.x = ( (event.clientX - canvasPosition.left) / contW ) * 2 - 1;
			mouse.y = - ( (event.clientY - canvasPosition.top) / contH ) * 2 + 1;
			raycaster.setFromCamera( mouse, camera );
			var intersected = raycaster.intersectObjects( scene.children );
			if (intersected.length != 0) {
				facePointed = intersected[0].face.materialIndex
				console.log("intersected: ",intersected[0]);
				scope.fabricShowing = true;
				scope.$apply();
				//var start = new THREE.Vector3(0,0,0);
				//var end = new THREE.Vector3(camera.position.x,camera.position.y,camera.position.z + 200);
				//drawLine(start,end);
				//camera.position.set(0,0,1200);
				//camera.lookAt(scene.position);
			} else {
				facePointed = null;
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
			contW = (scope.dofillcontainer) ? element[0].clientWidth : scope.width;
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
			renderer.render( scene, camera );
		};

        // -----------------------------------
        // Watches
        // -----------------------------------
        scope.$watch('dofillcontainer + width + height', function () {
			scope.resizeCanvas();
        });

        scope.$watch('scale', function () {
          scope.resizeObject();
        });

        scope.$watch('materialType', function () {
          scope.changeMaterial();
        });

		function drawLine(start,end) {
			scene.remove(line);
			var material = new THREE.LineBasicMaterial({
				color: 0x0000ff
			});
			var geometry = new THREE.Geometry();
			geometry.vertices.push(start);
			geometry.vertices.push(end);
			line = new THREE.Line(geometry, material);
			scene.add(line);
		}
        // Begin

		scope.init();
        scope.animate();
			

      }
    };
  });