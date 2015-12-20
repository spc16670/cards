var module = angular.module('cards.factories.Request',[]);

module.factory('RequestFactory', [function() {
	var Factory = {};

	Factory.addMeta = function(name,obj) {
		obj["__meta__"] = { name: name };
		return obj;
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


	return Factory;
}]);
