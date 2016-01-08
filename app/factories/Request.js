var module = angular.module('cards.factories.Request',[]);

module.factory('RequestFactory', ['SessionService',function(SessionService) {
	var Factory = {};

	Factory.addMeta = function(name,obj) {
		obj["__meta__"] = { name: name };
		return obj;
	}

	Factory.addToken = function(resp) {
		var token = SessionService.getToken();
		if (token) resp.body.token = token;
		return resp;
	}

	Factory.login = function(user) {
		return {
			header : { action : "login" }
			,body : Factory.addMeta("user",user)
		}

	}

	Factory.register = function(user,customer) {
		return {
			header : { action : "register" }
			,body : {
				user : Factory.addMeta("user",user)
				,customer : Factory.addMeta("customer",customer)
			}
		}

	}

	Factory.s3 = function(data) {
		var req = {
			header : { action : "s3" }
			,body : {}
		}
		req.body.type = data.type;
		req.body.key = SessionService.user.info.key;
		//req.body.headers = (data.headers) ? data.headers : [];
		return Factory.addToken(req);
	}

	return Factory;
}]);
