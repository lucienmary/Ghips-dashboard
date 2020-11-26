
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
            <label for="clock-alarm`+cptBlockClockAlarm+`">Alarme `+cptBlockClockAlarm+`:</label>
            <input class="input-clock-alarm trans-stroke" type="time" id="clock-alarm`+cptBlockClockAlarm+`" name="clock-alarm`+cptBlockClockAlarm+`" required>
            <a id="clock-alarm`+cptBlockClockAlarm+`-validation" class="btn btn-secondary clock-alarm-validation">Ok</a>
            <a id="clock-alarm`+cptBlockClockAlarm+`-cancel" class="btn btn-secondary clock-alarm-cancel disabled">Annuler</a>
            <form></li>
        `);
    }

    $('.clock-alarm-block .clock-alarm-validation').click(function(e){
        e.preventDefault();
        if ($('#clock-alarm'+cptBlockClockAlarm).val()) {
            $('#clock-alarm'+cptBlockClockAlarm+'-block').append('<small>✌️</small>');
            $(this).addClass('disabled');
            $('#clock-alarm'+ cptBlockClockAlarm +'-cancel').removeClass('disabled');
            $('#clock-alarm'+cptBlockClockAlarm).addClass('trans-stroke').removeClass('red-stroke');

            cptBlockClockAlarmActive++;
            alarmActiveList['alarm'+cptBlockClockAlarmActive] = $('#clock-alarm'+ cptBlockClockAlarm).val();

            console.log(alarmActiveList);
            setBlockClockAlarm();
        }else{
            $('#clock-alarm'+cptBlockClockAlarm).removeClass('trans-stroke').addClass('red-stroke');
        }
    });
}
