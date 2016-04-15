angular.module('angularTouchWidgets.directives.clockEditor', [])

  .directive('clockEditor', function () {
    return {
      restrict: "E",
      scope: { from: '=', to: '=' },
      template:'<div style="margin: auto; height: 250px; width: 350px;" on-drag-start="onTouch($event)" on-drag-end="onRelease()" on-drag="drag($event)">\
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
                        <g>\
                            <circle cx="175" cy="125" r="70" fill="white"></circle>\
                            <path fill="#eee" d="M 210 64 A 70 70 0 0 1 235 90L 175 125"></path>\
                            <path fill="#eee" d="M 245 125 A 70 70 0 0 1 235 160L 175 125"></path>\
                            <path fill="#eee" d="M 210 185 A 70 70 0 0 1 175 195L 175 125"></path>\
                            <path fill="#eee" d="M 140 185 A 70 70 0 0 1 114 160L 175 125"></path>\
                            <path fill="#eee" d="M 105 125 A 70 70 0 0 1 114 90L 175 125"></path>\
                            <path fill="#eee" d="M 139 64 A 70 70 0 0 1 175 55L 175 125"></path>\
                        </g>\
                        <path class="content-selection" ng-attr-d="{{ semiCircle }}" filter="url(#shadow-{{$id}})"></path>\
                        <circle id="test" cx="175" cy="125" r="100" stroke="black" fill="transparent" stroke-width="6" filter="url(#shadow-{{$id}})"></circle>\
                        <g fill="#555">\
                            <text x="167" y="47">\
                                00\
                            </text>\
                            <text x="210" y="57">\
                                13\
                            </text>\
                            <text x="242" y="88">\
                                14\
                            </text>\
                            <text x="252" y="129">\
                                15\
                            </text>\
                            <text x="241" y="171">\
                                16\
                            </text>\
                            <text x="210" y="203">\
                                17\
                            </text>\
                            <text x="168" y="215">\
                                18\
                            </text>\
                            <text x="128" y="203">\
                                19\
                            </text>\
                            <text x="96" y="171">\
                                20\
                            </text>\
                            <text x="85" y="129">\
                                21\
                            </text>\
                            <text x="95" y="88">\
                                22\
                            </text>\
                            <text x="125" y="57">\
                                23\
                            </text>\
                        </g>\
                        <g fill="#555">\
                            <text x="168" y="72">\
                                12\
                            </text>\
                            <text x="199" y="80">\
                                1\
                            </text>\
                            <text x="221" y="100">\
                                2\
                            </text>\
                            <text x="228" y="129">\
                                3\
                            </text>\
                            <text x="221" y="159">\
                                4\
                            </text>\
                            <text x="200" y="181">\
                                5\
                            </text>\
                            <text x="171" y="189">\
                                6\
                            </text>\
                            <text x="142" y="181">\
                                7\
                            </text>\
                            <text x="121" y="158">\
                                8\
                            </text>\
                            <text x="112" y="129">\
                                9\
                            </text>\
                            <text x="119" y="101">\
                                10\
                            </text>\
                            <text x="137" y="81">\
                                11\
                            </text>\
                        </g>\
                        <text ng-attr-x="{{fromPos.x-20}}" ng-attr-y="{{fromPos.y+9}}" font-size="20">\
                            {{ from }}\
                        </text>\
                        <text ng-attr-x="{{toPos.x-20}}" ng-attr-y="{{toPos.y+9}}" font-size="20">\
                            {{ to }}\
                        </text>\
                    </svg>\
                </div>',
      controller: function($scope, $ionicScrollDelegate){

        var baseTime;
        var centerPos;
        var lastAngle;
        var lastInverted;
        var touching=false;
        var element;

        var drawRange = function(){
          var parsedFrom = parseTime($scope.from);
          var parsedTo = parseTime($scope.to);
          var fromAngle=-90+(parsedFrom.hours*30+parsedFrom.minutes*0.5);
          var toAngle=-90+(parsedTo.hours*30+parsedTo.minutes*0.5);
          $scope.semiCircle = regularSemiCircle(175,125,100,fromAngle,toAngle,false);
          $scope.fromPos = positionOnCircle(175,125,100,fromAngle,40,14);
          $scope.toPos = positionOnCircle(175,125,100,toAngle,40,14);
        };

        var greaterOrEquialTime = function (time1, time2){
          var parsedTime1=parseTime(time1);
          var parsedTime2=parseTime(time2);
          return (parsedTime1.hours>parsedTime2.hours) || ((parsedTime1.hours==parsedTime2.hours) && (parsedTime1.minutes>=parsedTime2.minutes));
        };

        var greaterTime = function (time1, time2){
          var parsedTime1=parseTime(time1);
          var parsedTime2=parseTime(time2);
          return (parsedTime1.hours>parsedTime2.hours) || ((parsedTime1.hours==parsedTime2.hours) && (parsedTime1.minutes>parsedTime2.minutes));
        };

        $scope.onTouch = function(event){
          touching=true;
          $ionicScrollDelegate.freezeAllScrolls(true);

          var firstTouch={x: event.gesture.touches[0].clientX, y: event.gesture.touches[0].clientY};
          var offset = event.currentTarget.getBoundingClientRect();

          centerPos={x: offset.left + 175, y: offset.top + 125};

          baseTime=getModule(centerPos.x, centerPos.y, firstTouch.x, firstTouch.y)<70 ? 0 : 12;

          lastAngle=getAngle(centerPos.x, centerPos.y, firstTouch.x, firstTouch.y);
          $scope.from= ""+(parseInt(lastAngle/30)+baseTime)+':'+((lastAngle%30)<15 ? '00':'30');
          $scope.to= $scope.from;
          lastInverted=false;
        };

        $scope.onRelease = function(){
          touching=false;
          $ionicScrollDelegate.freezeAllScrolls(false);
        };

        $scope.drag = function(event){
          if(touching){
            var lastTouch={x: event.gesture.touches[0].clientX, y: event.gesture.touches[0].clientY};

            var angle=getAngle(centerPos.x, centerPos.y, lastTouch.x, lastTouch.y);
            if((lastAngle>270 && angle<90) || (angle>270 && lastAngle<90)){
              baseTime = baseTime===0 ? 12 : 0;
            }
            lastAngle = angle;
            var time= ""+(parseInt(lastAngle/30)+baseTime)+':'+((lastAngle%30)<15 ? '00':'30');
            var inverted;
            if(lastInverted){
              inverted = !greaterTime(time,$scope.to);
            }else{
              inverted = !greaterOrEquialTime(time,$scope.from);
            }
            if(inverted){
              $scope.from=time;
            }else{
              $scope.to=time;
            }
            lastInverted = inverted;
          }
        };

        $scope.$watch('from',function(){
          drawRange();
        });

        $scope.$watch('to',function(){
          drawRange();
        });

        drawRange();

      }
    };
  });
