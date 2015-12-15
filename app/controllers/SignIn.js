
var module = angular.module('cards.controllers.SignIn',[]);

module.controller('SignInController', ['$scope',function ($scope) {

	$scope.toggler = { register : false }
	
	$scope.loginForm = {}
	$scope.registerForm = {}
	
	
	$scope.login = function () {
		console.log($scope.loginForm);
	}

	
	$scope.register = function () {
		console.log($scope.registerForm);
	}

}]);