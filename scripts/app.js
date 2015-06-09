/**
 * Created by georginahughes on 08/06/15.
 */
angular.module('carouselApp', []);

angular
    .module('carouselApp')
    .directive('carousel', carousel);

function carousel() {
    return {
        template: '<ul ng-transclude class="carousel"></ul>',
        restrict: 'A',
        scope: true,
        link: link,
        controller: controller,
        transclude: true,
        replace: true
    };

    function link(scope, element, attrs, ctrl, transcludeFn) {
        scope.elementCount = element.children().length;

        //removing and re-adding the child elements bind them to the isolated scope through the transclusion
        transcludeFn(scope, function (clone) {
            element.children().remove();
            element.append(clone);
        });
    }

    function controller($scope, $timeout) {
        var intervalTime = 2000;

        $scope.activeIndex = 0;

        $scope.slideForward = function() {
            var activeIndex = $scope.activeIndex;
            if (activeIndex === ($scope.elementCount - 1)) {
                activeIndex = 0;
            } else {
                activeIndex++;
            }

            $scope.activeIndex = activeIndex;
        };

        function switchSlide() {
            $timeout(function () {
                $scope.slideForward();
                $timeout(switchSlide, intervalTime);
            }, intervalTime);
        }

        // activate auto carousel
        switchSlide();
    }
}