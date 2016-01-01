// ============================================================================
// ======================== VerticallyCFoldedDLLeaflet ========================
// ============================================================================

/**
* Counting sides from 0 to 5. VerticallyCFoldedDLLeaflet has 6 visible sides. The 
* leaflet opens up to the left and unveils side 1 (first side back side) and 
* side 2 which unfolds to the right revealing the side 3 (third side back side) 
* and  side 4. Side 5 is on the reverse of side 4 .
*     5
*   _____
*  |  4  |
* 0|1   3|2
*  |     |
* 
*/

WHALE.VerticallyCFoldedDLLeaflet = function (width,height) {

	WHALE.BaseGeometry.call( this );
	
	this.type = 'VerticallyCFoldedDLLeaflet';
	this.sides = 6;
	this.width = width || 100;
	this.height = height || 210;
	this.labelDisatnce = 100;
	var scope = this; // this in build() is different so we need a global var
	
	var width_half = width / 2;
	var height_full = height;
	
	this.rightZ = width * 0.99;
	this.leftZ = width * 0.75;
	
	this.cornerPush = function (push,leftPush) {
		var xPush = ((push > width) ? (width - (push - width)) : push);
		var b = Math.sqrt( Math.pow(width,2) - Math.pow(xPush,2) );
		if (leftPush) {
			var x = ( push > width ) ? (b + width_half) : ( b < width_half ) ? (width_half - b) : (( b - width_half ) *  -1);
		} else {
			var x = ( push > width ) ? ((b + width_half) * -1) : ( b < width_half ) ? ((width_half - b) * -1) : (b - width_half);
		}
		//console.log((leftPush) ? "right" : "left",{ x : x, z: xPush, b : b, width_half : width_half })
		return { x : x, z: xPush };
	}
	
	this.BUILD_STATE = { vertices : [], rightZ : this.rightZ, leftZ : this.leftZ };
	
	build();
	
	function build() {
		
		var leftZ = width * 0.75;
		var leftPush = scope.cornerPush(leftZ,true);
		var rightZ = width * 0.99;
		var rightPush = scope.cornerPush(rightZ,false);

		scope.vertices = [
			/**
			* SIDE 4/5 VERTICES
			*/
			new THREE.Vector3(-width_half, 0, 0) 
			,new THREE.Vector3(width_half, 0, 0)
			,new THREE.Vector3(width_half, height_full, 0)
			,new THREE.Vector3(-width_half, height_full, 0) 
			
			,new THREE.Vector3(-width_half, 0, 0)
			,new THREE.Vector3(width_half, 0, 0)
			,new THREE.Vector3(width_half, height_full, 0)
			,new THREE.Vector3(-width_half, height_full, 0)

			/**
			* SIDE 2/3 VERTICES
			*/
			,new THREE.Vector3(leftPush.x, 0, leftPush.z)
			,new THREE.Vector3(width_half, 0, 0)
			,new THREE.Vector3(width_half, height_full, 0)
			,new THREE.Vector3(leftPush.x, height_full, leftPush.z)
			
			,new THREE.Vector3(leftPush.x, 0, leftPush.z)
			,new THREE.Vector3(width_half, 0, 0)
			,new THREE.Vector3(width_half, height_full, 0)
			,new THREE.Vector3(leftPush.x, height_full, leftPush.z)
			
			/**
			* SIDE 0/1 VERTICES
			*/
			,new THREE.Vector3(rightPush.x, 0, rightPush.z)
			,new THREE.Vector3(-width_half, 0, 0)
			,new THREE.Vector3(-width_half, height_full, 0)
			,new THREE.Vector3(rightPush.x, height_full, rightPush.z)
			
			,new THREE.Vector3(rightPush.x, 0, rightPush.z)
			,new THREE.Vector3(-width_half, 0, 0)
			,new THREE.Vector3(-width_half, height_full, 0)
			,new THREE.Vector3(rightPush.x, height_full, rightPush.z)
		];
		
		var i;
		for (i=0;i<scope.vertices.length;i++) {
			scope.BUILD_STATE.vertices.push(scope.vertices[i].clone());
		}
		
		/**
		* The order of vertices matters when plotting the faces. The order
		* should follow the L letter. When starting from the bottom end 
		* the camera facing Face is defined. When starting from top, the
		* face is rendered from behind.
		*/
		scope.faces = [
			// side 4
			new THREE.Face3( 0, 1, 2, new THREE.Vector3(), new THREE.Color( 0xffaa00 ), 4 )
			,new THREE.Face3( 2, 3, 0, new THREE.Vector3(), new THREE.Color( 0xffaa00 ), 4 )
			// side 5
			,new THREE.Face3( 6, 5, 4, new THREE.Vector3(), new THREE.Color( 0x11bb00 ), 5 )
			,new THREE.Face3( 4, 7, 6, new THREE.Vector3(), new THREE.Color( 0x11bb00 ), 5 )
			
			// side 2
			,new THREE.Face3( 8, 9, 10, new THREE.Vector3(), new THREE.Color( 0x88dd00 ), 2 )
			,new THREE.Face3( 10, 11, 8, new THREE.Vector3(), new THREE.Color( 0x88dd00 ), 2 )
			// side 3
			,new THREE.Face3( 14, 13, 12, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 3 )
			,new THREE.Face3( 12, 15, 14, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 3 )
			
			// side 0
			,new THREE.Face3( 18, 17, 16, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 0 )
			,new THREE.Face3( 16, 19, 18, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 0 )
			// side 1
			,new THREE.Face3( 20, 21, 22, new THREE.Vector3(), new THREE.Color( 0x88dd00 ), 1 )
			,new THREE.Face3( 22, 23, 20, new THREE.Vector3(), new THREE.Color( 0x88dd00 ), 1 )
		]

		/**
		* 01 11
		* 00 10
		*/
		var uvs = [
			new THREE.Vector2( 0.0, 0.0 ) 
			,new THREE.Vector2( 1.0, 0.0 ) 
			,new THREE.Vector2( 0.0, 1.0 )
			,new THREE.Vector2( 1.0, 1.0 )
		];
		
		scope.faceVertexUvs[ 0 ] = [
			// side 4
			[ uvs[0], uvs[1], uvs[3] ]
			,[ uvs[3], uvs[2], uvs[0] ]
			// side 5
			,[ uvs[2], uvs[0], uvs[1] ]
			,[ uvs[1], uvs[3], uvs[2] ]
			// side 2
			,[ uvs[0], uvs[1], uvs[3] ] 
			,[ uvs[3], uvs[2], uvs[0] ] 
			// side 3
			,[ uvs[2], uvs[0], uvs[1] ] 
			,[ uvs[1], uvs[3], uvs[2] ]
			// side 0
			,[ uvs[2], uvs[0], uvs[1] ] //18, 17, 16
			,[ uvs[1], uvs[3], uvs[2] ] //16, 19, 18
			// side 1
			,[ uvs[0], uvs[1], uvs[3] ]  //20, 21, 22,
			,[ uvs[3], uvs[2], uvs[0] ]  // 22, 23, 20
		] ;
		
		scope.computeFaceNormals();
		scope.computeVertexNormals();
		//scope.mergeVertices();
		
	}
};

