'use strict';

var app = angular.module('CardsApp', [
  ,'ui.bootstrap'
  ,'ngFileUpload'
  ,'cards.services.Display'
  ,'cards.services.Bullet'
  ,'cards.services.Categories'
  ,'cards.controllers.Display'
  ,'cards.controllers.Tools'
  ,'cards.controllers.Elements'
  ,'cards.controllers.Categories'
  ,'cards.controllers.Main'
  ,'cards.directives.Display'
  ,'cards.directives.Fabric'
  ,'cards.directives.Util'
  ,'cards.directives.Slideable'
  ,'cards.directives.Thumbnail'
]);

app.config(function($interpolateProvider){
});

app.run(['$rootScope',function($rootScope) {
}]);
