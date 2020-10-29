var express = require('express');
var app = express();
const ejs = require('ejs');
const os=require('os');

app.use("/public", express.static(__dirname + '/public'));


// ------------ Serial Port. ---------------------------------------- //
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
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

// Chargement de socket.io
const io = require('socket.io')(server);
io.sockets.on('connection', function (socket) {
socket.emit('new_connection', 'Socket.io > Ready! 🔥');
// ----------------------------------------------------------------- //
// ------------- Routes. ------------------------------------------- //

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render('dashboard.ejs', {local_ip: ip});
});

app.get('/blue-:number', function(req, res) {
    if (req.params.number == 0) {
        console.log('0 > BLUE');
        port.write('blue-0');
        socket.broadcast.emit('switch-blue-led', 0);

    }else{
        console.log('1 > BLUE');
        port.write('blue-1');
        socket.broadcast.emit('switch-blue-led', 1);
    }
    res.sendStatus(200);
});

app.get('/green-:number', function(req, res) {
    if (req.params.number == 0) {
        console.log('0 > GREEN');
        port.write('green-0');
        socket.broadcast.emit('switch-green-led', 0);
    }else{
        console.log('1 > GREEN');
        port.write('green-1');
        socket.broadcast.emit('switch-green-led', 1);
    }
    res.sendStatus(200);
});

app.get('/yellow-:number', function(req, res) {
    if (req.params.number == 0) {
        console.log('0 > YELLOW');
        port.write('yellow-0');
        socket.broadcast.emit('switch-yellow-led', 0);

    }else{
        console.log('1 > YELLOW');
        port.write('yellow-1');
        socket.broadcast.emit('switch-yellow-led', 1);
    }
    res.sendStatus(200);
});
});
