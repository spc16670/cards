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
	,'cards.services.Template'
	,'cards.factories.Request'
	,'cards.controllers.Display'
	,'cards.controllers.Selection'
	,'cards.controllers.Drawings'
	,'cards.controllers.Text'
	,'cards.controllers.Tools'
	,'cards.controllers.Elements'
	,'cards.controllers.Templates'
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

app.config(function($interpolateProvider){
});

app.run(['$templateCache','CommonService','$cacheFactory',function($templateCache,CommonService,$cacheFactory) {

}]);

