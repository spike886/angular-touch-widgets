angular.module('angularTouchWidgets.directives.clockEditor', [])

    .component('clockEditor', {
        bindings: { from: '<', to: '<', onChange: '&' },
        template:`
        <div style="margin: auto; height: 250px; width: 350px;" on-drag-start="$ctrl.onTouch($event)" on-drag-end="$ctrl.onRelease()" on-drag="$ctrl.drag($event)">
            <svg id="clock-editor" height="250" width="350">
                <defs>
                    <filter id="shadow-{{$id}}" x="-200%" y="-200%" width="450%" height="450%">
                        <feOffset result="offOut" in="SourceGraphic" dx="0" dy="2"></feOffset>
                        <feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0.4 0 0 0 0 0 0.4 0 0 0 0 0 0.4 0 0 0 0 0 1 0"></feColorMatrix>
                        <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2"></feGaussianBlur>
                        <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>
                    </filter>
                </defs>
                <g>
                    <circle cx="175" cy="125" r="100" fill="white"></circle>
                    <path fill="#eee" d="M 175 25 A 100 100 0 0 1 225 38L 175 125"></path>
                    <path fill="#eee" d="M 261 75 A 100 100 0 0 1 275 125L 175 125"></path>
                    <path fill="#eee" d="M 261 175 A 100 100 0 0 1 225 211L 175 125"></path>
                    <path fill="#eee" d="M 175 225 A 100 100 0 0 1 125 211L 175 125"></path>
                    <path fill="#eee" d="M 88 175 A 100 100 0 0 1 75 125L 175 125"></path>
                    <path fill="#eee" d="M 88 74 A 100 100 0 0 1 124 38L 175 125"></path>
                </g>
                <g>
                    <circle cx="175" cy="125" r="70" fill="white"></circle>
                    <path fill="#eee" d="M 210 64 A 70 70 0 0 1 235 90L 175 125"></path>
                    <path fill="#eee" d="M 245 125 A 70 70 0 0 1 235 160L 175 125"></path>
                    <path fill="#eee" d="M 210 185 A 70 70 0 0 1 175 195L 175 125"></path>
                    <path fill="#eee" d="M 140 185 A 70 70 0 0 1 114 160L 175 125"></path>
                    <path fill="#eee" d="M 105 125 A 70 70 0 0 1 114 90L 175 125"></path>
                    <path fill="#eee" d="M 139 64 A 70 70 0 0 1 175 55L 175 125"></path>
                </g>
                <path class="content-selection" ng-attr-d="{{ $ctrl.semiCircle }}" filter="url(#shadow-{{$id}})"></path>
                <circle id="test" cx="175" cy="125" r="100" stroke="black" fill="transparent" stroke-width="6" filter="url(#shadow-{{$id}})"></circle>
                <g fill="#555">
                    <text x="167" y="47">
                        00
                    </text>
                    <text x="210" y="57">
                        13
                    </text>
                    <text x="242" y="88">
                        14
                    </text>
                    <text x="252" y="129">
                        15
                    </text>
                    <text x="241" y="171">
                        16
                    </text>
                    <text x="210" y="203">
                        17
                    </text>
                    <text x="168" y="215">
                        18
                    </text>
                    <text x="128" y="203">
                        19
                    </text>
                    <text x="96" y="171">
                        20
                    </text>
                    <text x="85" y="129">
                        21
                    </text>
                    <text x="95" y="88">
                        22
                    </text>
                    <text x="125" y="57">
                        23
                    </text>
                </g>
                <g fill="#555">
                    <text x="168" y="72">
                        12
                    </text>
                    <text x="199" y="80">
                        1
                    </text>
                    <text x="221" y="100">
                        2
                    </text>
                    <text x="228" y="129">
                        3
                    </text>
                    <text x="221" y="159">
                        4
                    </text>
                    <text x="200" y="181">
                        5
                    </text>
                    <text x="171" y="189">
                        6
                    </text>
                    <text x="142" y="181">
                        7
                    </text>
                    <text x="121" y="158">
                        8
                    </text>
                    <text x="112" y="129">
                        9
                    </text>
                    <text x="119" y="101">
                        10
                    </text>
                    <text x="137" y="81">
                        11
                    </text>
                </g>
                <text ng-attr-x="{{$ctrl.fromPos.x-20}}" ng-attr-y="{{$ctrl.fromPos.y+9}}" font-size="20">
                    {{ $ctrl.from }}
                </text>
                <text ng-attr-x="{{$ctrl.toPos.x-20}}" ng-attr-y="{{$ctrl.toPos.y+9}}" font-size="20">
                    {{ $ctrl.to }}
                </text>
            </svg>
        </div>`,
        controller: class {
            constructor($ionicScrollDelegate){
                this.$ionicScrollDelegate = $ionicScrollDelegate;
            }

            $onChanges() {
                this.drawRange();
            }

            $onInit() {
                this.touching = false;
                this.centerPos = {};
                this.drawRange();
            }

            drawRange() {
                if(this.from && this.to){
                    var parsedFrom = parseTime(this.from);
                    var parsedTo = parseTime(this.to);
                    var fromAngle=-90+(parsedFrom.hours*30+parsedFrom.minutes*0.5);
                    var toAngle=-90+(parsedTo.hours*30+parsedTo.minutes*0.5);
                    this.semiCircle = regularSemiCircle(175,125,100,fromAngle,toAngle,false);
                    this.fromPos = positionOnCircle(175,125,100,fromAngle,40,14);
                    this.toPos = positionOnCircle(175,125,100,toAngle,40,14);
                }
            }

            greaterOrEqualTime(time1, time2) {
                var parsedTime1=parseTime(time1);
                var parsedTime2=parseTime(time2);
                return (parsedTime1.hours>parsedTime2.hours) || ((parsedTime1.hours==parsedTime2.hours) && (parsedTime1.minutes>=parsedTime2.minutes));
            }

            greaterTime(time1, time2) {
                var parsedTime1=parseTime(time1);
                var parsedTime2=parseTime(time2);
                return (parsedTime1.hours>parsedTime2.hours) || ((parsedTime1.hours==parsedTime2.hours) && (parsedTime1.minutes>parsedTime2.minutes));
            }

            onTouch(event) {
                this.touching=true;
                this.$ionicScrollDelegate.freezeAllScrolls(true);

                var firstTouch={x: event.gesture.touches[0].clientX, y: event.gesture.touches[0].clientY};
                var offset = event.currentTarget.getBoundingClientRect();

                this.centerPos={x: offset.left + 175, y: offset.top + 125};

                this.baseTime=getModule(this.centerPos.x, this.centerPos.y, firstTouch.x, firstTouch.y)<70 ? 0 : 12;

                this.lastAngle=getAngle(this.centerPos.x, this.centerPos.y, firstTouch.x, firstTouch.y);
                this.from= ""+(parseInt(this.lastAngle/30)+this.baseTime)+':'+((this.lastAngle%30)<15 ? '00':'30');
                this.to= this.from;
                this.lastInverted=false;
                this.drawRange();
                this.onChange({from: this.from, to: this.to});
                return true;
            }

            onRelease() {
                this.touching = false;
                this.$ionicScrollDelegate.freezeAllScrolls(false);
                return true;
            }

            drag(event) {
                if(this.touching){
                    var lastTouch={x: event.gesture.touches[0].clientX, y: event.gesture.touches[0].clientY};

                    var angle=getAngle(this.centerPos.x, this.centerPos.y, lastTouch.x, lastTouch.y);
                    if((this.lastAngle>270 && angle<90) || (angle>270 && this.lastAngle<90)){
                        this.baseTime = this.baseTime===0 ? 12 : 0;
                    }
                    this.lastAngle = angle;
                    var time= ""+(parseInt(this.lastAngle/30)+this.baseTime)+':'+((this.lastAngle%30)<15 ? '00':'30');
                    var inverted;
                    if(this.lastInverted){
                        inverted = !this.greaterTime(time,this.to);
                    }else{
                        inverted = !this.greaterOrEqualTime(time,this.from);
                    }
                    if(inverted){
                        this.from=time;
                    }else{
                        this.to=time;
                    }
                    this.lastInverted = inverted;
                    this.drawRange();
                    this.onChange({from: this.from, to: this.to});
                }
                return true;
            }
        }
    });
