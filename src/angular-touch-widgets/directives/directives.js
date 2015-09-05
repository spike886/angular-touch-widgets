angular.module('angularTouchWidgets.directives',
    [
        'angularTouchWidgets.directives.modeSelector',
        'angularTouchWidgets.directives.lightEditor',
        'angularTouchWidgets.directives.colorWheel',
        'angularTouchWidgets.directives.colorIntensity',
        'angularTouchWidgets.directives.clockEditor',
        'angularTouchWidgets.directives.minutesEditor',
        'angularTouchWidgets.directives.timePicker',
        'angularTouchWidgets.directives.minutesPicker',
        'angularTouchWidgets.directives.thermometer',
        'angularTouchWidgets.directives.phMeter',
        'angularTouchWidgets.directives.orpMeter',
        'angularTouchWidgets.directives.onOffButton'
    ]
);

function regularArcData(cx,cy,radius,startDegrees,endDegrees,isCounterClockwise){

    var offsetRadians=0;  // -Math.PI/2 for 12 o'clock
    var sweepFlag=(isCounterClockwise)?0:1;
    var startRadians=offsetRadians+startDegrees*Math.PI/180;
    var endRadians=offsetRadians+endDegrees*Math.PI/180;
    var largeArc=( (endRadians-startRadians) % (2*Math.PI) ) > Math.PI ? 1 : 0;
    var startX=(cx+radius*Math.cos(startRadians));
    var startY=(cy+radius*Math.sin(startRadians));
    var endX=  (cx+radius*Math.cos(endRadians));
    var endY=  (cy+radius*Math.sin(endRadians));
    var space=" ";
    var arcData="";

    arcData+="M"+space+startX+space+
        startY         +space;
    arcData+="A"+space+radius+space+
        radius         +space+
        offsetRadians  +space+
        largeArc       +space+
        sweepFlag      +space+
        endX           +space+
        endY;
    return(arcData);
}

function regularSemiCircle(cx,cy,radius,startDegrees,endDegrees,isCounterClockwise){
    var space=" ";
    var arcData = regularArcData(cx,cy,radius,startDegrees,endDegrees-0.0001,isCounterClockwise);
    arcData += "L"+space+cx+space+cy;
    return arcData;
}

function positionOnCircle(cx,cy,radius,degrees,extraX,extraY){

    var offsetRadians=0;  // -Math.PI/2 for 12 o'clock
    var startRadians=offsetRadians+degrees*Math.PI/180;
    var x=parseInt(cx+(radius+extraX)*Math.cos(startRadians));
    var y=parseInt(cy+(radius+extraY)*Math.sin(startRadians));

    return {x: x, y: y};
}

function parseTime(time){
    var r = time.split(":");
    return {hours: parseInt(r[0]), minutes: parseInt(r[1])};
}

function getAngle(y1, x1, y2, x2) {
    var tangent = (x2 - x1) / (y2 - y1);
    var ang = Math.atan(tangent);
    if (y2-y1 < 0) ang += Math.PI;
    return ang*180/Math.PI+90;
}

function getModule(x1, y1, x2, y2){
    var x= x2 - x1;
    var y= y2 - y1;
    return Math.sqrt(x*x + y*y);

}
