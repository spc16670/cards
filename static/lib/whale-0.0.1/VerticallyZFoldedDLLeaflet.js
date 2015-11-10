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
	
	this.leftZ = width * 0.75;
	this.rightZ = width * 1.5;
	
	this.cornerPush = function (push,leftPush) {
		var xPush = ((push > width) ? (width - (push - width)) : push);
		var b = Math.sqrt( Math.pow(width,2) - Math.pow(xPush,2) );
		if (leftPush) {
			var x = ( push > width ) ? (b + width_half) : ( b < width_half ) ? (b * -1) : ( b - width_half );
		} else {
			xPush = (xPush * -1);
			var x = ( push > width ) ? ((b + width_half) * -1) : ( b < width_half ) ? (width_half - b) : b;
		}
		//console.log((leftPush) ? "right" : "left",{ x : x, z: xPush, b : b, width_half : width_half })
		return { x : x, z: xPush };
	}
	
	this.BUILD_STATE = { vertices : [], rightZ : this.rightZ, leftZ : this.leftZ };
	
	build();
	
	function build() {
		
		var leftZ = width * 0.86;
		var leftPush = scope.cornerPush(leftZ,true);
		var rightZ = width * 0.86;
		var rightPush = scope.cornerPush(rightZ,true);
		
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
		/*
		scope.faceVertexUvs[ 0 ] = [
			,[ uvs[2], uvs[0], uvs[1] ]
			,[ uvs[1], uvs[3], uvs[2] ] 
			// side 1
			,[ uvs[0], uvs[1], uvs[3] ] 
			,[ uvs[3], uvs[2], uvs[0] ]
			
			// side 2
			[ uvs[0], uvs[1], uvs[3] ]
			,[ uvs[3], uvs[2], uvs[0] ]
			
			// side 3
			,[ uvs[2], uvs[0], uvs[1] ]
			,[ uvs[1], uvs[3], uvs[2] ]
		] ;
		*/
		scope.computeFaceNormals();
		scope.computeVertexNormals();
		//scope.mergeVertices();
		
	}
};

WHALE.VerticallyZFoldedDLLeaflet.prototype = Object.create( WHALE.BaseGeometry.prototype );
WHALE.VerticallyZFoldedDLLeaflet.prototype.constructor = WHALE.VerticallyZFoldedDLLeaflet;

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
	
}
