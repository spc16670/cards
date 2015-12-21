var module = angular.module('cards.services.Session',[]);

module.service('SessionService', ['StorageService','CommonService',function (StorageService,CommonService) { 

	var Service = {
		user : { isLogged : false }
	};

	Service.create = function(email,token,customer) {
		Service.setToken(token);
		Service.user.info = { 
			email : email
			,customer : customer
		};
		StorageService.persist(CommonService.CONSTANTS.USER_INFO_KEY,Service.user.info);
		Service.user.isLogged = true;
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
		Service.user.isLogged = false;
		Service.user.info = null;
	}

	Service.init = function() {
		var token = Service.getToken();
		console.log("token",token);
		if (token != null) {
			var info = StorageService.retrieve(CommonService.CONSTANTS.USER_INFO_KEY);
			Service.create(info.email,token,info.customer);
		}
	}

	Service.init();

	return Service;
}]);

	
