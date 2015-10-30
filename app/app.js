'use strict';

var app = angular.module('CardsApp', [
  ,'ui.bootstrap'
  ,'angularSlideables'
  ,'cards.services.Display'
  ,'cards.services.Bullet'
  ,'cards.controllers.Display'
  ,'cards.controllers.Tools'
  ,'cards.controllers.Groups'
  ,'cards.controllers.Categories'
  ,'cards.directives.Display'
  ,'cards.directives.Fabric'
  ,'cards.directives.Util'
]);

app.config(function($interpolateProvider){
});

app.run(['$rootScope',function($rootScope) {
}]);
