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
		var resp = {
			header : { action : "s3" }
			,body : {}
		}
		resp.body.verb = data.verb;
		resp.body.path = SessionService.user.info.key;
		resp.body.headers = (data.headers) ? data.headers : [];
		return Factory.addToken(resp);;
	}

	return Factory;
}]);
