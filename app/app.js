'use strict';

var app = angular.module('CardsApp', [
	'colorpicker.module'
	,'ui.bootstrap'
	,'ngFileUpload'
	,'cards.services.Display'
	,'cards.services.Bullet'
	,'cards.services.Categories'
	,'cards.services.Utils'
	,'cards.services.Common'
	,'cards.services.Elements'
	,'cards.controllers.Display'
	,'cards.controllers.Selection'
	,'cards.controllers.Drawings'
	,'cards.controllers.Text'
	,'cards.controllers.Tools'
	,'cards.controllers.Elements'
	,'cards.controllers.Templates'
	,'cards.controllers.Categories'
	,'cards.controllers.Main'
	,'cards.directives.Display'
	,'cards.directives.Fabric'
	,'cards.directives.Slideable'
	,'cards.directives.Thumbnail'
]);

app.config(function($interpolateProvider){
});

app.run(['$templateCache','CommonService','$cacheFactory',function($templateCache,CommonService,$cacheFactory) {

}]);

