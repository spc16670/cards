// ============================================================================
// ========================== VerticallyFoldedCard ==========================
// ============================================================================

/**
*
*/
WHALE.VerticallyFoldedCard = function (width,height,stretch) {

	//THREE.Geometry.call( this );
	WHALE.BaseGeometry.call( this );
	
	this.type = 'VerticallyFoldedCard';
	this.sides = 4;
	this.width = width || 100;
	this.height = height || 250;
	this.stretch = stretch || 80;
	this.labelDisatnce = 100;
	
	var scope = this; // this in build() is different so we need a global var
	
	var width_half = this.width / 2;
	var height_full = this.height;
	var stretch_half = this.stretch / 2;

	this.rightZ = stretch_half;
	this.leftZ = stretch_half;
	
	this.cornerPush = function (push,leftPush) {
		var xPush = (push > width) ? (width - (push - width)) : push;
		var b = Math.sqrt( Math.pow(width,2) - Math.pow(xPush,2) );
		if (!leftPush) xPush = (xPush * -1);
		var x = ( push > width ) ? ((b + width_half) * -1) : ( b < width_half ) ? ((width_half - b) * -1) : ( b - width_half );
		return { x : x, z: xPush };
	}
	
	this.BUILD_STATE = { vertices : [], rightZ : this.rightZ, leftZ : this.leftZ };
	
	build();
	
	function build() {
		
		scope.vertices = [
			/**
			* SIDE 0/1 VERTICES
			*/
			new THREE.Vector3(-width_half, 0, 0)
			,new THREE.Vector3(width_half, 0, stretch_half)
			,new THREE.Vector3(width_half, height_full, stretch_half) 
			,new THREE.Vector3(-width_half, height_full, 0) 
			
			,new THREE.Vector3(-width_half, 0, 0)
			,new THREE.Vector3(width_half, 0, stretch_half)
			,new THREE.Vector3(width_half, height_full, stretch_half) 
			,new THREE.Vector3(-width_half, height_full, 0) 

			/**
			* SIDE 2/3 VERTICES
			*/
			,new THREE.Vector3(-width_half, 0, 0)
			,new THREE.Vector3(width_half, 0, -stretch_half)
			,new THREE.Vector3(width_half, height_full, -stretch_half) 
			,new THREE.Vector3(-width_half, height_full, 0) 
			
			,new THREE.Vector3(-width_half, 0, 0)
			,new THREE.Vector3(width_half, 0, -stretch_half)
			,new THREE.Vector3(width_half, height_full, -stretch_half) 
			,new THREE.Vector3(-width_half, height_full, 0) 

		];
		
		var i;
		for (i=0;i<scope.vertices.length;i++) {
			scope.BUILD_STATE.vertices.push(scope.vertices[i].clone());
		}
		
		scope.faces = [

			new THREE.Face3( 0, 1, 2, new THREE.Vector3(), new THREE.Color( 0xffaa00 ), 0 )
			,new THREE.Face3( 2, 3, 0, new THREE.Vector3(), new THREE.Color( 0xffaa00 ), 0 )

			,new THREE.Face3( 6, 5, 4, new THREE.Vector3(), new THREE.Color( 0x11bb00 ), 1 )
			,new THREE.Face3( 4, 7, 6, new THREE.Vector3(), new THREE.Color( 0x11bb00 ), 1 )
			
			,new THREE.Face3( 8, 9, 10, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 2 )
			,new THREE.Face3( 10, 11, 8, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 2 )

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
			// side 0
			[ uvs[0], uvs[1], uvs[3] ]
			,[ uvs[3], uvs[2], uvs[0] ]
			// side 1
			,[ uvs[2], uvs[0], uvs[1] ]
			,[ uvs[1], uvs[3], uvs[2] ]
			// side 2
			,[ uvs[0], uvs[1], uvs[3] ] 
			,[ uvs[3], uvs[2], uvs[0] ] 
			// side 3
			,[ uvs[2], uvs[0], uvs[1] ] 
			,[ uvs[1], uvs[3], uvs[2] ]
		] ;
		
		scope.computeFaceNormals();
		scope.computeVertexNormals();
		//scope.mergeVertices();
	}
};

WHALE.VerticallyFoldedCard.prototype = Object.create( WHALE.BaseGeometry.prototype );
WHALE.VerticallyFoldedCard.prototype.constructor = WHALE.VerticallyFoldedCard;


/**
*
*/
WHALE.VerticallyFoldedCard.prototype.getSideLabelVertex = function(side) {
	var halfHeight = (this.height /2);
	var halfWidth = (this.width /2);
	switch (side) {
		case 0: return new THREE.Vector3(-this.width, halfHeight, (this.labelDisatnce * -1));
		case 1: return new THREE.Vector3(-this.width, halfHeight, this.labelDisatnce);
		case 2: return new THREE.Vector3(0, halfHeight, this.labelDisatnce);
		case 3: return new THREE.Vector3(0, halfHeight, (this.labelDisatnce * -1));
		default: return null
	}
}

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
	return { x: this.width, y: this.height }
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
	this.rightZ = this.BUILD_STATE.rightZ;
	this.leftZ = this.BUILD_STATE.leftZ;
	this.verticesNeedUpdate = true;
}

/**
* @Override super.play()
* Play animation
*/
WHALE.VerticallyFoldedCard.prototype.play = function () {
	
	if (this.leftZ < 180) {
		var leftPush = this.cornerPush(this.leftZ,true);
		
		this.vertices[1].x = leftPush.x;
		this.vertices[1].z = leftPush.z;
		this.vertices[2].x = leftPush.x;
		this.vertices[2].z = leftPush.z;
		
		this.vertices[5].x = leftPush.x;
		this.vertices[5].z = leftPush.z;
		this.vertices[6].x = leftPush.x;
		this.vertices[6].z = leftPush.z;
		
		this.leftZ = this.leftZ + 2;
	}
	
	if (this.rightZ > 0) {
		var rightPush = this.cornerPush(this.rightZ,false);
		
		this.vertices[9].x = rightPush.x;
		this.vertices[9].z = rightPush.z;
		this.vertices[10].x = rightPush.x;
		this.vertices[10].z = rightPush.z;
		
		this.vertices[13].x = rightPush.x;
		this.vertices[13].z = rightPush.z;
		this.vertices[14].x = rightPush.x;
		this.vertices[14].z = rightPush.z;
		
		this.rightZ = this.rightZ - 2;
	}
	
	this.verticesNeedUpdate = true;
	this.elementsNeedUpdate = true;
	this.morphTargetsNeedUpdate = true;
	this.uvsNeedUpdate = true;
	this.normalsNeedUpdate = true;
	this.colorsNeedUpdate = true;
	this.tangentsNeedUpdate = true;
}
