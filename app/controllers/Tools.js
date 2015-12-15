var module = angular.module('cards.controllers.Tools',[]);

module.controller('ToolsController', ['$scope','DisplayService','CommonService', 
	function ($scope,DisplayService,CommonService) {
	
	$scope.collapsed = {
		text : false
		,selection : false
		,drawings : false
		,filters : true
	}

}]);
