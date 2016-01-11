var module = angular.module('cards.services.Session',[]);

module.service('SessionService', ['StorageService','CommonService','ElementsService'
  ,function (StorageService,CommonService,ElementsService) { 

	var Service = {
		user : { isLogged : function (){ return (Service.getToken()) ? true : false } }
	};

	Service.create = function(resp) {
		Service.setToken(resp.token);
		Service.user.info = { 
			email : resp.email
			,customer : resp.customer
			,key : resp.key
			,expiry : resp.expiry
		};
		StorageService.persist(CommonService.CONSTANTS.USER_INFO_KEY,Service.user.info);
	}

	Service.setToken = function(token) {
		StorageService.persist(CommonService.CONSTANTS.TOKEN_KEY,token);		
	}
	Service.getToken = function() {
		return StorageService.retrieve(CommonService.CONSTANTS.TOKEN_KEY);		
	}

	Service.destroy = function() {
		StorageService.remove(CommonService.CONSTANTS.TOKEN_KEY);
		StorageService.remove(CommonService.CONSTANTS.USER_INFO_KEY);
		ElementsService.removeUploads();
		Service.user.info = null;
	}

	Service.init = function() {
		var token = Service.getToken();
		console.log("token",token);
		if (token != null) {
			var info = StorageService.retrieve(CommonService.CONSTANTS.USER_INFO_KEY);
			info.token = token;
			Service.create(info);
		}
	}

	Service.init();

	return Service;
}]);

	
