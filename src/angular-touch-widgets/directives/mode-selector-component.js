angular.module('angularTouchWidgets.directives.modeSelector', [])

    .component('modeSelector', {
        bindings: { modes: '=', selectedMode: '=', onChange: '&' },
        template:`
        <div  ng-if="$ctrl.selectedMode">
            <div class="mode-selector" ng-class="$ctrl.selectedMode" style="height: 26px; width: 250px; float: right; margin: 10px 10px 10px 0" on-tap="$ctrl.changeMode()">
                <div style="height: 100%; width: 100%; transform: translate(112px); -webkit-transform: translate(112px)">
                    <div on-tap="$ctrl.changeMode()" class="button-shadow" style="overflow: hidden; position: absolute; width: 40px;height: 40px; border-radius: 20px; transform: translate(125px); -webkit-transform: translate(125px); margin-left: -17px; margin-top: -6px;">
                        <div class="mode-selector-botton background-animation" style="height: 100%; width: 100%;"></div>
                    </div>
                    <div class="transform-animation" style="height: 100%; width: 100%; position: absolute; top: 0; left: 0;" ng-style="{transform: \'rotate(\'+ $ctrl.showMode * (-360 / $ctrl.modes.length)+\'deg)\', \'-webkit-transform\': \'rotate(\'+ $ctrl.showMode * (-360 / $ctrl.modes.length)+\'deg)\'}">
                        <div ng-repeat="mode in $ctrl.modes" class="show-hide-opacity" ng-style="{transform: \'rotate(\'+ $index * (360 / $ctrl.modes.length) +\'deg) translate(-125px)\', \'-webkit-transform\': \'rotate(\'+ $index * (360 / $ctrl.modes.length) +\'deg) translate(-125px)\'}" style="width: 250px; height: 26px; text-align: end; position: absolute;" ng-show="$ctrl.currentMode==$index">
                            <span style="margin-right: 20px">
                                {{ mode.display }}
                            </span>
                            <i class="{{ mode.icon }}" style="margin-right: -15px; font-size: 30px; vertical-align: middle;"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>`,
        controller: class {

            $onInit() {
                this.showMode = this.currentMode = this.getNumberOfMode(this.selectedMode);
                this.selectedMode = this.modes[this.currentMode].name;
            }

            getNumberOfMode(selectedMode) {
                var modesNames = [];
                angular.forEach(this.modes, function(mode) {
                    modesNames.push(mode.name);
                });
                var index = modesNames.indexOf(selectedMode);
                if(index == -1){
                    index=0;
                }
                return index;
            }

            changeMode() {
                this.showMode = this.showMode + 1;
                this.currentMode = this.showMode % this.modes.length;
                this.selectedMode = this.modes[this.currentMode].name;
                this.onChange({selectedMode: this.selectedMode});
            }
        }
    });
