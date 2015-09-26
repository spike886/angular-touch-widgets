angular.module('angularTouchWidgets.directives.clockViewer', [])

  .directive('clockViewer', function () {
    return {
      restrict: "E",
      scope: { from: '=', to: '=', onClick: '&' },
      replace: true,
      template:'<div>\
                    <svg class="clock-viewer" height="200" width="240" on-tap="onClick()">\
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
                        <text ng-attr-x="{{fromPos.x-20}}" ng-attr-y="{{fromPos.y+7}}" font-size="14">\
                                {{ from }}\
                        </text>\
                        <text ng-attr-x="{{toPos.x-20}}" ng-attr-y="{{toPos.y+7}}" font-size="14">\
                            {{ to }}\
                        </text>\
                    </svg>\
                </div>',
      controller: function($scope){

        var drawRange = function(){
          var parsedFrom = parseTime($scope.from);
          var parsedTo = parseTime($scope.to);
          var fromAngle=-90+(parsedFrom.hours*30+parsedFrom.minutes*0.5);
          var toAngle=-90+(parsedTo.hours*30+parsedTo.minutes*0.5);
          $scope.semiCircle = regularSemiCircle(115,100,70,fromAngle,toAngle,false);
          $scope.fromPos = positionOnCircle(115,100,70,fromAngle,24,14);
          $scope.toPos = positionOnCircle(115,100,70,toAngle,24,14);
        };

        drawRange();

        $scope.$watch('from',function(){
          drawRange();
        });

        $scope.$watch('to',function(){
          drawRange();
        });

      }
    };
  });

function parseTime(time){
  var r = time.split(":");
  return {hours: parseInt(r[0]), minutes: parseInt(r[1])};
}
