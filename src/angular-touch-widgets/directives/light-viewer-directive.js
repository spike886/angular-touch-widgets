angular.module('angularTouchWidgets.directives.lightViewer', [])

    .directive('lightViewer', function () {
        return {
            restrict: "E",
            replace: true,
            scope: { on: '=', mode: '=', canTurnOff: '=', isRgb: '=', onTab: '&', modeStatic: '=', modeAnimated: '=' },
            template:'  <div class="light-viewer" style="position: relative; height: 260px; width: 240px;">\
                            <svg class="fx-zoom-normal" height="260" width="240" style="position: absolute;" ng-show="(on || !canTurnOff)">\
                                <defs>\
                                    <filter id="shadow-{{$id}}" x="-200%" y="-200%" width="450%" height="450%">\
                                        <feOffset result="offOut" in="SourceGraphic" dx="0" dy="2"></feOffset>\
                                        <feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0.4 0 0 0 0 0 0.4 0 0 0 0 0 0.4 0 0 0 0 0 1 0"></feColorMatrix>\
                                        <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2"></feGaussianBlur>\
                                        <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>\
                                    </filter>\
                                </defs>\
                                <path fill="transparent" stroke-linecap="round" stroke="white" stroke-width="20" d="M 47 195 A 105 105 0 1 1 182 195" filter="url(#shadow-{{$id}})" stroke on-tap="onClick()"></path>\
                                <path fill="transparent" stroke-linecap="round" stroke="#ccc" stroke-width="2" d="M 47 195 A 105 105 0 1 1 182 195" on-tap="onClick()"></path>\
                                <path class="line-selection" fill="transparent" stroke-linecap="round" stroke-width="6" ng-attr-d="{{ arc }}" on-tap="onClick()"></path>\
                            </svg>\
                            <svg class="show-hide-opacity ng-hide" ng-show="canTurnOff" height="260" width="240" style="position: absolute;">\
                                <defs>\
                                    <filter id="button-shadow-{{$id}}" x="-200%" y="-200%" width="450%" height="450%">\
                                        <feOffset result="offOut" in="SourceGraphic" dx="1" dy="4"></feOffset>\
                                        <feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0.4 0 0 0 0 0 0.4 0 0 0 0 0 0.4 0 0 0 0 0 1 0"></feColorMatrix>\
                                        <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2"></feGaussianBlur>\
                                        <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>\
                                    </filter>\
                                </defs>\
                                \
                                <g on-tap="toggle()">\
                                    <path class="show-hide-opacity button-on-svg" ng-hide="on" fill="transparent" stroke-width="40" d="M 166 204 A 103 103 0 0 1 63 204" filter="url(#button-shadow-{{$id}})"></path>\
                                    <path class="show-hide-opacity button-off-svg" ng-show="on" fill="transparent" stroke-width="40" d="M 166 204 A 103 103 0 0 1 63 204" filter="url(#button-shadow-{{$id}})"></path>\
                                </g>\
                            </svg>\
                            <div style="height: 0; position: absolute; top: 41px; left: 39px;">\
                                <div class="fx-rotate-clock round-button center override button-shadow ng-hide" ng-show="isRgb && (on || !canTurnOff) && mode===\'static\'" ng-style="{\'background-color\': \'rgb(\'+modeStatic.color.r+\',\'+modeStatic.color.g+\',\'+modeStatic.color.b+\')\'}" on-tap="onClick()">\
                                </div>\
                                <div class="fx-rotate-clock round-button center override button-shadow ng-hide" ng-show="isRgb && (on || !canTurnOff) && mode===\'animation\'" style="overflow: hidden;">\
                                    <div class="animated-color" style="height: 100%; width: 100%;" ng-style="{\'-webkit-animation-duration\': modeAnimated.speed+\'s\', \'animation-duration\': modeAnimated.speed+\'s\', \'-webkit-animation-name\': modeAnimated.animation, \'animation-name\': modeAnimated.animation}" on-tap="onClick()"></div>\
                                </div>\
                                <div class="fx-rotate-clock round-button center override button-on button-shadow ng-hide" ng-show="!isRgb && (on || !canTurnOff)" style="height: 150px; width: 150px;" on-tap="onClick()">\
                                    <span style="font-size: 42px;">{{ modeStatic.intensity }}%</span>\
                                </div>\
                                <div class="fx-rotate-clock round-button center override button-off button-shadow ng-hide" ng-show="!(on || !canTurnOff)" on-tap="toggle()">\
                                    <span style="font-size: 34px; color: white;">Apagado</span>\
                                </div>\
                            </div>\
                            <div class="center show-hide-opacity" ng-show="canTurnOff" style="position: absolute; top: 197px; left: 65px; height: 40px; width: 100px;" on-tap="toggle()">\
                                <i class="icon ion-power" style="color: white; font-size: 26px;"></i>\
                            </div>\
                        </div>',
            controller: function($scope){
                if($scope.on===undefined){
                    $scope.on=true;
                }
                if($scope.canTurnOff===undefined){
                    $scope.canTurnOff=true;
                }
                if($scope.isRgb===undefined){
                    $scope.isRgb=true;
                }
                $scope.mode = $scope.mode || 'static';
                $scope.modeStatic = $scope.modeStatic || {color: {r: 0, g: 0, b: 0}, intensity: 0};
                $scope.modeAnimated = $scope.modeAnimated || {animation: "mode1", speed: 1};

                var drawRange = function(){
                    if(!$scope.isRgb || $scope.mode==='static'){
                        $scope.arc = regularArcData(115,115,105,130,135+($scope.modeStatic.intensity * 2.75),false);
                    }else{
                        $scope.arc = regularArcData(115,115,105,130,135+($scope.modeAnimated.speed * 27.5),false);
                    }
                };

                drawRange();

                $scope.$watch('modeStatic.intensity',function(){
                    drawRange();
                });

                $scope.$watch('modeAnimated.speed',function(){
                    drawRange();
                });

                $scope.$watch('mode',function(){
                    drawRange();
                });

                $scope.toggle = function(){
                    $scope.on= !$scope.on
                };


            }
        };
    });
