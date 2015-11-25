'use strict';

var app = angular.module('CardsApp', [
  ,'ui.bootstrap'
  ,'ngFileUpload'
  ,'cards.services.Display'
  ,'cards.services.Bullet'
  ,'cards.services.Categories'
  ,'cards.services.Utils'
  ,'cards.services.Common'
  ,'cards.controllers.Display'
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

app.constant("CONSTANTS", {
	FABRIC_CANVAS : {
		DEFAULT_BCKG_COLOUR : "#ffffff"
		,DEFAULT_FONT_SIZE : 15
	}
})
	
app.config(function($interpolateProvider){
});

app.run(['$rootScope',function($rootScope) {
}]);
