
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
            <input type="time" id="clock-alarm`+cptBlockClockAlarm+`" name="clock-alarm`+cptBlockClockAlarm+`" required>
            <button type="submit" class="btn btn-secondary clock-alarm-validation">Ok</button>
            <a class="btn btn-secondary clock-alarm-cancel disabled">Annuler</a>
            <form></li>
        `);
        console.log(cptBlockClockAlarm);
    }


}

$("#clock-alarm"+cptBlockClockAlarm+"-block").submit(function(event){
    console.log(this.id);

    $('#'+this.id).append('<small>✌️</small>');
    $('#'+this.id+' .clock-alarm-validation').prop("disabled",true);
    $('#'+this.id+' .clock-alarm-cancel').removeClass('disabled');

    cptBlockClockAlarmActive++;
    alarmActiveList['alarm'+cptBlockClockAlarmActive] = $( "input" ).val();

    console.log(alarmActiveList);
    console.log(event);
    event.preventDefault();

    setBlockClockAlarm();
});
