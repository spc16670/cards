var module = angular.module('cards.services.Bullet',[]);

module.service('BulletService', ['CommonService','$q','$timeout','$rootScope'
  ,'$http',function (CommonService,$q,$timeout,$rootScope,$http) {

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
		console.log("req",request);
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
	//
	
	Service.http = function (data) {
		return $http(data);
	}

	return Service;

}]);
