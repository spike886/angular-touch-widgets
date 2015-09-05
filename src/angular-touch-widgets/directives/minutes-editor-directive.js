angular.module('angularTouchWidgets.directives.minutesEditor', [])

    .directive('minutesEditor', function () {
        return {
            restrict: "E",
            scope: { time: '=', onClick: '&' },
            replace: true,
            template:'<div>\
                    <svg class="clock-editor" height="200" width="240" ng-click="onClick()">\
                        <defs>\
                            <filter id="shadow-{{$id}}" x="-200%" y="-200%" width="450%" height="450%">\
                                <feOffset result="offOut" in="SourceGraphic" dx="0" dy="2"></feOffset>\
                                <feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0.4 0 0 0 0 0 0.4 0 0 0 0 0 0.4 0 0 0 0 0 1 0"></feColorMatrix>\
                                <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2"></feGaussianBlur>\
                                <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>\
                            </filter>\
                        </defs>\
                        <g filter="url(#shadow-{{$id}})">\
                            <circle id="test" cx="115" cy="100" r="70" fill="white"></circle>\
                            <path class="content-selection" ng-attr-d="{{ semiCircle }}"></path>\
                            <circle id="test" cx="115" cy="100" r="65" stroke="white" fill="transparent" stroke-width="8"></circle>\
                            <circle id="test" cx="115" cy="100" r="70" stroke="black" fill="transparent" stroke-width="6"></circle>\
                        </g>\
                    </svg>\
                </div>',
            controller: function($scope){
                var drawRange = function(){
                    var angle=-90+($scope.time*6);
                    $scope.semiCircle = regularSemiCircle(115,100,70,-90,angle,false);
                };

                drawRange();

                $scope.$watch('time',function(){
                    drawRange();
                });
            }
        };
    });
