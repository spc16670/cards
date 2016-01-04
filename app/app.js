'use strict';

var app = angular.module('CardsApp', [
	'colorpicker.module'
	,'darthwade.loading'
	,'ui.bootstrap'
	,'ngFileUpload'
	,'ngCookies'
	,'cards.services.Display'
	,'cards.services.Bullet'
	,'cards.services.Menu'
	,'cards.services.Utils'
	,'cards.services.Common'
	,'cards.services.Elements'
	,'cards.services.Session'
	,'cards.services.Basket'
	,'cards.services.Storage'
	,'cards.services.Models'
	,'cards.factories.Request'
	,'cards.controllers.Display'
	,'cards.controllers.Saves'
	,'cards.controllers.Selection'
	,'cards.controllers.Drawings'
	,'cards.controllers.Text'
	,'cards.controllers.Tools'
	,'cards.controllers.Elements'
	,'cards.controllers.Samples'
	,'cards.controllers.Menu'
	,'cards.controllers.SignIn'
	,'cards.controllers.Basket'
	,'cards.controllers.Main'
	,'cards.directives.Display'
	,'cards.directives.Fabric'
	,'cards.directives.Slideable'
	,'cards.directives.Thumbnail'
	,'cards.directives.Validate'
]);

app.config(['$interpolateProvider',function($interpolateProvider){
}]);
app.config(['$httpProvider',function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
}]);
app.run(['$templateCache','CommonService',function($templateCache,CommonService) {

}]);

