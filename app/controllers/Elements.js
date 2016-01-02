
var module = angular.module('cards.controllers.Elements',[]);

module.controller('ElementController', ['$scope','ElementsService','Upload'
  ,'CommonService','$timeout','DisplayService','RequestFactory','BulletService',function ($scope
  ,ElementsService,Upload,CommonService,$timeout,DisplayService,RequestFactory,BulletService) {
	


	$scope.getPolicy = function() {
                var req = RequestFactory.s3policy();
		console.log("req",req);
                var promise = BulletService.fire(req);
		promise.then(function(resp){
 			console.log("resp",resp);
			var result = resp.header.result;
                	if (result === "ok") {
			} else if (result === "timeout") {
			}
		});	
	
	}


	$scope.files = [];
	$scope.file = null;
  
  	$scope.$watch('files', function () {
		$scope.upload($scope.files);
	});

	$scope.$watch('file', function () {
        	if ($scope.file != null) {
            		$scope.files = [$scope.file]; 
       		}
	});

	$scope.log = '';






	$scope.upload = function (files) {

		console.log("files",files,files.length);

		if (files && files.length) {
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				if (!file.$error) {
					Upload.upload({
						url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
						data: {
							username: $scope.username,
							file: file  
						}
					}).progress(function (evt) {
						console.log("progress",evt);
                	    			var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    				$scope.log = 'progress: ' + progressPercentage + '% ' +
                                			evt.config.data.file.name + '\n' + $scope.log;
	            	   		}).success(function (data, status, headers, config) {
						console.log("success",data);
						$timeout(function() {
							$scope.log = 'file: ' + config.data.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
						});
					});
				}
			}
		}
	}
	
	$scope.elements = ElementsService.elements;
	$scope.uploads = ElementsService.uploads;

	$scope.loadElement = function(element) {
		ElementsService.loadElement(element);
	}
	
	$scope.selectedImgFile = { };
	
	$scope.fileSelected = function(element) {
		/*
		$scope.$apply(function(scope) {
			var photofile = element.files[0];
			var reader = new FileReader();
			reader.onload = function(e) {
				//console.log(element.value.replace(/^.*\\/, ""));
				$scope.selectedImgFile = { base64 : e.target.result };
				fabric.Image.fromURL($scope.selectedImgFile.base64, function(img) {
					img.scale(0.2).setLeft(10).setTop(10);
					DisplayService.editingCanvas.add(img);
					//DisplayService.editingCanvas.renderAll();
				});
			};
			reader.readAsDataURL(photofile);
		});*/
	};
	
	$scope.selectElement = function(element) {
		var img = document.getElementById(element.elementId)
		var imgInstance = new fabric.Image(img, {
			left: CommonService.CONSTANTS.FABRIC_CANVAS.ELEMENT_DROP_OFFSET
			,top: CommonService.CONSTANTS.FABRIC_CANVAS.ELEMENT_DROP_OFFSET
			//angle: 30,
			//opacity: 0.85
		});
		imgInstance.crossOrigin = "";
		DisplayService.editingCanvas.add(imgInstance);
	}

}]);
