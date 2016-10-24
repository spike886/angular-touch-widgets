angular.module('angularTouchWidgets.directives.timerEditor', [])

    .directive('timerEditor', function () {
        return {
            restrict: "E",
            scope: { time: '=', canBeZero: '=?' },
            template:'<div style="margin: auto; height: 250px; width: 350px;" on-drag-start="onDrag($event)" on-touch="onTouch($event)" on-drag-end="onRelease()" on-drag="drag($event)">\
                    <svg id="clock-editor" height="250" width="350">\
                        <defs>\
                            <filter id="shadow-{{$id}}" x="-200%" y="-200%" width="450%" height="450%">\
                                <feOffset result="offOut" in="SourceGraphic" dx="0" dy="2"></feOffset>\
                                <feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0.4 0 0 0 0 0 0.4 0 0 0 0 0 0.4 0 0 0 0 0 1 0"></feColorMatrix>\
                                <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2"></feGaussianBlur>\
                                <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>\
                            </filter>\
                        </defs>\
                        <g>\
                            <circle cx="175" cy="125" r="100" fill="white"></circle>\
                            <path fill="#eee" d="M 175 25 A 100 100 0 0 1 225 38L 175 125"></path>\
                            <path fill="#eee" d="M 261 75 A 100 100 0 0 1 275 125L 175 125"></path>\
                            <path fill="#eee" d="M 261 175 A 100 100 0 0 1 225 211L 175 125"></path>\
                            <path fill="#eee" d="M 175 225 A 100 100 0 0 1 125 211L 175 125"></path>\
                            <path fill="#eee" d="M 88 175 A 100 100 0 0 1 75 125L 175 125"></path>\
                            <path fill="#eee" d="M 88 74 A 100 100 0 0 1 124 38L 175 125"></path>\
                        </g>\
                        <path class="content-selection" ng-attr-d="{{ semiCircle }}" filter="url(#shadow-{{$id}})"></path>\
                        <circle id="test" cx="175" cy="125" r="100" stroke="black" fill="transparent" stroke-width="6" filter="url(#shadow-{{$id}})"></circle>\
                        <g fill="#555">\
                            <text x="167" y="47">\
                                0\
                            </text>\
                            <text x="210" y="57">\
                                5\
                            </text>\
                            <text x="242" y="88">\
                                10\
                            </text>\
                            <text x="252" y="129">\
                                15\
                            </text>\
                            <text x="241" y="171">\
                                20\
                            </text>\
                            <text x="210" y="203">\
                                25\
                            </text>\
                            <text x="168" y="215">\
                                30\
                            </text>\
                            <text x="128" y="203">\
                                35\
                            </text>\
                            <text x="96" y="171">\
                                40\
                            </text>\
                            <text x="85" y="129">\
                                45\
                            </text>\
                            <text x="95" y="88">\
                                50\
                            </text>\
                            <text x="125" y="57">\
                                55\
                            </text>\
                        </g>\
                    </svg>\
                </div>',
            controller: function($scope, $ionicScrollDelegate){
                if($scope.canBeZero===undefined){
                    $scope.canBeZero=true;
                }
                var touching=false;

                var drawRange = function(){
                    var angle=-90+($scope.time*6);
                    $scope.semiCircle = regularSemiCircle(175,125,100,-90,angle,false);
                };

                var calculeTime = function(event){
                    var touch={x: event.gesture.touches[0].clientX, y: event.gesture.touches[0].clientY};
                    var offset = event.currentTarget.getBoundingClientRect();

                    var centerPos={x: 175 + offset.left, y: 125 + offset.top};

                    var angle=getAngle(centerPos.x, centerPos.y, touch.x, touch.y);
                    $scope.time = parseInt((angle+20) / 30) * 5;
                    if(!$scope.canBeZero && $scope.time==0){
                        $scope.time = 5;
                    }
                };

                $scope.onClick = function(event){
                    calculeTime(event);
                };

                $scope.onDrag = function(event){
                    touching=true;
                    $ionicScrollDelegate.freezeAllScrolls(true);
                    calculeTime(event);
                };

                $scope.onTouch = function(event){
                    calculeTime(event);
                };

                $scope.onRelease = function(){
                    touching=false;
                    $ionicScrollDelegate.freezeAllScrolls(false);
                };

                $scope.drag = function(event){
                    if(touching){
                        calculeTime(event);
                    }
                };

                $scope.$watch('time',function(){
                    drawRange();
                });

                drawRange();

            }
        };
    });
