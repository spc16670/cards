angular.module('cards.directives.Slideable', [])
.directive('slideable', [function () {
    return {
        restrict:'C',
		//transclude : true,
        compile: function (element, attr) {
            // wrap tag
			console.log("compiling slideable...");
            var contents = element.html();
            element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' 
			//+ '<ng-transclude>'
			+ contents 
			//+ '</ng-transclude>'
			+ '</div>');

            return function postLink(scope, element, attrs) {
                // default properties
                attrs.duration = (!attrs.duration) ? '0.5s' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                element.css({
                    'overflow': 'hidden',
                    'height': '0px',
                    'transitionProperty': 'height',
                    'transitionDuration': attrs.duration,
                    'transitionTimingFunction': attrs.easing
                });
            };
        }
    };
}])