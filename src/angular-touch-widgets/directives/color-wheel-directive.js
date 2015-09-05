angular.module('angularTouchWidgets.directives.colorWheel', [])

  .directive('colorWheel', function ($animate) {
    return {
      restrict: "E",
      replace: true,
      scope: { color: '=', img: '@' },
      template:'<div style="height: 300px; width: 300px; margin: auto; position: relative;">\
                    <canvas var="1" width="300" height="300" ng-click="colorClick($event)"></canvas>\
                    <div ng-style="{\'background-color\': \'rgb(\'+color.r+\',\'+color.g+\',\'+color.b+\')\'}" style="position: absolute; top: 120px; left: 120px; height: 60px; width: 60px; border-radius: 50%; box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.46); transition: background 0.1s; -webkit-transition: background 0.1s"></div>\
                </div>',
      link: function (scope, element) {
        var ctx = element.children()[0].getContext('2d');
        var selection = angular.element(element.children()[1]);

        var image = new Image();
        image.onload = function () {
          ctx.drawImage(image, 0, 0, 300, 300); // draw the image on the canvas
        };

        image.src = scope.img || 'img/color-wheel.png';

        var animateClick = function(){
          $animate.addClass(selection, 'pulse animated-quick').then(function () {
            selection.removeClass('pulse animated-quick');
          });
        };

        scope.colorClick = function(e){
          var pixel = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;

          if (pixel[3] !== 0) {
            angular.copy({r: pixel[0], g: pixel[1], b: pixel[2]}, scope.color);
            animateClick();
          }
        };

      }
    };
  });