WHALE.VerticallyCFoldedDLLeaflet.prototype = Object.create( WHALE.BaseGeometry.prototype );
WHALE.VerticallyCFoldedDLLeaflet.prototype.constructor = WHALE.VerticallyCFoldedDLLeaflet;

/**
*     5
*   _____
*  |  4  |
* 0|1   3|2
*  |     |
* 
*/
WHALE.VerticallyCFoldedDLLeaflet.prototype.getSideLabelVertex = function(side) {
	var halfHeight = (this.height /2);
	switch (side) {
		case 0: return new THREE.Vector3(-this.width, halfHeight, (this.labelDisatnce * -1));
		case 1: return new THREE.Vector3(-this.width, halfHeight, this.labelDisatnce);
		case 2: return new THREE.Vector3(this.width, halfHeight, (this.labelDisatnce * -1));
		case 3: return new THREE.Vector3(this.width, halfHeight, this.labelDisatnce);
		case 4: return new THREE.Vector3(0, halfHeight, this.labelDisatnce); 
		case 5: return new THREE.Vector3(0, halfHeight, (this.labelDisatnce * -1));
		default: return null
	}
}

/**
* @Override super.print()
* Print to console
*/
WHALE.VerticallyCFoldedDLLeaflet.prototype.print = function () {
	console.log(this.type,this);
};

