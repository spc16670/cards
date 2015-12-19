
var module = angular.module('cards.controllers.SignIn',[]);

module.controller('SignInController', ['$scope', '$uibModal','BulletService'
  ,function ($scope,$uibModal,BulletService) {

	$scope.toggler = { register : false }
	
	$scope.defaultLogin = {
		email : ""
		,password : ""
	}
	$scope.newLogin = {};
	angular.copy($scope.defaultLogin, $scope.newLogin);
	
	$scope.defaultRegister = {
		firstName : ""
		,lastName : ""
		,email : ""
		,rePassword : "" 
		,password : ""
		,tnc : false
		,promo : true
	}
	$scope.newRegister = {}
	angular.copy($scope.defaultRegister, $scope.newRegister);
	
	$scope.login = function () {
		console.log($scope.newLogin);
		$scope.registerForm.$setPristine()
		angular.copy($scope.defaultLogin, $scope.newLogin);
		//BulletService.
	}

	
	$scope.register = function () {
		console.log($scope.newRegister);
		angular.copy($scope.defaultRegister, $scope.newRegister);
		$scope.toggler.register = !$scope.toggler.register;
	}
	
	// ------------------ TNC ------------------
	
	$scope.items = ['item1', 'item2', 'item3'];
	
	$scope.tnc = function (size) {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'tncModal.html',
      controller: 'TncModalInstanceController',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
	$scope.selected = selectedItem;
	}, function () {
	  console.log('Modal dismissed at: ' + new Date());
	});
  };

}]);

module.controller('TncModalInstanceController', function ($scope, $uibModalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
