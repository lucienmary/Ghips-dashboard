var express = require('express');
var app = express();
const ejs = require('ejs');

app.use("/public", express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render('dashboard.ejs', {etage: req.params.etagenum});
});

app.get('/blue-:number', function(req, res) {
    if (req.params.number == 0) {
        console.log('0 > BLUE');
    }else{
        console.log('1 > BLUE');
    }
    res.sendStatus(200);
});

app.get('/green-:number', function(req, res) {
    if (req.params.number == 0) {
        console.log('0 > GREEN');
    }else{
        console.log('1 > GREEN');
    }
    res.sendStatus(200);
});

app.get('/yellow-:number', function(req, res) {
    if (req.params.number == 0) {
        console.log('0 > YELLOW');
    }else{
        console.log('1 > YELLOW');
    }
    res.sendStatus(200);
});

app.listen(99);
console.log('<3 Server running <3');
