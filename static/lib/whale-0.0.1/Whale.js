/**
 * @author coolfeature
 */

var WHALE = WHALE || { REVISION: '1' };

//

if ( typeof define === 'function' && define.amd ) {
	define( 'whale', WHALE );
} else if ( 'undefined' !== typeof exports && 'undefined' !== typeof module ) {
	module.exports = WHALE;
}

WHALE.HorizontallyFoldedCard = function (width,height,stretch) {
	
	THREE.Geometry.call( this );
	
	this.type = 'HorizontallyFoldedCard';
	this.sides = 4;
	this.width = width || 200;
	this.height = height || 100;
	this.stretch = stretch || 100;

	this.getMaterialSize = function (material) {
		return { x: width, y: height }
	};
	
	var scope = this; // this in build() is different so we need a global var
	
	var width_half = this.width / 2;
	var height_full = this.height;
	var stretch_half = this.stretch / 2;
	
	build();
	
	function build() {
		
		var getColour = function () {
			return Math.random() * 0xffffff;
		}

		// https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/BoxGeometry.js
		// http://threejs.org/docs/#Reference/Core/Face3
		
		// https://github.com/mrdoob/three.js/issues/1741
		// http://stackoverflow.com/questions/17293290/three-js-geometry-facevertexuvs00index-is-not-the-same-as-geometry-verti
		
		// http://stackoverflow.com/questions/21462851/flip-normals-in-three-js-on-sphere
		// http://paulyg.f2s.com/uv.htm
		
		// Card Front FrontSide
		scope.vertices = [
			new THREE.Vector3(-width_half, 0, stretch_half) // front left lower corner
			,new THREE.Vector3(width_half, 0, stretch_half) // front right lower corner
			,new THREE.Vector3(width_half, height_full, 0)  // front right upper corner
			,new THREE.Vector3(-width_half, height_full, 0) // front left upper corner
			
			,new THREE.Vector3(-width_half, 0, -stretch_half) // back left lower corner
			,new THREE.Vector3(width_half, 0, -stretch_half) // back right lower corner
			,new THREE.Vector3(width_half, height_full, 0)  // back right upper corner
			,new THREE.Vector3(-width_half, height_full, 0) // back left upper corner	
		];
		
		scope.faces = [
			// front front
			new THREE.Face3( 0, 1, 2, new THREE.Vector3(), new THREE.Color( 0xffaa00 ), 0 )
			,new THREE.Face3( 0, 2, 3, new THREE.Vector3(), new THREE.Color( 0xffaa00 ), 0 )
			// front back
			,new THREE.Face3( 2, 1, 0, new THREE.Vector3(), new THREE.Color( 0x11bb00 ), 1 )
			,new THREE.Face3( 3, 2, 0, new THREE.Vector3(), new THREE.Color( 0x11bb00 ), 1 )
			
			// back front
			,new THREE.Face3( 4, 5, 6, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 2 )
			,new THREE.Face3( 4, 6, 7, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 2 )
			// back back
			,new THREE.Face3( 6, 5, 4, new THREE.Vector3(), new THREE.Color( 0x88dd00 ), 3 )
			,new THREE.Face3( 7, 6, 4, new THREE.Vector3(), new THREE.Color( 0x88dd00 ), 3 )
		]

		//The UV mapping for one of the faces looks like this: (0,1),(0,0),(1,0),(1,1).
		scope.faceVertexUvs[ 0 ] = [
			// front front side
			[ new THREE.Vector2( 0, 0),new THREE.Vector2( 1, 0 ),new THREE.Vector2( 1, 1 ) ]
			,[ new THREE.Vector2( 0, 0),new THREE.Vector2( 1, 1 ),new THREE.Vector2( 0, 1 ) ]
			// front back side
			,[ new THREE.Vector2( 1, 1),new THREE.Vector2( 1, 0 ),new THREE.Vector2( 0, 0 ) ]
			,[ new THREE.Vector2( 0, 1),new THREE.Vector2( 1, 1 ),new THREE.Vector2( 0, 0 ) ]
			// back front side
			,[ new THREE.Vector2( 0, 0),new THREE.Vector2( 1, 0 ),new THREE.Vector2( 1, 1 ) ]
			,[ new THREE.Vector2( 0, 0),new THREE.Vector2( 1, 1 ),new THREE.Vector2( 0, 1 ) ]
			// back back side
			,[ new THREE.Vector2( 1, 1),new THREE.Vector2( 1, 0 ),new THREE.Vector2( 0, 0 ) ]
			,[ new THREE.Vector2( 0, 1),new THREE.Vector2( 1, 1 ),new THREE.Vector2( 0, 0 ) ]
			
		] ;
		
		scope.computeFaceNormals();
		scope.computeVertexNormals();
		scope.mergeVertices();
		
		//console.log("JSON GEOMETRY:",scope.toJSON());
	}

};

WHALE.HorizontallyFoldedCard.prototype = Object.create( THREE.Geometry.prototype );
WHALE.HorizontallyFoldedCard.prototype.constructor = WHALE.HorizontallyFoldedCard;

