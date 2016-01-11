
var module = angular.module('cards.controllers.Elements',[]);

module.controller('ElementController', ['$scope','ElementsService','Upload'
  ,'CommonService','$timeout','DisplayService','RequestFactory','BulletService'
  ,'SessionService','UtilsService'
  ,function ($scope,ElementsService,Upload,CommonService
  ,$timeout,DisplayService,RequestFactory,BulletService,SessionService
  ,UtilsService) {
	
	$scope.user = SessionService.user;
	$scope.uploads = ElementsService.uploads;

	$scope.$watch(function() { return SessionService.user.isLogged() }, function () {
		console.log("logged:: ",SessionService.user.isLogged());
		console.log("len ", $scope.uploads.length, ElementsService.uploads.length);
		if (SessionService.user.isLogged()) {
			$scope.getUploads();
		} else {
			ElementsService.uploads = [];
		}
        });
	
	$scope.getUploads = function() {
		if ($scope.uploads.length != 0) return;
		var req =  RequestFactory.s3({ type : "list"});
		console.log("req",req);
		var promise = BulletService.fire(req);
		promise.then(function(resp){
			console.log("resp",resp);
			var callOk = resp.header.result;
			var actionOk = resp.body.result;
        		if (callOk === "ok" && actionOk === "ok") {
				var uploads = resp.body.contents;
				for (var i=0;i<uploads.length;i++) {
					var upload = uploads[i];
					var id = UtilsService.randomId();
					upload.id = id;
					ElementsService.uploads.push(upload);
				}
			} else if (result === "timeout") {
				alert("We could not retrieve your uploads. Please try again later or contact us.")
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


	$scope.upload = function (files) {
		if (!files || files.length === 0) return;
		var req = RequestFactory.s3({ type : "upload"});
		console.log("req",req);
                var promise = BulletService.fire(req);
		promise.then(function(resp){
 			console.log("resp",resp);
			var result = resp.header.result;
                	if (result === "ok") {
				$scope.s3upload(files,resp.body)
			} else if (result === "timeout") {
				alert("The upload could not be completed. Please try again later.");
			}
		});	

	
	}

	$scope.progressBars = {};

	$scope.s3upload = function (files,ticket) {
		console.log("files",files);
		console.log("TICKET:: ",ticket);
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			console.log("FILE",file);
			if (file.size > ticket.size.max || file.size < ticket.size.min) {
				var allowedSize = Math.round(ticket.size.max / 1000000) + "MB";
				alert("The file is too large. The maxiumum size allowed is: "+allowedSize);
				file = null;
				return;
			} else if (file.$error) {
				console.log("There has been an error",file.$error);
				return;
			}
			var cib = i.toString();
			var s3KeyName = ticket.key + UtilsService.timestamp() + "-" + file.name;

			$scope.progressBars[cib] = {
				fileName : file.name
				,progress : 0
				,type : "warning"
				,msg : "Preparing upload"
			}


			var upload;
			upload = Upload.upload({
				url: ticket.url //S3 upload url including bucket name
				,method: 'POST'
				,cib : cib
				,s3Url : ticket.url + "/" + s3KeyName
				,data: {
					key: s3KeyName // the key to store the file on S3
					,AWSAccessKeyId: ticket.access
					,acl: ticket.acl 
					,policy: ticket.policy
					,signature: ticket.signature 
					,"Content-Type": file.type != '' ? file.type : 'application/octet-stream' 
					//,filename: file.name // this is needed for Flash polyfill IE8-9
					,file: file
				}
			});

			//
			upload.then(function (resp) {
				$scope.finalizeUpload(resp);
			}, function (resp) {
				console.log("Error:",resp);
				$scope.progressBars[resp.config.cib].type = "error"; 
				$scope.progressBars[resp.config.cib].msg = "Upload failed, please try again later."; 
				$scope.removeProgressBar(resp.config.cib);
			}, function (evt) {
				var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
				$scope.progressBars[evt.config.cib].progress = progressPercentage; 
				$scope.progressBars[evt.config.cib].msg = "Uploading..."; 
				console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
			});
		}

	}
	

	$scope.finalizeUpload = function(resp) {
		
		console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
		if (resp.status == 204) {
			$scope.progressBars[resp.config.cib].type = "success";
			$scope.progressBars[resp.config.cib].msg = "File uploaded"; 
			var id = UtilsService.randomId();
			var upload = { id : id , src : resp.config.s3Url };
			ElementsService.uploads.push(upload);
			$scope.removeProgressBar(resp.config.cib);
		}
		console.log("data:",resp);
	}

	$scope.removeProgressBar = function(cib) {
		$timeout(function(){
			delete $scope.progressBars[cib];
			}
		,3000);	
	}


	$scope.elements = ElementsService.elements;
	
	
	$scope.selectElement = function(element) {
		var img = document.getElementById(element.id)
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
