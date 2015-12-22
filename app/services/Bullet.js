var module = angular.module('cards.services.Bullet',[]);

module.service('BulletService', ['DisplayService','CommonService','$q','$timeout','$rootScope'
  ,function (DisplayService,CommonService,$q,$timeout,$rootScope) {

	var Service = {
 		url : CommonService.BULLET.URL 
		, timeout : CommonService.BULLET.TIMEOUT
		, connected : false
		, promise: null
		, qid : 0
		, queue : {}
		, options : { 
			disableEventSource: true
			, disableXHRPolling : true
			, disableWebSocket : false
		}
	};


  	var Bullet = $.bullet(Service.url, Service.options);

	Bullet.onopen = function(){
		Service.connected = true;
		for (var qid in Service.queue) {
			if ( Service.queue.hasOwnProperty(qid)) {
				if (!Service.queue[qid].fired) {
					fireBullet(Service.queue[qid].req);
				}
			}
		}
  	}

	Bullet.onclose = Bullet.ondisconnect = function(){
    		Service.connected = false;
  	};

  	Bullet.onmessage = function(e){
    	if (e.data != 'pong'){
      		var json = $.parseJSON(e.data);
	      	if (json.hasOwnProperty('header')) { 
				json.header.result = "ok";
        			if (json.header.type === "news") {
          				console.log('NEWS RECEIVED' + json)
        			}
				listener(json);
			} else {
				console.log("INVALID",json);
			}
    	}
  	};
  

	function fireBullet(req) {
		Service.queue[req.header.qid].fired = true;
		Service.promise = Service.queue[req.header.qid].cb; 
		Bullet.send(JSON.stringify(req));
	}

	function listener(resp) {
		if(Service.queue.hasOwnProperty(resp.header.qid)) {
			var callback = Service.queue[resp.header.qid];
			$timeout.cancel(callback.timeoutPromise);
			$rootScope.$apply(callback.cb.resolve(resp));
			delete Service.queue[resp.header.qid];
		}
	}

	function getQid() {
		Service.qid += 1;
		if(Service.qid > 10000) {
			Service.qid = 0;
		}
    		return Service.qid;
	}

	/*
 	*  @param reg must have a header with some metadata
 	*/
	Service.fire = function(request) {
		var req = {};
		angular.copy(request,req);
		var defer = $q.defer();
		var qid = getQid();

		req.header.qid = qid;

		var timeoutPromise = $timeout(function(){
			var timedout = { header : { qid : qid }};
			timedout.header.result = "timeout";
			timedout.header.msg = "A timeout occurred";
			console.log("REQ TIMED OUT",timedout)
			listener(timedout);
    		},Service.timeout);

		Service.queue[qid] = {
			time: new Date()
			,cb: defer
			,timeoutPromise: timeoutPromise
			,req : req
			,fired : false
   		};

		if (Service.connected) {
			fireBullet(req);
		}
    		return defer.promise;
  	}

	//=====================================================================


	

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
