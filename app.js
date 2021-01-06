var express = require('express');
var app = express();
const ejs = require('ejs');
const os = require('os');
var favicon = require('serve-favicon');
const sound = require("sound-play");

var alarmCount = 0;
var alarmActiveList = {};

app.use("/public", express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

process.setMaxListeners(0);

sound.play("./public/audio/alarm.mp3");

// ------------ Serial Port. ---------------------------------------- //
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/cu.usbmodem14201', { baudRate: 9600 }); // => /dev/ttyACM0
const parser = port.pipe(new Readline({ delimiter: '\n' }));

port.on("open", function() {
    console.log('\x1b[32m%s\x1b[0m', 'Communication série > Ready!');
});
// ----------------------------------------------------------------- //
// ------------ Recup IP Locale. ----------------------------------- //
var ip = getLocalIP();
console.log('\x1b[36m%s\x1b[0m', '\n----------------------------');
console.log('\x1b[33m%s\x1b[0m', ' Adresse: '+ ip + ':6533');
console.log('\x1b[36m%s\x1b[0m', '----------------------------\n');

function getLocalIP() {
 const interfaces = os.networkInterfaces();
 const addresses = [];

 Object.keys(interfaces).forEach((netInterface) => {
  interfaces[netInterface].forEach((interfaceObject) => {
   if (interfaceObject.family === 'IPv4' && !interfaceObject.internal) {
    addresses.push(interfaceObject.address);
   }
  });
 });
 return addresses;
}
// ----------------------------------------------------------------- //
// ------------ Server listening + websocket. ---------------------- //

var server = app.listen(6533);

// ----------------------------------------------------------------- //
// ------------- Routes. ------------------------------------------- //

// Dashboard.
app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render('dashboard.ejs', {local_ip: ip});
});
// Page des logs.
app.get('/logs/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render('logs.ejs', {local_ip: ip});
});

// Chargement de socket.io
const io = require('socket.io')(server);
io.sockets.on('connection', function (socket) {
    socket.emit('new_connection', 'Socket.io > Ready! 🔥');

    socket.emit('alarmSettings', {alarmCount: alarmCount, alarmActiveList: alarmActiveList});

    // Envoi port série + sync. switch.
    app.get('/switch/:nameAndValue', function(req, res) {
        var paramsSwitch = req.params.nameAndValue.split("-");

        port.write(paramsSwitch[0]+'-'+paramsSwitch[1]);
        socket.broadcast.emit('switch-'+ paramsSwitch[0] +'-led', paramsSwitch[1]);
        res.sendStatus(200);
    });

    var msgIsRunning = '';

    port.on('data', function(data) {

        msgIsRunning = msgIsRunning + data;

        if(msgIsRunning.indexOf("`") > 0){
            var cleanedMsg = msgIsRunning.replace('`', '');
            cleanedMsg = cleanedMsg.replace(/(\r\n|\n|\r)/gm,"");

            var dataOnMsg = cleanedMsg.split('-');

            socket.emit('DHT-measure', dataOnMsg);

            msgIsRunning = '';
        }
    });


    // Nouvelles alarmes (Réveil).
    socket.on("alarmSent", (data) => {
        alarmActiveList = data.alarmActiveList;
        alarmCount = data.alarmCount;

        console.log(alarmActiveList);

        io.emit('alarmSettings', {alarmCount: alarmCount, alarmActiveList: alarmActiveList});
    });

});
