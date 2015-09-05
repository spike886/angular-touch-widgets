angular.module('angularTouchWidgets.directives.onOffButton', [])

    .directive('onOffButton', function () {
        return {
            restrict: "E",
            replace: true,
            scope: { value: '=' },
            template:'  <div>\
                            <div class="on-off-button">\
                                <svg height="260" width="230">\
                                    <defs>\
                                        <filter id="button-shadow-{{$id}}" x="-200%" y="-200%" width="450%" height="450%">\
                                            <feOffset result="offOut" in="SourceGraphic" dx="1" dy="4"></feOffset>\
                                            <feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0.4 0 0 0 0 0 0.4 0 0 0 0 0 0.4 0 0 0 0 0 1 0"></feColorMatrix>\
                                            <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2"></feGaussianBlur>\
                                            <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>\
                                        </filter>\
                                    </defs>\
                                    <g ng-click="toggle()">\
                                        <path class="show-hide-opacity button-on-svg" ng-hide="value" fill="transparent" stroke-width="40" d="M 166 204 A 103 103 0 0 1 63 204" filter="url(#button-shadow-{{$id}})"></path>\
                                        <path class="show-hide-opacity button-off-svg" ng-show="value" fill="transparent" stroke-width="40" d="M 166 204 A 103 103 0 0 1 63 204" filter="url(#button-shadow-{{$id}})"></path>\
                                    </g>\
                                </svg>\
                                <div class="center" style="position: absolute; top: 197px; left: 65px; height: 40px; width: 100px;" ng-click="toggle()">\
                                    <i class="icon ion-power" style="color: white; font-size: 26px;"></i>\
                                </div>\
                                <div style="position: absolute; top: 41px; left: 39px;">\
                                    <div class="fx-rotate-clock round-button center override button-off button-shadow" ng-hide="value" ng-click="toggle()">\
                                        <span style="font-size: 34px; color: white;">Apagado</span>\
                                    </div>\
                                    <div class="fx-rotate-clock round-button center override button-on button-shadow" ng-show="value" ng-click="toggle()">\
                                        <span style="font-size: 30px;">Encendido</span>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>',
            controller: function($scope){
                $scope.toggle = function(){
                    $scope.value = !$scope.value;
                };
            }
        };
    });
