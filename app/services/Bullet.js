var module = angular.module('cards.services.Bullet',[]);

module.service('BulletService', ['DisplayService','CommonService','$q','$timeout','$rootScope'
  ,function (DisplayService,CommonService,$q,$cookies,$timeout,$rootScope) {

	var Service = {  url : "", promise: null, cid : 0, timeout : $cookies.clientTimeout };

	Service.fire = function () {
	}


  var port = "8443";
  var protocol = window.location.protocol;
  if (protocol === "http:") {
    protocol = "ws:"
    port = "8080";
  } else {
    protocol = "wss:"
  }
  Service.url = protocol + '//' + window.location.hostname + ':' + port + '/bullet/' + CommonService.sid;
  console.log("Bullet URL: ", Service.url);

  var options = { disableEventSource: true, disableXHRPolling : true, disableWebSocket : false};

  var bullet = $.bullet(Service.url, options);
  var callbacks = {};
  var currentCallbackId = 0;

  var isOpened = false;
  var scheduledQueue = [];

  bullet.onopen = function(){
    isOpened = true;
    for (var i = 0; i < scheduledQueue.length; i++) {
      console.log("DEQUEUING REQUESTS",scheduledQueue);
      fireBullet(scheduledQueue[i]);
      scheduledQueue.splice(i,1);
    }
  }

  bullet.onclose = bullet.ondisconnect = function(){
    console.log('CONNECTION CLOSED');
    isOpened = false;
  };

  bullet.onmessage = function(e){
    if (e.data != 'pong'){
      var json = $.parseJSON(e.data);
      listener(json);
      if (json.hasOwnProperty('header')) { 
        if (json.header.type === "news") {
          console.log('NEWS RECEIVED' + json)
        }
      }
    }
  };
  

function sendRequest(request) {
    var defer = $q.defer();
    var callbackId = getCallbackId();
    Service.cid = callbackId; 
    request.header.cbid = callbackId;
    var timeoutPromise = $timeout(function(data){
      var timeoutRequest = request;
      timeoutRequest.header.cbid = callbackId;
      timeoutRequest.header.result = "timeout";
      timeoutRequest.header.msg = "A timeout occurred";
      listener(timeoutRequest);
    },clientTimeout);

    callbacks[callbackId] = {
      time: new Date(),
      cb: defer,
      timeoutPromise: timeoutPromise
    };

    if (isOpened) {
      fireBullet(request);
    } else {
      scheduledQueue.push(request);
    }
    return defer.promise;
  }

  function fireBullet(request) {
    bullet.send(JSON.stringify(request));
  }

  function listener(response) {
    if(callbacks.hasOwnProperty(response.header.cbid)) {
      var callback = callbacks[response.header.cbid];
      $timeout.cancel(callback.timeoutPromise);
      $rootScope.$apply(callback.cb.resolve(response));
      delete callbacks[response.header.cbid];
    }
  }

  function getCallbackId() {
    currentCallbackId += 1;
    if(currentCallbackId > 10000) {
      currentCallbackId = 0;
    }
    return currentCallbackId;
  }

  Service.send = function(msg) {
    msg.header.cbid = null;
    var promise = sendRequest(msg);
    Service.promise = promise; 
    return promise;
  }













	

	Service.models = [
    	{ 
			type : 'businessCards'
			, id: 1
			, size : { x : 250, y : 120 } 
			, geometry : 'Card'
			, fabrics : [
				{ materialIndex : 0, fabricJson : { objects : [], background : "#ff00ff"} }
				,{ materialIndex : 1, fabricJson : { objects : [], background : "#BBDDFF"} }
			]
		}
		,{ 
			type : 'invitations'
			, id: 1
			, size : { x : 250, y : 120, z : 90 } 
			, geometry : 'HorizontallyFoldedCard'
			, fabrics : [
				{ materialIndex : 0, fabricJson : { objects : [], background : "#BBDDFF"} }
				,{ materialIndex : 1, fabricJson : { objects : [], background : "#BBDDFF"} }
				,{ materialIndex : 2, fabricJson : { objects : [], background : "#6EB7FF"} }
				,{ materialIndex : 3, fabricJson : { objects : [], background : "#6EB7FF" } }
			]
		}
		,{ 
			type : 'invitations'
			, id: 2
			, size : { x : 100, y : 250, z : 80 } 
			, geometry : 'VerticallyFoldedCard'
			, fabrics : [
				{ materialIndex : 0, fabricJson : { objects : [], background : "#BBDDFF"} }
				,{ materialIndex : 1, fabricJson : { objects : [], background : "#BBDDFF"} }
				,{ materialIndex : 2, fabricJson : { objects : [], background : "#6EB7FF"} }
				,{ materialIndex : 3, fabricJson : { objects : [], background : "#6EB7FF" } }
			]
		}
		,{ 
			type : 'leaflets'
			, id: 1
			, size : { x : 99, y : 210, z : 0 } 
			, geometry : 'VerticallyCFoldedDLLeaflet'
			, fabrics : [
				{ materialIndex : 0, fabricJson : { objects : [], background : "#BBDDFF"} }
				,{ materialIndex : 1, fabricJson : { objects : [], background : "#BBDDFF"} }
				,{ materialIndex : 2, fabricJson : { objects : [], background : "#BBDDFF"} }
				,{ materialIndex : 3, fabricJson : { objects : [], background : "#BBDDFF" } }
				,{ materialIndex : 4, fabricJson : { objects : [], background : "#6EB7FF"} }
				,{ materialIndex : 5, fabricJson : { objects : [], background : "#6EB7FF" } }
			]
		}
		,{ 
			type : 'leaflets'
			, id: 2
			, size : { x : 99, y : 210, z : 0 } 
			, geometry : 'VerticallyZFoldedDLLeaflet'
			, fabrics : [
				{ materialIndex : 0, fabricJson : { objects : [], background : "#BBDDFF"} }
				,{ materialIndex : 1, fabricJson : { objects : [], background : "#BBDDFF"} }
				,{ materialIndex : 2, fabricJson : { objects : [], background : "#6EB7FF"} }
				,{ materialIndex : 3, fabricJson : { objects : [], background : "#6EB7FF" } }
				,{ materialIndex : 4, fabricJson : { objects : [], background : "#BBDDFF"} }
				,{ materialIndex : 5, fabricJson : { objects : [], background : "#BBDDFF" } }
			]
		}
	];
	
	Service.fetchModel = function(minModel) {
		var i;
		for (i=0;i<Service.models.length;i++) {
			var model = Service.models[i];
			if ((model.id == minModel.id) && (model.type === minModel.type) ) {
				var clonedModel = {};
				angular.copy(model, clonedModel);
				clonedModel.geometry = new WHALE[clonedModel.geometry](clonedModel.size.x,clonedModel.size.y,clonedModel.size.z);
				// instantiate canvases
				var f;
				for (f=0;f<clonedModel.fabrics.length;f++) {
					var faceFabric = clonedModel.fabrics[f];
					var canvas = document.createElement('canvas');
					var name = "model_side_" + faceFabric.materialIndex;
					canvas.id = name;
					var size = clonedModel.geometry.getMaterialSize();
					canvas.width = size.x;
					canvas.height = size.y;
					//console.log("canvas",canvas);
					faceFabric['canvas'] = new fabric.Canvas(canvas.id);
					faceFabric.canvas.setWidth(size.x);
					faceFabric.canvas.setHeight(size.y);
				}
				return clonedModel;
			}
		}
		return null;
	}
	return Service;

}]);
