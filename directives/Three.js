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
			var start;
			
			contW = (scope.fillcontainer) ? element[0].clientWidth : scope.width,
			contH = scope.height, 
			start = Date.now();
			materials = {};
  
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

			renderer = new THREE.CanvasRenderer();
			renderer.setClearColor( 0xffffff );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( contW, contH );

			// element is provided by the angular directive
			element[0].appendChild( renderer.domElement );
		
			controls = new THREE.OrbitControls( camera, renderer.domElement );
			controls.addEventListener( 'change', scope.render );

			window.addEventListener( 'resize', scope.onWindowResize, false );

        };
		


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
			var timer = Date.now() - start;
			if (scope.spinning) {
				obj.rotation.x = timer * 0.0002;
				obj.rotation.z = timer * 0.0003;
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