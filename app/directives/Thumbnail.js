angular.module('cards.directives.Thumbnail', [])
.directive('thumbnail', [function () {
	return {
		restrict:'E'
		,scope: {
		  item: '=item'
		  ,itemClick: '&itemClick'
		}
		,replace: true
		,template: '<ng-include src="getTemplateUrl()"/>'
		,controller: function($scope) {
			$scope.getTemplateUrl = function() {
				if ($scope.item.type == "businessCards") { return "businessCards.thumbnail.tpl"; }
				if ($scope.item.type != "none") { return "standard.thumbnail.tpl"; }
			}
		}
	};
}])