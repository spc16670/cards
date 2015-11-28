var module = angular.module('cards.services.Common',[]);

module.service('CommonService', [function () {

	var Service = {}
	
	Service.fonts = [
		{ name : "arial black", style: { fontFamily : "arial black" } }
		,{ name : "Aaargh", style: { fontFamily : "Aaargh" } }
		,{ name : "Veeeeeeeeeeeeeeeeeeeeeeeeeryyy long name", style: { fontFamily : "Aaargh" } }
	];
	
	Service.fontSizes = [
		8,10,12,14,16,18,20,24,26,28,30,34,38,42,46,50
	];
	
	return Service;
}]);