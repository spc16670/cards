'use strict';

var app = angular.module('CardsApp', [
  'cards.controllers.Main'
  ,'cards.directives.Three'
]);

app.config(function($interpolateProvider){
});

app.run(['$rootScope',function($rootScope) {
}]);
