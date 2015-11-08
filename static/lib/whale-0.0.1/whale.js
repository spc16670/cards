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


