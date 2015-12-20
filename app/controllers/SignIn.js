
var module = angular.module('cards.controllers.SignIn',[]);

module.controller('SignInController', ['$scope', '$uibModal','BulletService','RequestFactory','CommonService','AuthService'
  ,function ($scope,$uibModal,BulletService,RequestFactory,CommonService,AuthService) {

	$scope.defaultLogin = {
		email : ""
		,password : ""
	}
	$scope.newLogin = {};
	angular.copy($scope.defaultLogin, $scope.newLogin);	
	
	$scope.login = function () {
		console.log($scope.newLogin);
		$scope.signInForm.$setPristine();
		var req = RequestFactory.login($scope.newLogin);
		var promise = BulletService.fire(req);
		angular.copy($scope.defaultLogin, $scope.newLogin );
		promise.then(function(resp){
			var authenticated = resp.body.authenticated;
			if (authenticated) {
				$scope.expand('login');
			} else {
				alert("We are sorry, please try again later");
			}
		});	
	}

	$scope.defaultUser = {
		email : ""
		,password : ""
		,rePassword : ""
	}
	$scope.defaultCustomer = {
		fname : ""
		,lname : ""
		,gender : "F"
		,tnc : false
		,promo : true
	}
	$scope.newUser = {};
	angular.copy($scope.defaultUser, $scope.newUser);
	$scope.newCustomer = {};
	angular.copy($scope.defaultCustomer, $scope.newCustomer);

	
	$scope.register = function () {
		$scope.registerForm.$setPristine();
		var user = {}; 
		angular.copy($scope.newUser, user);
		delete user.rePassword;
		angular.copy($scope.defaultUser, $scope.newUser);
		var customer = {};
		angular.copy($scope.newCustomer, customer);
		delete customer.tnc;
		customer.promo = (customer.promo) ? 'Y' : 'N';
		angular.copy($scope.defaultCustomer, $scope.newCustomer);
		var req = RequestFactory.register(user,customer);
		var promise = BulletService.fire(req);
		promise.then(function(resp){
			var registered = resp.body.registered;
			if (registered) {
				$scope.expand('login');
			} else {
				alert("We are sorry, please try again later");
			}
		});	
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
