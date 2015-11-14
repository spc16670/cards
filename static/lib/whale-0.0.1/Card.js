// ============================================================================
// ================================= Card =====================================
// ============================================================================

/**
* THREE JS Canvas renderer does not support skinning. 
*/
WHALE.Card = function (width,height) {

	WHALE.BaseGeometry.call( this );
	
	this.type = 'Card';
	this.sides = 2;
	this.width = width || 200;
	this.height = height || 100;
	this.labelDisatnce = 100;
	
	var scope = this; // this in build() is different so we need a global var
	
	var width_half = this.width / 2;
	var height_full = this.height;
	
	this.BUILD_STATE = { vertices : [] };
	
	build();
	
	function build() {
		
		/**
		* VERTICES
		*/
		scope.vertices = [
			new THREE.Vector3(-width_half, 0, 0) // front left lower corner
			,new THREE.Vector3(width_half, 0, 0) // front right lower corner
			,new THREE.Vector3(width_half, height_full, 0)  // front right upper corner
			,new THREE.Vector3(-width_half, height_full, 0) // front left upper corner
		
			,new THREE.Vector3(-width_half, 0, 0) // back left lower corner
			,new THREE.Vector3(width_half, 0, 0) // back right lower corner
			,new THREE.Vector3(width_half, height_full, 0)  // back right upper corner
			,new THREE.Vector3(-width_half, height_full, 0) // back left upper corner
		];
		
		var i;
		for (i=0;i<scope.vertices.length;i++) {
			scope.BUILD_STATE.vertices.push(scope.vertices[i].clone());
		}
		
		scope.faces = [
			// front front
			new THREE.Face3( 0, 1, 2, new THREE.Vector3(), new THREE.Color( 0xffaa00 ), 0 )
			,new THREE.Face3( 0, 2, 3, new THREE.Vector3(), new THREE.Color( 0xffaa00 ), 0 )
			// front back
			,new THREE.Face3( 6, 5, 4, new THREE.Vector3(), new THREE.Color( 0x11bb00 ), 1 )
			,new THREE.Face3( 7, 6, 4, new THREE.Vector3(), new THREE.Color( 0x11bb00 ), 1 )
		]

		/**
		* 01 11
		* 00 10
		*/
		var uvs = [];
		uvs.push( new THREE.Vector2( 0.0, 0.0 ) );
		uvs.push( new THREE.Vector2( 1.0, 0.0 ) );
		uvs.push( new THREE.Vector2( 0.0, 1.0 ) );
		uvs.push( new THREE.Vector2( 1.0, 1.0 ) );
	
		scope.faceVertexUvs[ 0 ] = [
			// front front side
			[ uvs[0], uvs[1], uvs[3] ]
			,[ uvs[0], uvs[3], uvs[2] ]
			// front back side
			,[ uvs[2], uvs[0], uvs[1] ]
			,[ uvs[3], uvs[2], uvs[1] ]
		] ;
		
		scope.computeFaceNormals();
		scope.computeVertexNormals();
		
		
	}
	
};

WHALE.Card.prototype = Object.create( WHALE.BaseGeometry.prototype );
WHALE.Card.prototype.constructor = WHALE.Card;

/**
*/
WHALE.Card.prototype.getSideLabelVertex = function(side) {
	var halfHeight = (this.height /2);
	switch (side) {
		case 0: return new THREE.Vector3(0, halfHeight, this.labelDisatnce);
		case 1: return new THREE.Vector3(0, halfHeight, (this.labelDisatnce * -1));
		default: return null
	}
}

/**
* @Override super.print()
* Print to console
*/
WHALE.Card.prototype.print = function () {
	console.log(this.type,this);
};

/**
* @Override super.getMaterialSize()
* Return material size
*/
WHALE.Card.prototype.getMaterialSize = function () {
	return { x: this.width, y: this.height }
};

/**
* @Override super.reset()
* Reset the position of vertices to their position as build time.
*/
WHALE.Card.prototype.reset = function () {
	
}

/**
* @Override super.play()
* Play animation
*/
WHALE.Card.prototype.play = function () {

}
