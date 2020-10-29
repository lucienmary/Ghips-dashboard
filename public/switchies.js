// const localIP = sessionStorage.getItem('local-IP');
const serverAdress = 'http://'+ localIP +':6533/';

$('#switch-blue-led').click(() =>{
    let positionSwitch;
    if ($('#switch-blue-led').is(':checked')) positionSwitch = 1;
    else positionSwitch = 0;
    $.get(serverAdress + "blue-" + positionSwitch)
    .fail(function() {
        alert("La requête GET a retourné une erreur. (fichier perso statique switchies.js)");
    });
})

$('#switch-green-led').click(() =>{
    let positionSwitch;
    if ($('#switch-green-led').is(':checked')) positionSwitch = 1;
    else positionSwitch = 0;
    $.get(serverAdress + "green-" + positionSwitch)
    .fail(function() {
        alert("La requête GET a retourné une erreur. (fichier perso statique switchies.js)");
    });
})

$('#switch-yellow-led').click(() =>{
    let positionSwitch;
    if ($('#switch-yellow-led').is(':checked')) positionSwitch = 1;
    else positionSwitch = 0;
    $.get(serverAdress + "yellow-" + positionSwitch)
    .fail(function() {
        alert("La requête GET a retourné une erreur. (fichier perso statique switchies.js)");
    });
})
