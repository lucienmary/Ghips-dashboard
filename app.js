var express = require('express');
var app = express();
const ejs = require('ejs');

app.use("/public", express.static(__dirname + '/public'));


// ------------ Serial Port. ---------------------------------------- //
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));

port.on("open", function() {
    console.log('Serial com: Ready!');
});
// ----------------------------------------------------------------- //

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render('dashboard.ejs', {etage: req.params.etagenum});
});

app.get('/blue-:number', function(req, res) {
    if (req.params.number == 0) {
        console.log('0 > BLUE');
        port.write('blue-0');
    }else{
        console.log('1 > BLUE');
        port.write('blue-1');
    }
    res.sendStatus(200);
});

app.get('/green-:number', function(req, res) {
    if (req.params.number == 0) {
        console.log('0 > GREEN');
        port.write('green-0');
    }else{
        console.log('1 > GREEN');
        port.write('green-1');
    }
    res.sendStatus(200);
});

app.get('/yellow-:number', function(req, res) {
    if (req.params.number == 0) {
        console.log('0 > YELLOW');
        port.write('yellow-0');
    }else{
        console.log('1 > YELLOW');
        port.write('yellow-1');
    }
    res.sendStatus(200);
});

app.listen(6533);
console.log('<3 Server running <3');
