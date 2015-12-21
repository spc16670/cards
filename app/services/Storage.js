var module = angular.module('cards.services.Storage',[]);

module.service('StorageService', ['$window','CommonService',function ($window,CommonService) {

	if (!$window.localStorage) {
		console.log("LOCAL STORAGE IS NOT SUPPORTED");
		return null;
	};
	var Service = {};
	Service.persist = function(key,value) {
  		var obj = {'data': value, 'timestamp': new Date().getTime()};
       		$window.localStorage.setItem(key,JSON.stringify(obj));
       	};
    	Service.retrieve = function(key) {
        	var str = $window.localStorage.getItem(key);
	 	var val = {};
	  	var timestamp = 0;
	  	val = str ? JSON.parse(str) : null;
          	if (val) {
	    		var date = new Date();
	    		var expires = date.setDate(date.getDate() - CommonService.CONSTANTS.STORAGE_EXPIRY_DAYS);
	  	 	if (val.timestamp > expires) {
	      			val = val.data;
	      			Service.persist(key,val);
			} else {
	     			$window.localStorage.removeItem(key);
	 		}
          	}
		return val;
	};
	Service.remove = function(key) {
		$window.localStorage.removeItem(key);
	};
	Service.clear = function() {
		$window.localStorage.clear();
	};
  
	return Service;
}]);

