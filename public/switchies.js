// const localIP = sessionStorage.getItem('local-IP');
const serverAdress = 'http://'+ localIP +':6533/';

$('#switch-blue-led').click(() =>testSwitch('blue'))

$('#switch-green-led').click(() =>testSwitch('green'))

$('#switch-yellow-led').click(() =>testSwitch('yellow'))

$('#switch-all-up-led').click(() =>allLED(1))
$('#switch-all-down-led').click(() =>allLED(0))

function testSwitch(color) {
    let positionSwitch;
    if ($('#switch-'+color+'-led').is(':checked')) positionSwitch = 1;
    else positionSwitch = 0;
    $.get(serverAdress + "switch/" + color +"-" + positionSwitch)
    .fail(() => { alert("La requête GET a retourné une erreur. (fichier perso statique switchies.js)") });
}

function allLED(params){
    $.get(serverAdress + "switch/all-" + params);
}
