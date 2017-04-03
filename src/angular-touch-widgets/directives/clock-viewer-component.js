angular.module('angularTouchWidgets.directives.clockViewer', [])

    .component('clockViewer', {
        bindings: { from: '<', to: '<', onTap: '&' },
        template:`
        <div>
            <svg class="clock-viewer" height="200" width="240" on-tap="$ctrl.onTap()">
                <defs>
                    <filter id="shadow-{{$id}}" x="-200%" y="-200%" width="450%" height="450%">
                        <feOffset result="offOut" in="SourceGraphic" dx="0" dy="2"></feOffset>
                        <feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0.4 0 0 0 0 0 0.4 0 0 0 0 0 0.4 0 0 0 0 0 1 0"></feColorMatrix>
                        <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2"></feGaussianBlur>
                        <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>
                    </filter>
                </defs>
                <g filter="url(#shadow-{{$id}})">
                    <circle id="test" cx="115" cy="100" r="70" fill="white"></circle>
                    <path class="content-selection" ng-attr-d="{{ $ctrl.semiCircle }}"></path>
                    <circle id="test" cx="115" cy="100" r="65" stroke="white" fill="transparent" stroke-width="8"></circle>
                    <circle id="test" cx="115" cy="100" r="70" stroke="black" fill="transparent" stroke-width="6"></circle>
                </g>
                <text ng-attr-x="{{$ctrl.fromPos.x-20}}" ng-attr-y="{{$ctrl.fromPos.y+7}}" font-size="14">
                        {{ $ctrl.from }}
                </text>
                <text ng-attr-x="{{$ctrl.toPos.x-20}}" ng-attr-y="{{$ctrl.toPos.y+7}}" font-size="14">
                    {{ $ctrl.to }}
                </text>
            </svg>
        </div>`,
        controller: class {
            $onInit(){
                this.drawRange();
            }

            $onChanges() {
                this.drawRange();
            }

            drawRange() {
                if(this.from && this.to){
                    var parsedFrom = parseTime(this.from);
                    var parsedTo = parseTime(this.to);
                    var fromAngle=-90+(parsedFrom.hours*30+parsedFrom.minutes*0.5);
                    var toAngle=-90+(parsedTo.hours*30+parsedTo.minutes*0.5);
                    this.semiCircle = regularSemiCircle(115,100,70,fromAngle,toAngle,false);
                    this.fromPos = positionOnCircle(115,100,70,fromAngle,24,14);
                    this.toPos = positionOnCircle(115,100,70,toAngle,24,14);
                }
            }

        }
    });

function parseTime(time){
    var r = time.split(":");
    return {hours: parseInt(r[0]), minutes: parseInt(r[1])};
}
