var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 5000;

server.listen(port,function(){
	console.log('Server listening at 5000');
});

app.use(express.static(__dirname+'/public'));
