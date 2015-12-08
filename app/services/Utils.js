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
	
	Service.isEmpty = function isEmpty(obj) {
		for(var prop in obj) {
			if(obj.hasOwnProperty(prop)) 
				return false;
		}
		return true;
	}
	
	return Service;
}]);