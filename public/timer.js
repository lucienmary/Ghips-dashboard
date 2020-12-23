
// Horloge.
// --------
setInterval(timer,1000);

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function timer() {
    var d = new Date();
    var date = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    $('#date').text(date);
    $('#timer strong').text(h + ":" + m + ":" + s);
}


// Set block ALARM (réveil) et fonctionnement.
// -------------------------------------------
var alarmActiveList = {};
var cptBlockClockAlarm = 0;
var cptBlockClockAlarmActive = 0;

setBlockClockAlarm();
function setBlockClockAlarm() {

    if (cptBlockClockAlarm == cptBlockClockAlarmActive) {
        cptBlockClockAlarm++;
        $('#clock-alarm-list').append(`
            <li><form class="clock-alarm-block" id="clock-alarm`+cptBlockClockAlarm+`-block">
            <label for="clock-alarm`+cptBlockClockAlarm+`">Alarme <span id="alarm-name`+cptBlockClockAlarm+`"></span>:</label>
            <input class="input-clock-alarm trans-stroke" type="time" id="clock-alarm`+cptBlockClockAlarm+`" name="clock-alarm`+cptBlockClockAlarm+`" required>
            <input type="text" id="name-clock-alarm`+cptBlockClockAlarm+`">

            <p id="view-timer-week`+cptBlockClockAlarm+`"></p>

            <div id="timer-week`+cptBlockClockAlarm+`">
                <div>
                    <input type="checkbox" id="L`+ cptBlockClockAlarm +`" name="L">
                    <label for="L">L</label>
                </div>
                <div>
                    <input type="checkbox" id="Ma`+ cptBlockClockAlarm +`" name="Ma">
                    <label for="Ma">Ma</label>
                </div>
                <div>
                    <input type="checkbox" id="Me`+ cptBlockClockAlarm +`" name="Me">
                    <label for="Me">Me</label>
                </div>
                <div>
                    <input type="checkbox" id="J`+ cptBlockClockAlarm +`" name="J">
                    <label for="J">J</label>
                </div>
                <div>
                    <input type="checkbox" id="V`+ cptBlockClockAlarm +`" name="V">
                    <label for="V">V</label>
                </div>
                <div>
                    <input type="checkbox" id="S`+ cptBlockClockAlarm +`" name="S">
                    <label for="S">S</label>
                </div>
                <div>
                    <input type="checkbox" id="D`+ cptBlockClockAlarm +`" name="D">
                    <label for="D">D</label>
                </div>
            </div>
            <div class="timer-validation">
            <a id="clock-alarm`+cptBlockClockAlarm+`-validation" class="btn btn-secondary clock-alarm-validation">Ok</a>
            <a id="clock-alarm`+cptBlockClockAlarm+`-cancel" class="btn btn-secondary clock-alarm-cancel disabled">Annuler</a>
            </div>
            <form></li>
        `);
    }

    $('.clock-alarm-block .clock-alarm-validation').click(function(e){
        e.preventDefault();
        if ($('#clock-alarm'+cptBlockClockAlarm).val()) {
            $('#alarm-name'+cptBlockClockAlarm).append('<strong>'+ $('#name-clock-alarm'+cptBlockClockAlarm).val() +'</strong>');
            $('#name-clock-alarm'+cptBlockClockAlarm).css('display','none');
            $('#clock-alarm'+cptBlockClockAlarm+'-block').append('<small class="timer-check">✌️</small>');
            $(this).addClass('disabled');
            $('#clock-alarm'+ cptBlockClockAlarm +'-cancel').removeClass('disabled');
            $('#clock-alarm'+cptBlockClockAlarm).addClass('trans-stroke').removeClass('red-stroke');

            // Détection Jours.
            var daySet=[];
            if ($('#L'+ cptBlockClockAlarm).is(':checked')) daySet.push($('#L'+ cptBlockClockAlarm).attr("name"));
            if ($('#Ma'+ cptBlockClockAlarm).is(':checked')) daySet.push($('#Ma'+ cptBlockClockAlarm).attr("name"));
            if ($('#Me'+ cptBlockClockAlarm).is(':checked')) daySet.push($('#Me'+ cptBlockClockAlarm).attr("name"));
            if ($('#J'+ cptBlockClockAlarm).is(':checked')) daySet.push($('#J'+ cptBlockClockAlarm).attr("name"));
            if ($('#V'+ cptBlockClockAlarm).is(':checked')) daySet.push($('#V'+ cptBlockClockAlarm).attr("name"));
            if ($('#S'+ cptBlockClockAlarm).is(':checked')) daySet.push($('#S'+ cptBlockClockAlarm).attr("name"));
            if ($('#D'+ cptBlockClockAlarm).is(':checked')) daySet.push($('#D'+ cptBlockClockAlarm).attr("name"));

            $('#timer-week'+cptBlockClockAlarm).css('display','none');

            for (var i = 0; i < daySet.length; i++) {
                console.log('loop');
                $('#view-timer-week'+cptBlockClockAlarm).append('<span><strong>'+ daySet[i] +' <strong></span>');
            }

            cptBlockClockAlarmActive++;
            alarmActiveList['alarm'+cptBlockClockAlarmActive] = [{alarm: $('#clock-alarm'+ cptBlockClockAlarm).val()}, {days: daySet}];

            console.log(alarmActiveList);
            setBlockClockAlarm();
        }else{
            $('#clock-alarm'+cptBlockClockAlarm).removeClass('trans-stroke').addClass('red-stroke');
        }
    });
}
