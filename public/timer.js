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
