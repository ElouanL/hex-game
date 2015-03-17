const LISTEN_PORT = 1550;
var express    = require('express');
var app = require('express')();
app.use(express.static(__dirname + '/public'));

app.listen(LISTEN_PORT);

console.log('Server is running ...');