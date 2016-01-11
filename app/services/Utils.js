var module = angular.module('cards.services.Utils',[]);

module.service('UtilsService', [function () {

	var Service = {}
	
	Service.removeListener = function (x,eventName,fun) {
		if (x.removeEventListener) {
			x.removeEventListener(eventName, fun);
		} else if (x.detachEvent) {
			x.detachEvent(eventName, fun);
		}
	}
	
	Service.removeChildren = function (elem) {
		while (elem.lastChild) elem.removeChild(elem.lastChild);
	}
	
	Service.uuid = function () {
		return THREE.Math.generateUUID();
	}

	Service.randomId = function() {
		var id = "id-" + Service.uuid();
		return id;
	}

	Service.timestamp = function () {
		return new Date().getUTCMilliseconds();
	}

	Service.getYear = function () {
		return new Date().getFullYear();
	}
	Service.isEmpty = function isEmpty(obj) {
		for(var prop in obj) {
			if(obj.hasOwnProperty(prop)) 
				return false;
		}
		return true;
	}
	
	Service.resizeImage = function(url, width, height, callback) {
		var sourceImage = new Image();
		sourceImage.onload = function() {
			var canvas = document.createElement("canvas");
			canvas.width = width;
			canvas.height = height;
			canvas.getContext("2d").drawImage(sourceImage, 0, 0, width, height);
			callback(canvas.toDataURL());
		}
		sourceImage.src = url;
	}
	
	return Service;
}]);
