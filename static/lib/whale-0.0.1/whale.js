/**
 * @author coolfeature
 * @todo implement inheritance
 */

var WHALE = WHALE || { REVISION: '1' };

if ( typeof define === 'function' && define.amd ) {
	define( 'whale', WHALE );
} else if ( 'undefined' !== typeof exports && 'undefined' !== typeof module ) {
	module.exports = WHALE;
}

WHALE.makeTextSprite = function makeTextSprite( message, parameters ) {
	if ( parameters === undefined ) parameters = {};
	
	var fontface = parameters.hasOwnProperty("fontface") ? 
		parameters["fontface"] : "Arial";
	
	var fontsize = parameters.hasOwnProperty("fontsize") ? 
		parameters["fontsize"] : 18;
	
	var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
		parameters["borderThickness"] : 4;
	
	var borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
	
	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };
		
	var scale = parameters.hasOwnProperty("scale") ?
		parameters["scale"] : { x : 100, y : 50, z : 1.0 };

		
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.font = "Bold " + fontsize + "px " + fontface;
    
	// get size data (height depends only on font size)
	var metrics = context.measureText( message );
	var textWidth = metrics.width;
	
	// background color
	context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
								  + backgroundColor.b + "," + backgroundColor.a + ")";
	// border color
	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
								  + borderColor.b + "," + borderColor.a + ")";

	context.lineWidth = borderThickness;
	roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
	// 1.4 is extra height factor for text below baseline: g,j,p,q.
	
	// text color
	context.fillStyle = "rgba(0, 0, 0, 1.0)";

	context.fillText( message, borderThickness, fontsize + borderThickness);
	
	var texture = new THREE.Texture(canvas) 
	texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false } );
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(scale.x, scale.y, scale.z);
	return sprite;	
}

// function for drawing rounded rectangles
function roundRect(ctx, x, y, w, h, r) 
{
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
	ctx.stroke();   
}

function circle(ctx, x, y, w, h, r) {
	var radius = 70;
	ctx.beginPath();
	/**
	* x	The x-coordinate of the center of the circle
	* y	The y-coordinate of the center of the circle
	* r	The radius of the circle
	* sAngle	The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)	
	* eAngle	The ending angle, in radians
	* counterclockwise	Optional. False is default, and indicates clockwise, while true indicates counter-clockwise.
	*/
	ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
	ctx.fillStyle = 'green';
	ctx.fill();
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#003300';
	ctx.stroke();
}

// ============================================================================
// =============================== BaseGeometry ===============================
// ============================================================================

WHALE.BaseGeometry = function (width,height) {
	this.type = 'BaseGeometry';
	this.width = width || 200;
	this.height = height || 100;
	THREE.Geometry.call( this );
}
WHALE.BaseGeometry.prototype = Object.create( THREE.Geometry.prototype );
WHALE.BaseGeometry.prototype.constructor = WHALE.BaseGeometry;
WHALE.BaseGeometry.prototype.print = function () { console.log(this.type,this); };
WHALE.BaseGeometry.prototype.play = function() { console.log(this.type,"play() = Not implemented"); };
WHALE.BaseGeometry.prototype.getMaterialSize = function() { console.log(this.type,"getMaterialSize() - Not implemented"); };
WHALE.BaseGeometry.prototype.reset = function() { console.log(this.type,"reset() - Not implemented"); };
WHALE.BaseGeometry.prototype.destroy = function() { console.log(this.type,"destroy() = Not implemented"); };




