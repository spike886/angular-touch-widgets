angular.module('angularTouchWidgets.directives.thermometerEditor', [])

    .directive('thermometerEditor', function () {
        return {
            restrict: "E",
            scope: { actualTemp: '=', setTemp: '=', showActual: '=', minTemp: '@', maxTemp: '@' },
            replace: true,
            template:'  <svg width="170" height="300" on-tap="onTap($event)" on-drag-start="onTouch($event)" on-drag-end="onRelease()" on-drag="drag($event)">\
                            <defs>\
                                <clipPath id="thermometerClipPath" clipPathUnits="userSpaceOnUse">\
                                    <path d="M54.933,7.69623 C40.936,7.69623 29.639,19.1202 29.639,33.3322 L29.639,183.306 C29.639,183.352 29.638,183.396 29.639,183.443 C16.057,192.031 7,207.31 7,224.752 C7,251.623 28.466,273.417 54.933,273.417 C81.4,273.417 102.867,251.623 102.867,224.752 C102.867,207.296 93.783,192.028 80.183,183.443 C80.183,183.396 80.183,183.352 80.183,183.306 L80.183,33.3322 C80.183,19.1202 68.931,7.69623 54.933,7.69623 Z"></path>\
                                </clipPath>\
                                <filter id="shadow-{{$id}}" x="-200%" y="-200%" width="450%" height="450%">\
                                    <feOffset result="offOut" in="SourceGraphic" dx="0" dy="2"></feOffset>\
                                    <feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0.4 0 0 0 0 0 0.4 0 0 0 0 0 0.4 0 0 0 0 0 1 0"></feColorMatrix>\
                                    <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2"></feGaussianBlur>\
                                    <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>\
                                </filter>\
                            </defs>\
                            <g filter="url(#shadow-{{$id}})">\
                                <g clip-path="url(#thermometerClipPath)">\
                                    <rect height="300" width="130" fill="white"></rect>\
                                    <rect class="content-selection" height="300" width="130" ng-attr-y="{{ setTempYPosition }}"></rect>\
                                    <rect class="secondary-content-selection" height="300" width="130" ng-attr-y="{{ actualTempYPosition }}" ng-show="actualTemp"></rect>\
                                    <path fill="none" stroke="white" stroke-width="18" stroke-miterlimit="4" d="M54.933,7.69623 C40.936,7.69623 29.639,19.1202 29.639,33.3322 L29.639,183.306 C29.639,183.352 29.638,183.396 29.639,183.443 C16.057,192.031 7,207.31 7,224.752 C7,251.623 28.466,273.417 54.933,273.417 C81.4,273.417 102.867,251.623 102.867,224.752 C102.867,207.296 93.783,192.028 80.183,183.443 C80.183,183.396 80.183,183.352 80.183,183.306 L80.183,33.3322 C80.183,19.1202 68.931,7.69623 54.933,7.69623 Z"></path>\
                                </g>\
                                <path fill="none" stroke="black" stroke-width="6" stroke-miterlimit="4" d="M54.933,7.69623 C40.936,7.69623 29.639,19.1202 29.639,33.3322 L29.639,183.306 C29.639,183.352 29.638,183.396 29.639,183.443 C16.057,192.031 7,207.31 7,224.752 C7,251.623 28.466,273.417 54.933,273.417 C81.4,273.417 102.867,251.623 102.867,224.752 C102.867,207.296 93.783,192.028 80.183,183.443 C80.183,183.396 80.183,183.352 80.183,183.306 L80.183,33.3322 C80.183,19.1202 68.931,7.69623 54.933,7.69623 Z"></path>\
                            </g>\
                            <text x="110" ng-attr-y="{{ setTempYPosition + 5 }}" font-size="20" ng-hide="actualTemp && (setTemp < actualTemp)">\
                                {{ setTemp }}°C\
                            </text>\
                            <text x="110" ng-attr-y="{{ actualTempYPosition + 5 }}" font-size="20" ng-show="actualTemp">\
                                {{ actualTemp }}°C\
                            </text>\
                        </svg>',
            controller: function($scope, $ionicScrollDelegate){
                if($scope.showActual===undefined){
                    $scope.showActual = $scope.actualTemp !== undefined
                }

                var topPosY;
                var touching=false;

                var minTemp = $scope.minTemp || -20;
                var maxTemp = $scope.maxTemp || 50;
                var height = 260;
                var offsetY = 10;

                var temperatureToPositionY = function(temperature){
                    var YPos = height * (temperature - minTemp) / (maxTemp - minTemp);
                    return height - YPos + offsetY;
                };

                var positionYToTemperature = function(PosY){
                    var temp = Math.round((((height - PosY + offsetY) / height) * (maxTemp - minTemp)) + minTemp);
                    if(temp > maxTemp){
                        temp = maxTemp;
                    }else if(temp < minTemp){
                        temp = minTemp;
                    }
                    return temp;
                };

                $scope.onTap = function(event) {
                    $scope.onTouch(event);
                    $scope.onRelease(event);
                };

                $scope.onTouch = function(event){
                    touching=true;
                    $ionicScrollDelegate.freezeAllScrolls(true);

                    topPosY = event.currentTarget.offsetTop;

                    var posY=event.gesture.srcEvent.layerY-topPosY;
                    if(posY<0){
                        posY += event.gesture.touches[0].clientY;
                    }
                    $scope.setTemp = positionYToTemperature(posY);
                };

                $scope.onRelease = function(){
                    touching=false;
                    $ionicScrollDelegate.freezeAllScrolls(false);
                };

                $scope.drag = function(event){
                    if(touching){
                        var posY=event.gesture.srcEvent.layerY-topPosY;
                        if(posY<0){
                            posY += event.gesture.touches[0].clientY;
                        }
                        $scope.setTemp = positionYToTemperature(posY);
                    }
                };

                var drawYPosition = function(){
                    if($scope.showActual){
                        $scope.actualTempYPosition = temperatureToPositionY($scope.actualTemp);
                    }
                    $scope.setTempYPosition = temperatureToPositionY($scope.setTemp);
                };

                drawYPosition();

                $scope.$watch('actualTemp',function(){
                    drawYPosition();
                });

                $scope.$watch('setTemp',function(){
                    drawYPosition();
                });

            }
        };
    });
