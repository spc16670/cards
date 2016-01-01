// ============================================================================
// ========================== HorizontallyFoldedCard ==========================
// ============================================================================

/**
* THREE JS Canvas renderer does not support skinning. 
*/
WHALE.HorizontallyFoldedCard = function (width,height,stretch) {
	
	//THREE.Geometry.call( this );
	WHALE.BaseGeometry.call( this );
	
	this.type = 'HorizontallyFoldedCard';
	this.sides = 4;
	this.width = width || 200;
	this.height = height || 100;
	this.stretch = stretch || 100;
	this.labelDisatnce = 100;
	
	var scope = this; // this in build() is different so we need a global var
	
	var width_half = this.width / 2;
	var height_full = this.height;
	var stretch_half = this.stretch / 2;
	
	this.sideLength = Math.sqrt( Math.pow(stretch_half,2) + Math.pow(this.height,2) );
	
	this.BUILD_STATE = { vertices : [] };
	
	build();
	
	function build() {

		// https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/BoxGeometry.js
		// http://threejs.org/docs/#Reference/Core/Face3
		
		// https://github.com/mrdoob/three.js/issues/1741
		// http://stackoverflow.com/questions/17293290/three-js-geometry-facevertexuvs00index-is-not-the-same-as-geometry-verti
		
		// http://stackoverflow.com/questions/21462851/flip-normals-in-three-js-on-sphere
		// http://paulyg.f2s.com/uv.htm
		
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
			// front front side
			[ uvs[0], uvs[1], uvs[3] ]
			,[ uvs[0], uvs[3], uvs[2] ]
			// front back side
			,[ uvs[1], uvs[3], uvs[2] ]
			,[ uvs[0], uvs[1], uvs[2] ]
			// back front side
			,[ uvs[0], uvs[1], uvs[3] ]
			,[ uvs[0], uvs[3], uvs[2] ]
			// back back side
			,[ uvs[2], uvs[0], uvs[1] ]
			,[ uvs[1], uvs[3], uvs[2] ]
		] ;
		
		scope.computeFaceNormals();
		scope.computeVertexNormals();
		//scope.mergeVertices();
	}
};

WHALE.HorizontallyFoldedCard.prototype = Object.create( WHALE.BaseGeometry.prototype );
WHALE.HorizontallyFoldedCard.prototype.constructor = WHALE.HorizontallyFoldedCard;

/**
* @Override super.print()
* Print to console
*/
WHALE.HorizontallyFoldedCard.prototype.print = function () {
	console.log(this.type,this);
};

/**
* @Override super.getMaterialSize()
* Return material size
*/
WHALE.HorizontallyFoldedCard.prototype.getMaterialSize = function () {
	return { x: this.width, y: this.sideLength }
};

/**
* @Override super.reset()
* Reset the position of vertices to their position as build time.
*/
WHALE.HorizontallyFoldedCard.prototype.reset = function () {
	var i;
	for(i=0;i<this.BUILD_STATE.vertices.length;i++) {
		var originalVertex = this.BUILD_STATE.vertices[i].clone()
		this.vertices[i] = originalVertex;
	}
	this.verticesNeedUpdate = true;
}

/**
*     /\
*  0 /12\3
*   /    \
*/
WHALE.HorizontallyFoldedCard.prototype.getSideLabelVertex = function(side) {
	var halfHeight = (this.height /2);
	switch (side) {
		case 0: return new THREE.Vector3(0, (this.height + halfHeight), (this.labelDisatnce * -1));
		case 1: return new THREE.Vector3(0, (this.height + halfHeight), this.labelDisatnce);
		case 2: return new THREE.Vector3(0, halfHeight, this.labelDisatnce);
		case 3: return new THREE.Vector3(0, halfHeight, (this.labelDisatnce * -1));
		default: return null
	}
}

/**
* Calculate vertex position using the circle equation
*/
WHALE.HorizontallyFoldedCard.prototype.circleEquation = function(val,negative) {
	// y = +/- (r^2 - (x-h)^2)^1/2 + k -- eg: y = -(128^2 - 46^2)^1/2 + 120
	return ( Math.sqrt( Math.pow( this.sideLength, 2 ) - Math.pow(val, 2) ) * ((negative) ? -1 : 1)) + this.height
} 

/**
* Calculate speed as used by the animation functions
*/
WHALE.HorizontallyFoldedCard.prototype.speed = function(maxStep,y,maxY) {
	if (isNaN(y)) return maxStep;
	if (y == 0) return maxStep;
	var halfY = maxY / 2;
	var yToMaxY = y / maxY;
	if (y < halfY) {
		return (y / halfY) * maxStep;
	} else {
		return (halfY / y) * maxStep;
	}
}

/**
* y goes from 0 to ((this.height + this.sideLength) - 10)
* z goes from 45 to this.sideLength and back to 45
* NOTE: isNaN() check is needed to unless speed is odd
*/
WHALE.HorizontallyFoldedCard.prototype.animateFrontSide = function (index) {
	var maxY = (this.height + this.sideLength) - 10;
	var maxStep = 17;
	 //for 1 = 213 frames
	if (this.vertices[index].y < maxY || isNaN(this.vertices[index].y)) {
		var speed = this.speed(maxStep,this.vertices[index].y,maxY);
		if (this.vertices[index].y < this.height) {
			this.vertices[index].z = this.vertices[index].z + speed;
			this.vertices[index].y = this.circleEquation(this.vertices[index].z,true);
		} else {
			this.vertices[index].z =  this.vertices[index].z - speed;
			this.vertices[index].y = this.circleEquation(this.vertices[index].z,false);
		}
	}
}

/**
* z goes from -45 to 45
* y goes from 0 to -8 and again to 0 
* NOTE: when z rem 2 != 0 then goes haywire
*/
WHALE.HorizontallyFoldedCard.prototype.animateBackSide = function (index) {
	var maxStep = 7;
	var z = this.vertices[index].z + (this.stretch/2);
	if ( (this.vertices[index].y <= 0) ) {
		var speed = this.speed(maxStep,z,this.stretch);
		this.vertices[index].z = this.vertices[index].z + speed;
		if (this.vertices[index].y > (this.height - this.sideLength)) {	
			this.vertices[index].y = this.circleEquation(this.vertices[index].z,true);
		} else {
			this.vertices[index].y = this.circleEquation(this.vertices[index].z,false);
		}
	}
}

/**
* @Override super.play()
* Play animation
*/
WHALE.HorizontallyFoldedCard.prototype.play = function () {
	this.animateFrontSide(0);
	this.animateFrontSide(1);
	this.animateFrontSide(4);
	this.animateFrontSide(5);
	// delay the execution of back side animation
	if ( this.vertices[5].y > (this.height - 60) ) {
		this.animateBackSide(8);
		this.animateBackSide(9);
		this.animateBackSide(12);
		this.animateBackSide(13);
	}
	
	this.verticesNeedUpdate = true;
	this.elementsNeedUpdate = true;
	this.morphTargetsNeedUpdate = true;
	this.uvsNeedUpdate = true;
	this.normalsNeedUpdate = true;
	this.colorsNeedUpdate = true;
	this.tangentsNeedUpdate = true;
}
