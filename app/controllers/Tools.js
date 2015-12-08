var module = angular.module('cards.controllers.Tools',[]);

module.controller('ToolsController', ['$scope','DisplayService','CommonService', 
	function ($scope,DisplayService,CommonService) {
	
	$scope.collapsed = {
		text : true
		,selection : false
		,drawings : true
		,filters : true
	}
	
	//$scope.uuid = function () {
	//	return CommonService.UUID();
	//}
}]);
