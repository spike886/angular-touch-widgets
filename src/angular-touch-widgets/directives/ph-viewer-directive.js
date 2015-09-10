angular.module('angularTouchWidgets.directives.phViewer', [])

  .directive('phViewer', function () {
    return {
      restrict: "E",
      scope: { ph: '=' },
      replace: true,
      template:'<div class="meter">\
                    <svg height="320" width="120" style="margin-left: 20px;">\
                        <defs>\
                            <clipPath id="phClipPath" clipPathUnits="userSpaceOnUse">\
                                <rect width="32" height="300" ry="16" y="10" x="30" stroke="black" fill="transparent" stroke-width="6"></rect>\
                            </clipPath>\
                            <clipPath id="phClipPath2" clipPathUnits="userSpaceOnUse">\
                                <rect width="20" height="60" y="130" x="0"></rect>\
                                <rect width="20" height="60" y="130" x="72"></rect>\
                            </clipPath>\
                            <filter id="shadow-{{$id}}" x="-200%" y="-200%" width="450%" height="450%">\
                                <feOffset result="offOut" in="SourceGraphic" dx="0" dy="2"></feOffset>\
                                <feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0.4 0 0 0 0 0 0.4 0 0 0 0 0 0.4 0 0 0 0 0 1 0"></feColorMatrix>\
                                <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2"></feGaussianBlur>\
                                <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>\
                            </filter>\
                        </defs>\
                        <g filter="url(#shadow-{{$id}})">\
                            <rect width="82" height="50" y="135" x="5" fill="transparent" stroke="#0F0" stroke-width="4" clip-path="url(#phClipPath2)"></rect>\
                            <g clip-path="url(#phClipPath)">\
                                <rect width="32" height="20" y="10" x="30" fill="#CE231C"></rect>\
                                <rect width="32" height="20" y="30" x="30" fill="#E1332C"></rect>\
                                <rect width="32" height="20" y="50" x="30" fill="#EC672E"></rect>\
                                <rect width="32" height="20" y="70" x="30" fill="#F3912C"></rect>\
                                <rect width="32" height="20" y="90" x="30" fill="#F4AE2A"></rect>\
                                <rect width="32" height="20" y="110" x="30" fill="#F1E81F"></rect>\
                                <rect width="32" height="20" y="130" x="30" fill="#D6D52D"></rect>\
                                <rect width="32" height="20" y="150" x="30" fill="#84BB3B"></rect>\
                                <rect width="32" height="20" y="170" x="30" fill="#29A340"></rect>\
                                <rect width="32" height="20" y="190" x="30" fill="#119147"></rect>\
                                <rect width="32" height="20" y="210" x="30" fill="#1E8073"></rect>\
                                <rect width="32" height="20" y="230" x="30" fill="#3B5F9D"></rect>\
                                <rect width="32" height="20" y="250" x="30" fill="#384579"></rect>\
                                <rect width="32" height="20" y="270" x="30" fill="#3F2B6A"></rect>\
                                <rect width="32" height="20" y="290" x="30" fill="#342550"></rect>\
                            </g>\
                            <rect width="32" height="300" ry="16" y="10" x="30" stroke="black" fill="transparent" stroke-width="6"></rect>\
                        </g>\
                        <g ng-attr-transform="translate(28,{{posY}})" filter="url(#shadow-{{$id}})">\
                            <path transform="translate(0,-13)" fill="#f00" stroke="#000" stroke-width="2" d="M84.3022,22.3106 C84.2473,33.4926 75.1392,42.5115 63.9571,42.4565 C59.157,42.4329 54.5029,41.0224 51.298,37.9296 C45.0185,31.87 35.0221,25.6927 8.0808,24.1617 C7.10067,24.106 5.02515,23.916 5.049,22.0121 C5.07283,20.1095 7.13818,19.8874 8.11693,19.8378 C35.0725,18.4714 45.3311,12.386 51.4531,6.36783 C54.6291,3.24565 59.3557,1.94202 64.1562,1.96561 C75.338,2.02058 84.3572,11.1316 84.3022,22.3106 Z"></path>\
                            <text x="45" y="16" font-size="22" fill="white">\
                                {{ ph_text }}\
                            </text>\
                        </g>\
                    </svg>\
                </div>',
      controller: function($scope){
          $scope.$watch('ph',function(){
              $scope.posY = ($scope.ph)*(300/15)+10;
              $scope.ph_text = $scope.ph.toFixed(1);
          });
      }
    };
  });
