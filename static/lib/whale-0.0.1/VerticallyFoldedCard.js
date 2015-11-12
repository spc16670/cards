// ============================================================================
// ========================== VerticallyFoldedCard ==========================
// ============================================================================

/**
* THREE JS Canvas renderer does not support skinning. 
*/
WHALE.VerticallyFoldedCard = function (width,height,stretch) {
	
	//THREE.Geometry.call( this );
	WHALE.BaseGeometry.call( this );
	
	this.type = 'VerticallyFoldedCard';
	this.sides = 4;
	this.width = width || 200;
	this.height = height || 100;
	this.stretch = stretch || 100;
	
	var scope = this; // this in build() is different so we need a global var
	
	var width_half = this.width / 2;
	var height_full = this.height;
	var stretch_half = this.stretch / 2;
	
	this.sideLength = Math.sqrt( Math.pow(stretch_half,2) + Math.pow(this.height,2) );
	
	this.BUILD_STATE = { vertices : [] };
	
	build();
	
	function build() {
		
		scope.vertices = [
			/**
			* SIDE 1/2 VERTICES
			*/
			new THREE.Vector3(-width_half, 0, stretch_half) // front front left lower corner
			,new THREE.Vector3(width_half, 0, stretch_half) // front front right lower corner
			,new THREE.Vector3(width_half, height_full, 0) // front front right upper corner
			,new THREE.Vector3(-width_half, height_full, 0) // front front left upper corner
			
			,new THREE.Vector3(-width_half, 0, stretch_half) // front back left lower corner
			,new THREE.Vector3(width_half, 0, stretch_half) // front back right lower corner
			,new THREE.Vector3(width_half, height_full, 0)  // front back right upper corner
			,new THREE.Vector3(-width_half, height_full, 0) // front back left upper corner

			/**
			* SIDE 3/4 VERTICES
			*/
			,new THREE.Vector3(-width_half, 0, -stretch_half) // back front left lower corner
			,new THREE.Vector3(width_half, 0, -stretch_half) // back front right lower corner
			,new THREE.Vector3(width_half, height_full, 0) // back front right upper corner
			,new THREE.Vector3(-width_half, height_full, 0) // back front left upper corner	
			
			,new THREE.Vector3(-width_half, 0, -stretch_half) // back back left lower corner
			,new THREE.Vector3(width_half, 0, -stretch_half) // back back right lower corner
			,new THREE.Vector3(width_half, height_full, 0) // back back right upper corner
			,new THREE.Vector3(-width_half, height_full, 0) // back back left upper corner	
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
			
			// back front
			,new THREE.Face3( 8, 9, 10, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 2 )
			,new THREE.Face3( 8, 10, 11, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 2 )
			// back back
			,new THREE.Face3( 14, 13, 12, new THREE.Vector3(), new THREE.Color( 0x88dd00 ), 3 )
			,new THREE.Face3( 12, 15, 14, new THREE.Vector3(), new THREE.Color( 0x88dd00 ), 3 )
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

		] ;
		
		scope.computeFaceNormals();
		scope.computeVertexNormals();
		//scope.mergeVertices();
	}
};

WHALE.VerticallyFoldedCard.prototype = Object.create( WHALE.BaseGeometry.prototype );
WHALE.VerticallyFoldedCard.prototype.constructor = WHALE.VerticallyFoldedCard;

/**
* @Override super.print()
* Print to console
*/
WHALE.VerticallyFoldedCard.prototype.print = function () {
	console.log(this.type,this);
};

/**
* @Override super.getMaterialSize()
* Return material size
*/
WHALE.VerticallyFoldedCard.prototype.getMaterialSize = function () {
	return { x: this.width, y: this.sideLength }
};

/**
* @Override super.reset()
* Reset the position of vertices to their position as build time.
*/
WHALE.VerticallyFoldedCard.prototype.reset = function () {
	var i;
	for(i=0;i<this.BUILD_STATE.vertices.length;i++) {
		var originalVertex = this.BUILD_STATE.vertices[i].clone()
		this.vertices[i] = originalVertex;
	}
	this.verticesNeedUpdate = true;
}

/**
* @Override super.play()
* Play animation
*/
WHALE.VerticallyFoldedCard.prototype.play = function () {

}
