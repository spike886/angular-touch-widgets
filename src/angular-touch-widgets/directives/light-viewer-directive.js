angular.module('angularTouchWidgets.directives.lightViewer', [])

    .component('lightViewer', {
            bindings: { on: '<?', mode: '<?', canTurnOff: '<?', isRgb: '<?', onTab: '&', light: '<?', modeStatic: '<?', modeAnimated: '<?', onChange: '&' },
            template:`  
            <div class="light-viewer" style="position: relative; height: 260px; width: 240px;">
                <svg class="fx-zoom-normal" height="260" width="240" style="position: absolute;" ng-show="($ctrl.on || !$ctrl.canTurnOff)">
                    <defs>
                        <filter id="shadow-{{$id}}" x="-200%" y="-200%" width="450%" height="450%">
                            <feOffset result="offOut" in="SourceGraphic" dx="0" dy="2"></feOffset>
                            <feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0.4 0 0 0 0 0 0.4 0 0 0 0 0 0.4 0 0 0 0 0 1 0"></feColorMatrix>
                            <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2"></feGaussianBlur>
                            <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>
                        </filter>
                    </defs>
                    <path fill="transparent" stroke-linecap="round" stroke="white" stroke-width="20" d="M 47 195 A 105 105 0 1 1 182 195" filter="url(#shadow-{{$id}})" stroke on-tap="$ctrl.onTap()"></path>
                    <path fill="transparent" stroke-linecap="round" stroke="#ccc" stroke-width="2" d="M 47 195 A 105 105 0 1 1 182 195" on-tap="$ctrl.onTap()"></path>
                    <path class="line-selection" fill="transparent" stroke-linecap="round" stroke-width="6" ng-attr-d="{{ $ctrl.arc }}" on-tap="$ctrl.onTap()"></path>
                </svg>
                <svg class="show-hide-opacity ng-hide" ng-show="$ctrl.canTurnOff" height="260" width="240" style="position: absolute;">
                    <defs>
                        <filter id="button-shadow-{{$id}}" x="-200%" y="-200%" width="450%" height="450%">
                            <feOffset result="offOut" in="SourceGraphic" dx="1" dy="4"></feOffset>
                            <feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0.4 0 0 0 0 0 0.4 0 0 0 0 0 0.4 0 0 0 0 0 1 0"></feColorMatrix>
                            <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2"></feGaussianBlur>
                            <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>
                        </filter>
                    </defs>
                    
                    <g on-tap="$ctrl.toggle()">
                        <path class="show-hide-opacity button-on-svg" ng-hide="$ctrl.on" fill="transparent" stroke-width="40" d="M 166 204 A 103 103 0 0 1 63 204" filter="url(#button-shadow-{{$id}})"></path>
                        <path class="show-hide-opacity button-off-svg" ng-show="$ctrl.on" fill="transparent" stroke-width="40" d="M 166 204 A 103 103 0 0 1 63 204" filter="url(#button-shadow-{{$id}})"></path>
                    </g>
                </svg>
                <div style="height: 0; position: absolute; top: 41px; left: 39px;">
                    <div class="fx-rotate-clock round-button center override button-shadow ng-hide" ng-show="$ctrl.isRgb && ($ctrl.on || !$ctrl.canTurnOff) && $ctrl.mode===\'static\'" ng-style="{\'background-color\': \'rgb(\'+$ctrl.modeStatic.color.r+\',\'+$ctrl.modeStatic.color.g+\',\'+$ctrl.modeStatic.color.b+\')\'}" on-tap="$ctrl.onTap()">
                    </div>
                    <div class="fx-rotate-clock round-button center override button-shadow ng-hide" ng-show="$ctrl.isRgb && ($ctrl.on || !$ctrl.canTurnOff) && $ctrl.mode===\'animation\'" style="overflow: hidden;">
                        <div class="animated-color" style="height: 100%; width: 100%;" ng-style="{\'-webkit-animation-duration\': $ctrl.modeAnimated.speed+\'s\', \'animation-duration\': $ctrl.modeAnimated.speed+\'s\', \'-webkit-animation-name\': $ctrl.modeAnimated.animation, \'animation-name\': $ctrl.modeAnimated.animation}" on-tap="$ctrl.onTap()"></div>
                    </div>
                    <div class="fx-rotate-clock round-button center override button-on button-shadow ng-hide" ng-show="!$ctrl.isRgb && ($ctrl.on || !$ctrl.canTurnOff)" style="height: 150px; width: 150px;" on-tap="$ctrl.onTap()">
                        <span style="font-size: 42px;">{{ $ctrl.modeStatic.intensity }}%</span>
                    </div>
                    <div class="fx-rotate-clock round-button center override button-off button-shadow ng-hide" ng-show="!($ctrl.on || !$ctrl.canTurnOff)" on-tap="$ctrl.toggle()">
                        <span style="font-size: 34px; color: white;">Apagado</span>
                    </div>
                </div>
                <div class="center show-hide-opacity" ng-show="$ctrl.canTurnOff" style="position: absolute; top: 197px; left: 65px; height: 40px; width: 100px;" on-tap="$ctrl.toggle()">
                    <i class="icon ion-power" style="color: white; font-size: 26px;"></i>
                </div>
            </div>`,
            controller: class {
                $onInit() {
                    if(this.light){
                        this.modeStatic=this.light;
                    }
                    if(angular.isUndefined(this.on)){
                        this.on=true;
                    }
                    if(angular.isUndefined(this.canTurnOff)){
                        this.canTurnOff=true;
                    }
                    if(angular.isUndefined(this.isRgb)){
                        this.isRgb=true;
                    }
                    this.mode = this.mode || 'static';
                    this.modeStatic = this.modeStatic || {color: {r: 0, g: 0, b: 0}, intensity: 0};
                    this.modeAnimated = this.modeAnimated || {animation: "mode1", speed: 1};
                    this.drawRange();
                }

                $onChanges() {
                    this.drawRange();
                }

                drawRange() {
                    if(!this.isRgb || this.mode==='static'){
                        this.arc = regularArcData(115,115,105,130,135+(this.modeStatic.intensity * 2.75),false);
                    }else{
                        this.arc = regularArcData(115,115,105,130,135+(this.modeAnimated.speed * 27.5),false);
                    }
                };

                toggle() {
                    this.on= !this.on;
                };
            }
        });
