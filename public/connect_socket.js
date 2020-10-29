const localIP = sessionStorage.getItem('local-IP');
var socket = io.connect('http://'+ localIP +':6533/');
