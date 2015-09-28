'use strict';

var app = angular.module('CardsApp', [
  ,'ui.bootstrap'
  ,'cards.services.Canvas'
  ,'cards.controllers.Canvas'
  ,'cards.controllers.Tools'
  ,'cards.controllers.GroupController'
  ,'cards.directives.Three'
  ,'cards.directives.Fabric'
]);

app.config(function($interpolateProvider){
});

app.run(['$rootScope',function($rootScope) {
}]);
