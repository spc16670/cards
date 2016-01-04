
var module = angular.module('cards.controllers.Elements',[]);

module.controller('ElementController', ['$scope','ElementsService','Upload'
  ,'CommonService','$timeout','DisplayService','RequestFactory','BulletService'
  ,'SessionService',function ($scope,ElementsService,Upload,CommonService
  ,$timeout,DisplayService,RequestFactory,BulletService,SessionService) {
	
	$scope.user = SessionService.user;

	$scope.$watch(function() { return SessionService.user.isLogged }, function () {
		if (SessionService.user.isLogged) {
			console.log("logged:: ",SessionService.user.isLogged);
			/*
			var promise = BulletService.http({
				url: 'url of service'
				,method: "POST"
				,data: {test :  name }
				,withCredentials: true
				,headers: {
					'Content-Type': 'application/json; charset=utf-8'
					,'Authorization': 'Basic bashe64usename:password'
				}
			});*/
		}
        });

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
		console.log('$scope.files',$scope.files)
		$scope.upload($scope.files);
	});

	$scope.$watch('file', function () {
		console.log('$scope.file',$scope.file)
        	if ($scope.file != null) {
            		$scope.files = [$scope.file]; 
       		}
	});

	$scope.log = '';



	// upload on drop
	$scope.upload = function (files) {
		if (!files || files.length === 0) return;
		console.log("files",files);
		var ticket;
		var req = RequestFactory.s3policy();
		var promise = BulletService.fire(req);
		promise.then(function(resp){
			console.log("resp",resp);
			var result = resp.header.result;
				if (result === "ok") {
					ticket = resp.body;
					console.log("TICKET:: ",ticket);
					for (var i = 0; i < files.length; i++) {
						var file = files[i];
						if (!file.$error) {
							Upload.upload({
								url: ticket.url //S3 upload url including bucket name
								,method: 'POST'
								,data: {
									key: "uploads/" + file.name // the key to store the file on S3
									,AWSAccessKeyId: ticket.access
									,acl: 'private' 
									,policy: ticket.policy
									,signature: ticket.signature 
									,"Content-Type": file.type != '' ? file.type : 'application/octet-stream' 
									//,filename: file.name // this is needed for Flash polyfill IE8-9
									,file: file
								}
							}).then(function (resp) {
								$scope.finalizeUpload(resp);
								console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
							}, function (resp) {
								console.log('Error status: ' + resp.status);
							}, function (evt) {
								var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
								console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
							});
						}
					}
				} else if (result === "timeout") {
					alert("The request timed out, please try again later");
			        }
			});

	}
	

	$scope.finalizeUpload = function(resp) {
		if (resp.status == 204) {
			
			var url = resp.config.url;
		}
		console.log("data:",resp);
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
