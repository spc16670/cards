
var module = angular.module('cards.controllers.GroupController',[]);

module.controller('GroupController', ['$scope', function ($scope) {

  $scope.groups = [
    {
      name: 'business_cards'
      ,title: 'Business Cards'
      ,models: []
    }
    ,{
      name: 'wedding_invitations'
      ,title: 'Wedding Invitations'
      ,models: []
    }
    ,{
      name: 'flyers'
      ,title: 'Flyers'
      ,models: []
    }
    ,{
      name: 'leaflets'
      ,title: 'Leafets'
      ,models: []
    }
  ];

  $scope.loadGroup = function (group) {
    if (group.models.length == 0) {
      if (group.name === "business_cards") {
        group.models.push({ title: "Standard Card", icon: "card.jpg", id: 1});
      } else if (group.name === "wedding_invitations") {
        group.models.push({ title: "Standard Wedding Invitation", icon: "invitation.jpg", id: 1});
      } else if (group.name === "flyers") {
        group.models.push({ title: "Standard Flyer", icon: "flyer.jpg", id: 1});
      } else if (group.name === "leaflets") {
        group.models.push({ title: "Standard Leaflet", icon: "leaflet.jpg", id: 1});
      } 
    }
  }

  $scope.businessCards = [
    { id: 1, dimensions: { x : 100, y: 160, z: 0 }}
  ];
  $scope.weddingInvitations = [
    { id: 1, dimensions: { x : 100, y: 160, z: 0 }}
  ];
  $scope.flyers = [
    { id: 1, dimensions: { x : 100, y: 160, z: 0 }}
  ];
  $scope.leaflets = [
    { id: 1, dimensions: { x : 100, y: 160, z: 0 }}
  ];

  $scope.selectModel = function(model) {
    console.log(model);
  }

}]);