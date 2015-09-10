angular.module('angularTouchWidgets.directives.lightIntensityEditor', [])

  .directive('lightIntensityEditor', function () {
    return {
      restrict: "E",
      replace: true,
      scope: { intensity: '=' },
      template:'<div class="range range-positive" style="width: 100%">\
                    <i class="icon ion-ios-sunny-outline"></i>\
                    <input type="range" name="volume" min="0" max="100" ng-model="intensity">\
                    <i class="icon ion-ios-sunny"></i>\
                </div>'
    };
  });
