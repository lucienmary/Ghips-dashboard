const localIP = sessionStorage.getItem('local-IP');
var socket = io.connect('http://'+ localIP +':6533/');

socket.on('new_connection', function(msg) {
    console.log('%c'+ msg, 'color: lightgreen');
    $('#infosSync span').addClass('dot--green');
})


socket.on('switch-blue-led', function(val) {
    if(val == 1) $("#switch-blue-led").prop("checked", true);
    else $('#switch-blue-led').prop("checked", false);
})
socket.on('switch-green-led', function(val) {
    if(val == 1) $("#switch-green-led").prop("checked", true);
    else $('#switch-green-led').prop("checked", false);
})
socket.on('switch-yellow-led', function(val) {
    if(val == 1) $("#switch-yellow-led").prop("checked", true);
    else $('#switch-yellow-led').prop("checked", false);
})

// Temp & humidité.
socket.on('DHT-measure', function(dataOnMsg) {
    $('#dot-inputChambre').addClass('dot--green');
    $('#hum strong').text(dataOnMsg[0] + '%');
    $('#temp strong').text(dataOnMsg[1] + '° C');
    $('#temp-r strong').text(dataOnMsg[2] + '° C');
})
