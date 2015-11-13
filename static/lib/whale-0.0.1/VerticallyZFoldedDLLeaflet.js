// ============================================================================
// ======================== VerticallyZFoldedDLLeaflet ========================
// ============================================================================

/**
* Counting sides from 0 to 5. VerticallyZFoldedDLLeaflet has 6 visible sides. 
* The leaflet opens up to the left and unveils side 1 (first side back side). 
* The back of side 1 i.e. side 2 is only visible once leaflet is turned and 
* opened again.
        /| 4/
     0 /2|3/5
      /1 |/
*/

WHALE.VerticallyZFoldedDLLeaflet = function (width,height) {

	WHALE.BaseGeometry.call( this );
	
	this.type = 'VerticallyZFoldedDLLeaflet';
	this.sides = 6;
	this.width = width || 100;
	this.height = height || 210;

	var scope = this; // this in build() is different so we need a global var
	
	var width_half = width / 2;
	var height_full = height;
	var sidePush = 0.6;
	this.leftZ = width * sidePush;
	this.rightZ = width * sidePush;
	
	this.cornerPush = function (push,leftPush) {
		var xPush = ((push > width) ? (width - (push - width)) : push);
		var b = Math.sqrt( Math.pow(width,2) - Math.pow(xPush,2) );
		if (leftPush) {
			var x = ( push > width ) ? ((b + width_half) * -1) : ( b < width_half ) ? ((width_half - b) * -1) : ( b - width_half );
		} else {
			xPush = (xPush * -1);
			var x = ( push > width ) ? (b + width_half) : ( b < width_half ) ? (width_half - b) : ((b - width_half) * -1);
		}
		//console.log((leftPush) ? "right" : "left",{ x : x, z: xPush, b : b, width_half : width_half })
		return { x : x, z: xPush };
	}
	
	this.BUILD_STATE = { vertices : [], rightZ : this.rightZ, leftZ : this.leftZ };
	
	build();
	
	function build() {
		
		var leftZ = width * sidePush;
		var leftPush = scope.cornerPush(leftZ,true);
		var rightZ = width * sidePush;
		var rightPush = scope.cornerPush(rightZ,false);
		
		scope.vertices = [

			/**
			* SIDE 0/1 VERTICES
			*/
			new THREE.Vector3(-width_half, 0, 0)
			,new THREE.Vector3(leftPush.x, 0, leftPush.z)
			,new THREE.Vector3(leftPush.x, height_full, leftPush.z)	
			,new THREE.Vector3(-width_half, height_full, 0)
			
			,new THREE.Vector3(-width_half, 0, 0)
			,new THREE.Vector3(leftPush.x, 0, leftPush.z)
			,new THREE.Vector3(leftPush.x, height_full, leftPush.z)	
			,new THREE.Vector3(-width_half, height_full, 0)
			
			/**
			* SIDE 2/3 VERTICES
			*/
			,new THREE.Vector3(-width_half, 0, 0)  
			,new THREE.Vector3(width_half, 0, 0)
			,new THREE.Vector3(width_half, height_full, 0)
			,new THREE.Vector3(-width_half, height_full, 0) 
			
			,new THREE.Vector3(-width_half, 0, 0) 
			,new THREE.Vector3(width_half, 0, 0)
			,new THREE.Vector3(width_half, height_full, 0) 
			,new THREE.Vector3(-width_half, height_full, 0)
			
			/**
			* SIDE 4/5 VERTICES
			*/
			,new THREE.Vector3(width_half, 0, 0)
			,new THREE.Vector3(rightPush.x, 0, rightPush.z)
			,new THREE.Vector3(rightPush.x, height_full, rightPush.z)	
			,new THREE.Vector3(width_half, height_full, 0)
			
			,new THREE.Vector3(width_half, 0, 0)
			,new THREE.Vector3(rightPush.x, 0, rightPush.z)
			,new THREE.Vector3(rightPush.x, height_full, rightPush.z)	
			,new THREE.Vector3(width_half, height_full, 0)
			
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
			// side 0
			new THREE.Face3( 0, 1, 2, new THREE.Vector3(), new THREE.Color( 0xffaa00 ), 0 )
			,new THREE.Face3( 2, 3, 0, new THREE.Vector3(), new THREE.Color( 0xffaa00 ), 0 )
			// side 1
			,new THREE.Face3( 6, 5, 4, new THREE.Vector3(), new THREE.Color( 0x11bb00 ), 1 )
			,new THREE.Face3( 4, 7, 6, new THREE.Vector3(), new THREE.Color( 0x11bb00 ), 1 )

			// side 2
			,new THREE.Face3( 8, 9, 10, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 2 )
			,new THREE.Face3( 10, 11, 8, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 2 )
			// side 3
			,new THREE.Face3( 14, 13, 12, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 3 )
			,new THREE.Face3( 12, 15, 14, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 3 )
			
			// side 4
			,new THREE.Face3( 16, 17, 18, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 4 )
			,new THREE.Face3( 18, 19, 16, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 4 )
			// side 5
			,new THREE.Face3( 22, 21, 20, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 5 )
			,new THREE.Face3( 20, 23, 22, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 5 )
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
			// side 0
			[ uvs[0], uvs[1], uvs[3] ] // 0, 1, 2,
			,[ uvs[3], uvs[2], uvs[0] ] // 2, 3, 0,
			
			// side 1
			,[ uvs[2], uvs[0], uvs[1] ] // 6, 5, 4,
			,[ uvs[1], uvs[3], uvs[2] ] // 4, 7, 6, 
			
			// side 2
			,[ uvs[0], uvs[1], uvs[3] ] // 8, 9, 10,
			,[ uvs[3], uvs[2], uvs[0] ]  // 10, 11, 8,
			
			// side 3
			,[ uvs[2], uvs[0], uvs[1] ]  // 14, 13, 12,
			,[ uvs[1], uvs[3], uvs[2] ]  // 12, 15, 14,
			
			// side 4
			,[ uvs[0], uvs[1], uvs[3] ]  // 16, 17, 18,
			,[ uvs[3], uvs[2], uvs[0] ]  //  18, 19, 16,
			
			// side 5
			,[ uvs[2], uvs[0], uvs[1] ]  // 22, 21, 20,
			,[ uvs[1], uvs[3], uvs[2] ]  // 20, 23, 22,
			
			
		] ;
		
		scope.computeFaceNormals();
		scope.computeVertexNormals();
		//scope.mergeVertices();
		
	}
};

