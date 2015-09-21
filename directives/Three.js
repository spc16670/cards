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
        'materialType': '='
      },
      link: function postLink(scope, element, attrs) {

			var container;
			var camera, scene, renderer;
			var obj;
			var targetRotation = 0;
			var targetRotationOnMouseDown = 0;
			var mouseX = 0;
			var mouseXOnMouseDown = 0;
			var contW;
			var contH;
			var windowHalfX;
			var windowHalfY;
			var materials; 
			
          contW = (scope.fillcontainer) ? element[0].clientWidth : scope.width,
          contH = scope.height, 
          windowHalfX = contW / 2,
          windowHalfY = contH / 2,
          materials = {};


        scope.init = function () {

          // Camera
          camera = new THREE.PerspectiveCamera( 20, contW / contH, 1, 10000 );
		  camera.position.y = 150;
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
			transparent: true });

		  
			obj = new THREE.Mesh( objGeometry, materials[scope.materialType] );
			obj.position.y = 150;
			scene.add( obj );

			renderer = new THREE.CanvasRenderer();
			renderer.setClearColor( 0xffffff );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( contW, contH );

			// element is provided by the angular directive
			element[0].appendChild( renderer.domElement );

  
			document.addEventListener( 'mousedown', scope.onDocumentMouseDown, false );
			window.addEventListener( 'resize', scope.onWindowResize, false );

        };

        // -----------------------------------
        // Event listeners
        // -----------------------------------
        scope.onWindowResize = function () {
			scope.resizeCanvas();
        };

        scope.onDocumentMouseMove = function ( event ) {
          	mouseX = event.clientX - windowHalfX;
			targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
        };
		
		scope.onDocumentMouseDown = function ( event ) {
			document.addEventListener( 'mousemove', scope.onDocumentMouseMove, false );
			document.addEventListener( 'mouseup', scope.onDocumentMouseUp, false );
			document.addEventListener( 'mouseout', scope.onDocumentMouseOut, false );
			mouseXOnMouseDown = event.clientX - windowHalfX;
			targetRotationOnMouseDown = targetRotation;
		}
		
		scope.onDocumentMouseUp= function( event ) {
			document.removeEventListener( 'mousemove', scope.onDocumentMouseMove, false );
			document.removeEventListener( 'mouseup', scope.onDocumentMouseUp, false );
			document.removeEventListener( 'mouseout', scope.onDocumentMouseOut, false );
		}

		scope.onDocumentMouseOut= function( event ) {
			document.removeEventListener( 'mousemove', scope.onDocumentMouseMove, false );
			document.removeEventListener( 'mouseup', scope.onDocumentMouseUp, false );
			document.removeEventListener( 'mouseout', scope.onDocumentMouseOut, false );
		}

        // -----------------------------------
        // Updates
        // -----------------------------------
        scope.resizeCanvas = function () {

          contW = (scope.fillcontainer) ? 
            element[0].clientWidth : scope.width;
          contH = scope.height;

          windowHalfX = contW / 2;
          windowHalfY = contH / 2;

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

          //camera.position.x += ( mouseX - camera.position.x ) * 0.05;
		  obj.rotation.y += ( targetRotation - obj.rotation.y ) * 0.05;
          // camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

          //camera.lookAt( scene.position );

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