/**
* @Override super.getMaterialSize()
* Return material size
*/
WHALE.VerticallyCFoldedDLLeaflet.prototype.getMaterialSize = function () {
	return { x: this.width, y: this.height }
};

/**
* @Override super.reset()
* Reset the position of vertices to their position as build time.
*/
WHALE.VerticallyCFoldedDLLeaflet.prototype.reset = function () {
	
	var i;
	for(i=0;i<this.BUILD_STATE.vertices.length;i++) {
		var originalVertex = this.BUILD_STATE.vertices[i].clone()
		this.vertices[i] = originalVertex;
	}
	this.rightZ = this.BUILD_STATE.rightZ;
	this.leftZ = this.BUILD_STATE.leftZ;
	this.verticesNeedUpdate = true;
	this.normalsNeedUpdate = true;
}

/**
* Calculate speed as used by the animation functions
*/
WHALE.VerticallyCFoldedDLLeaflet.prototype.speed = function(maxStep,y,maxY) {

}

/**
* y goes from 0 to ((this.height + this.sideLength) - 10)
* z goes from 45 to this.sideLength and back to 45
* NOTE: isNaN() check is needed to unless speed is odd
*/
WHALE.VerticallyCFoldedDLLeaflet.prototype.animateRightSide = function (index) {

}

/**
* z goes from -45 to 45
* y goes from 0 to -8 and again to 0 
* NOTE: when z rem 2 != 0 then goes haywire
*/
WHALE.VerticallyCFoldedDLLeaflet.prototype.animateLeftSide = function (index) {

}

/**
* @Override super.play()
* Play animation
*/
WHALE.VerticallyCFoldedDLLeaflet.prototype.play = function () {
	
	if (this.rightZ < 170) {
		var leftPush = this.cornerPush(this.leftZ,true);
		var rightPush = this.cornerPush(this.rightZ,false);
		
		this.vertices[8].x = leftPush.x;
		this.vertices[8].z = leftPush.z;
		this.vertices[11].x = leftPush.x;
		this.vertices[11].z = leftPush.z;
		
		this.vertices[12].x = leftPush.x;
		this.vertices[12].z = leftPush.z;
		this.vertices[15].x = leftPush.x;
		this.vertices[15].z = leftPush.z;
		
		this.vertices[16].x = rightPush.x;
		this.vertices[16].z = rightPush.z;
		this.vertices[19].x = rightPush.x;
		this.vertices[19].z = rightPush.z;
		
		this.vertices[20].x = rightPush.x;
		this.vertices[20].z = rightPush.z;
		this.vertices[23].x = rightPush.x;
		this.vertices[23].z = rightPush.z;
		
		this.rightZ = this.rightZ + 2;
		this.leftZ = this.leftZ + 2;
	}
	this.verticesNeedUpdate = true;
	this.elementsNeedUpdate = true;
	this.morphTargetsNeedUpdate = true;
	this.uvsNeedUpdate = true;
	this.normalsNeedUpdate = true;
	this.colorsNeedUpdate = true;
	this.tangentsNeedUpdate = true;
}
