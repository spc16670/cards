'use strict';

var app = angular.module('CardsApp', [
  ,'ui.bootstrap'
  ,'cards.services.Display'
  ,'cards.services.Bullet'
  ,'cards.controllers.Display'
  ,'cards.controllers.Tools'
  ,'cards.controllers.GroupController'
  ,'cards.directives.Display'
  ,'cards.directives.Fabric'
]);

app.config(function($interpolateProvider){
});

app.run(['$rootScope',function($rootScope) {
}]);
