var module = angular.module('cards.directives.Thumbnail', []);

module.directive('thumbnail', [function () {
	return {
		restrict:'E'
		,scope: {
		  item: '=item'
		  ,itemClick: '&itemClick'
		}
		,replace: true
		,link: function(scope){
				var tpl = "templates/thumbnail.default.html";
				if (scope.item.type != undefined && scope.item.type !== 'none') { 
					tpl = "templates/thumbnail." + scope.item.type + ".html";
				}
				scope.theTemplate = tpl;
		}
		,template: "<div ng-include='theTemplate'></div>"
	};
}])