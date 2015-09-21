var container;
var camera, scene, renderer;
var obj;
var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var mouseX = 0;
var mouseXOnMouseDown = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;



$(document).ready(function() { /* code here */ 
	console.log("1/2 Width: ",windowHalfX);
	console.log("1/2 Height: ",windowHalfY);
	init();
	animate();
});


function init() {

	container = document.getElementById( 'threeCanvased' );

	var info = document.createElement( 'div' );
	info.style.position = 'relative';
	info.style.top = '10px';
	info.style.width = '100%';
	info.style.textAlign = 'center';
	info.innerHTML = 'Drag to spin the cube';
	container.appendChild( info );

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.y = 150;
	camera.position.z = 500;

	scene = new THREE.Scene();

	// Cube
	
	var objGeometry = new THREE.BoxGeometry( 200, 200, 200 );

	for ( var i = 0; i < objGeometry.faces.length; i += 2 ) {
		var hex = Math.random() * 0xffffff;
		objGeometry.faces[ i ].color.setHex( hex );
		objGeometry.faces[ i + 1 ].color.setHex( hex );
	}


	// ========================================================
	// material
	
	var material = new THREE.MeshBasicMaterial( 
		{ vertexColors: THREE.FaceColors, overdraw: 0.5 } );

	/*
	var texture = new THREE.Texture(canvas.getContext().canvas);
	texture.needsUpdate = true;
	var material    = new THREE.MeshBasicMaterial({
	    map : texture
	})
    */

	obj = new THREE.Mesh( objGeometry, material );
	obj.position.y = 150;
	scene.add( obj );

    //
	
	renderer = new THREE.CanvasRenderer();
	renderer.setClearColor( 0xffffff );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( 300 , 300 );
	container.appendChild( renderer.domElement );

	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

//

function onDocumentMouseDown( event ) {
	event.preventDefault();
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mouseout', onDocumentMouseOut, false );
	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDown = targetRotation;
}

function onDocumentMouseMove( event ) {
	mouseX = event.clientX - windowHalfX;
	targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
}

function onDocumentMouseUp( event ) {
	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentMouseOut( event ) {
	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentTouchStart( event ) {
	if ( event.touches.length === 1 ) {
		event.preventDefault();
		mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
		targetRotationOnMouseDown = targetRotation;
	}
}

function onDocumentTouchMove( event ) {
	if ( event.touches.length === 1 ) {
		event.preventDefault();
		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
	}
}

//

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	obj.rotation.y += ( targetRotation - obj.rotation.y ) * 0.05;
	renderer.render( scene, camera );

}