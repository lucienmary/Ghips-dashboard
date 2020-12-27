
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


// Bloc de création d'alarmes.
// -------------------------------------------
//
//      => Envoie les données au serveur pour set les alarmes.
//      => Appelle alarmView() qui affiche les alarmes dans le dashboard.
//

var alarmActiveList = {};

$('#alarm-validation-input').click(() =>{
    if ($('#alarm-hour-input').val() != ''){
        var alarmValue = $('#alarm-hour-input').val();
        console.log(alarmValue);

        $('#alarm-hour-input').addClass('trans-stroke');

        var alarmCount = window.sessionStorage.getItem('alarmCount');
        var nameObject = 'alarm_'+alarmCount;
        var alarmDay = [];

        if ($('#LDay-input').is(':checked')) alarmDay.push('L');
        if ($('#MaDay-input').is(':checked')) alarmDay.push('Ma');
        if ($('#MeDay-input').is(':checked')) alarmDay.push('Me');
        if ($('#JDay-input').is(':checked')) alarmDay.push('J');
        if ($('#VDay-input').is(':checked')) alarmDay.push('V');
        if ($('#SDay-input').is(':checked')) alarmDay.push('S');
        if ($('#DDay-input').is(':checked')) alarmDay.push('D');

        alarmActiveList[nameObject] = {alarmName: $('#alarmName').val(), alarmHour: alarmValue, alarmDay: alarmDay};

        console.log(alarmActiveList);
        window.sessionStorage.setItem('alarmCount', parseInt(alarmCount)+1);
        socket.emit("alarmSent", alarmActiveList);

        $('#alarm-hour-input').val('');
        $('#alarmName').val('');

        alarmView();
    }
    else $('#alarm-hour-input').removeClass('trans-stroke').addClass('red-stroke');
});


function alarmView() {

    $('#alarm-list').empty();

    for (var i = 0; i < Object.values(alarmActiveList).length; i++) {

        $('#alarm-list').append(`
            <li id="alarm-`+ i +`" class="alarm-list__el">
                <h3>`+ window["alarmActiveList"]["alarm_"+i]["alarmName"] +`<h3>
                <p>`+ window["alarmActiveList"]["alarm_"+i]["alarmHour"] +`</p>
            </li>
            <ul id="alarmDays-`+ i +`"></ul>
        `);
        if (window["alarmActiveList"]["alarm_"+i]["alarmDay"].length > 0){
            for (var j = 0; j < Object.values(window["alarmActiveList"]["alarm_"+i]["alarmDay"]).length; j++) {
                $('#alarmDays-'+i).append(`
                    <li>`+window["alarmActiveList"]["alarm_"+i]["alarmDay"][j]+`</li>
                `);
            }
        }
    }
}
