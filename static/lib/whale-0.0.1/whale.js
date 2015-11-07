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
	
	this.BUILD_STATE = { vertices : [] };
	
	var scope = this; // this in build() is different so we need a global var
	
	var width_half = this.width / 2;
	var height_full = this.height;
	var stretch_half = this.stretch / 2;
	
	this.countFrames = 0;
	
	this.sideLength = Math.sqrt( Math.pow(stretch_half,2) + Math.pow(this.height,2) );
	
	build();
	
	function build() {

		// https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/BoxGeometry.js
		// http://threejs.org/docs/#Reference/Core/Face3
		
		// https://github.com/mrdoob/three.js/issues/1741
		// http://stackoverflow.com/questions/17293290/three-js-geometry-facevertexuvs00index-is-not-the-same-as-geometry-verti
		
		// http://stackoverflow.com/questions/21462851/flip-normals-in-three-js-on-sphere
		// http://paulyg.f2s.com/uv.htm
		
		/**
		* FRONT SIDE VERTICES
		*/
		var frontFrontLeftLowerCorner = new THREE.Vector3(-width_half, 0, stretch_half); // front front left lower corner
		var frontFrontRightLowerCorner = new THREE.Vector3(width_half, 0, stretch_half); // front front right lower corner
		var frontFrontRightUpperCorner = new THREE.Vector3(width_half, height_full, 0);  // front front right upper corner
		var frontFrontLeftUpperCorner = new THREE.Vector3(-width_half, height_full, 0); // front front left upper corner
		
		var frontBackLeftLowerCorner = new THREE.Vector3(-width_half, 0, stretch_half); // front back left lower corner
		var frontBackRightLowerCorner = new THREE.Vector3(width_half, 0, stretch_half); // front back right lower corner
		var frontBackRightUpperCorner =  new THREE.Vector3(width_half, height_full, 0);  // front back right upper corner
		var frontBackLeftUpperCorner = new THREE.Vector3(-width_half, height_full, 0); // front back left upper corner

		/**
		* BACK SIDE VERTICES
		*/
		var backFrontLeftLowerCorner = new THREE.Vector3(-width_half, 0, -stretch_half); // back front left lower corner
		var backFrontRightLowerCorner = new THREE.Vector3(width_half, 0, -stretch_half); // back front right lower corner
		var backFrontRightUpperCorner = new THREE.Vector3(width_half, height_full, 0);  // back front right upper corner
		var backFrontLeftUpperCorner = new THREE.Vector3(-width_half, height_full, 0); // back front left upper corner	
		
		var backBackLeftLowerCorner = new THREE.Vector3(-width_half, 0, -stretch_half); // back back left lower corner
		var backBackRightLowerCorner = new THREE.Vector3(width_half, 0, -stretch_half); // back back right lower corner
		var backBackRightUpperCorner = new THREE.Vector3(width_half, height_full, 0); // back back right upper corner
		var backBackLeftUpperCorner = new THREE.Vector3(-width_half, height_full, 0); // back back left upper corner	
		
		
		
		scope.vertices.push(frontFrontLeftLowerCorner);	scope.BUILD_STATE.vertices.push(frontFrontLeftLowerCorner.clone());
		scope.vertices.push(frontFrontRightLowerCorner);scope.BUILD_STATE.vertices.push(frontFrontRightLowerCorner.clone());
		scope.vertices.push(frontFrontRightUpperCorner);scope.BUILD_STATE.vertices.push(frontFrontRightUpperCorner.clone());
		scope.vertices.push(frontFrontLeftUpperCorner);	scope.BUILD_STATE.vertices.push(frontFrontLeftUpperCorner.clone());
		
		scope.vertices.push(frontBackLeftLowerCorner);	scope.BUILD_STATE.vertices.push(frontBackLeftLowerCorner.clone());
		scope.vertices.push(frontBackRightLowerCorner);	scope.BUILD_STATE.vertices.push(frontBackRightLowerCorner.clone());
		scope.vertices.push(frontBackRightUpperCorner);	scope.BUILD_STATE.vertices.push(frontBackRightUpperCorner.clone());
		scope.vertices.push(frontBackLeftUpperCorner);	scope.BUILD_STATE.vertices.push(frontBackLeftUpperCorner.clone());
		
		scope.vertices.push(backFrontLeftLowerCorner);	scope.BUILD_STATE.vertices.push(backFrontLeftLowerCorner.clone());
		scope.vertices.push(backFrontRightLowerCorner);	scope.BUILD_STATE.vertices.push(backFrontRightLowerCorner.clone());
		scope.vertices.push(backFrontRightUpperCorner);	scope.BUILD_STATE.vertices.push(backFrontRightUpperCorner.clone());
		scope.vertices.push(backFrontLeftUpperCorner);	scope.BUILD_STATE.vertices.push(backFrontLeftUpperCorner.clone());
		
		scope.vertices.push(backBackLeftLowerCorner);	scope.BUILD_STATE.vertices.push(backBackLeftLowerCorner.clone());
		scope.vertices.push(backBackRightLowerCorner);	scope.BUILD_STATE.vertices.push(backBackRightLowerCorner.clone());
		scope.vertices.push(backBackRightUpperCorner);	scope.BUILD_STATE.vertices.push(backBackRightUpperCorner.clone());
		scope.vertices.push(backBackLeftUpperCorner);	scope.BUILD_STATE.vertices.push(backBackLeftUpperCorner.clone());
		
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
		
		/**
		* Canvas renderer does not support skinning
		*/
		scope.computeFaceNormals();
		scope.computeVertexNormals();
		//scope.mergeVertices();
		
		console.log(scope.type,scope);
		//console.log("JSON GEOMETRY:",scope.toJSON());
	}

};

WHALE.HorizontallyFoldedCard.prototype = Object.create( THREE.Geometry.prototype );
WHALE.HorizontallyFoldedCard.prototype.constructor = WHALE.HorizontallyFoldedCard;

WHALE.HorizontallyFoldedCard.prototype.getMaterialSize = function () {
	return { x: this.width, y: this.sideLength }
};

WHALE.HorizontallyFoldedCard.prototype.reset = function () {
	var i;
	for(i=0;i<this.BUILD_STATE.vertices.length;i++) {
		var originalVertex = this.BUILD_STATE.vertices[i].clone()
		this.vertices[i] = originalVertex;
	}
	this.verticesNeedUpdate = true;
}

WHALE.HorizontallyFoldedCard.prototype.circleEquation = function(val,negative) {
	// y = +/- (r^2 - (x-h)^2)^1/2 + k -- eg: y = -(128^2 - 46^2)^1/2 + 120
	return ( Math.sqrt( Math.pow( this.sideLength, 2 ) - Math.pow(val, 2) ) * ((negative) ? -1 : 1)) + this.height
} 
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

WHALE.HorizontallyFoldedCard.prototype.play = function () {
	this.animateFrontSide(0);
	this.animateFrontSide(1);
	this.animateFrontSide(4);
	this.animateFrontSide(5);
	this.animateBackSide(8);
	this.animateBackSide(9);
	this.animateBackSide(12);
	this.animateBackSide(13);
	//console.log("z",this.vertices[5].z,"y",this.vertices[5].y,"z",this.vertices[6].z,"y",this.vertices[6].y);
	//console.log("y:",this.vertices[0].y,"z:",this.vertices[0].z,this.countFrames);
}

