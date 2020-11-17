var express = require('express');
var app = express();
const ejs = require('ejs');
const os = require('os');

app.use("/public", express.static(__dirname + '/public'));


// ------------ Serial Port. ---------------------------------------- //
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/cu.usbmodem14201', { baudRate: 9600 }); // => /dev/ttyACM0
const parser = port.pipe(new Readline({ delimiter: '\n' }));

port.on("open", function() {
    console.log('Communication série > Ready!');
});
// ----------------------------------------------------------------- //
// ------------ Recup IP Locale. ----------------------------------- //
var ip = getLocalIP();
console.log(ip);

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
console.log('<3 Server running <3');

// ----------------------------------------------------------------- //
// ------------- Routes. ------------------------------------------- //

// Dashboard.
app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render('dashboard.ejs', {local_ip: ip});
});

// Chargement de socket.io
const io = require('socket.io')(server);
io.sockets.on('connection', function (socket) {
socket.emit('new_connection', 'Socket.io > Ready! 🔥');

    // Envoi port série + sync. switch.
    app.get('/switch/:nameAndValue', function(req, res) {
        var paramsSwitch = req.params.nameAndValue.split("-");

        port.write(paramsSwitch[0]+'-'+paramsSwitch[1]);
        socket.broadcast.emit('switch-'+ paramsSwitch[0] +'-led', paramsSwitch[1]);
        res.sendStatus(200);
    });
});

port.on('data', function(data) {
console.log('data: ' + data);
});