WHALE.VerticallyZFoldedDLLeaflet.prototype = Object.create( WHALE.BaseGeometry.prototype );
WHALE.VerticallyZFoldedDLLeaflet.prototype.constructor = WHALE.VerticallyZFoldedDLLeaflet;

WHALE.VerticallyZFoldedDLLeaflet.prototype.getSideLabelVertex = function(side) {
	switch (side) {
		case 0: return this.vertices[2];
		case 1: return this.vertices[7];
		case 2: return this.vertices[10];
		case 3: return this.vertices[15];
		case 4: return this.vertices[18];
		case 5: return this.vertices[23];
		default: return null
	}
}


/**
* @Override super.print()
* Print to console
*/
WHALE.VerticallyZFoldedDLLeaflet.prototype.print = function () {
	console.log(this.type,this);
};

/**
* @Override super.getMaterialSize()
* Return material size
*/
WHALE.VerticallyZFoldedDLLeaflet.prototype.getMaterialSize = function () {
	return { x: this.width, y: this.height }
};

/**
* @Override super.reset()
* Reset the position of vertices to their position as build time.
*/
WHALE.VerticallyZFoldedDLLeaflet.prototype.reset = function () {
	var i;
	for(i=0;i<this.BUILD_STATE.vertices.length;i++) {
		var originalVertex = this.BUILD_STATE.vertices[i].clone()
		this.vertices[i] = originalVertex;
	}
	this.verticesNeedUpdate = true;
	this.rightZ = this.BUILD_STATE.rightZ;
	this.leftZ = this.BUILD_STATE.leftZ;
}

/**
* @Override super.play()
* Play animation
*/
WHALE.VerticallyZFoldedDLLeaflet.prototype.play = function () {
	if (this.rightZ < ((2 * this.width) - 10)) {
		var leftPush = this.cornerPush(this.leftZ,true);
		var rightPush = this.cornerPush(this.rightZ,false);
		
		this.vertices[1].x = leftPush.x;
		this.vertices[1].z = leftPush.z;
		this.vertices[2].x = leftPush.x;
		this.vertices[2].z = leftPush.z;
		
		this.vertices[5].x = leftPush.x;
		this.vertices[5].z = leftPush.z;
		this.vertices[6].x = leftPush.x;
		this.vertices[6].z = leftPush.z;
		
		this.vertices[17].x = rightPush.x;
		this.vertices[17].z = rightPush.z;
		this.vertices[18].x = rightPush.x;
		this.vertices[18].z = rightPush.z;
		
		this.vertices[21].x = rightPush.x;
		this.vertices[21].z = rightPush.z;
		this.vertices[22].x = rightPush.x;
		this.vertices[22].z = rightPush.z;
		
		this.rightZ = this.rightZ + 2;
		this.leftZ = this.leftZ + 2;
	}
}
