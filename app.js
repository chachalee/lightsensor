var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

function handler (req, res) {
	fs.readFile(__dirname + '/public/index.html',
	function (err, data) {
		res.writeHead(200);
		res.end(data);
	});
	console.log("user connected");
}

app.listen(8000);
  
var mcpadc = require('mcp-spi-adc');

var lightSensor = mcpadc.open(0, {speedHz: 20000}, function (err) {
	if (err) throw err;
	setInterval(function () {
		lightSensor.read(function (err, reading) {
			if (err) throw err;
			io.on('connection', function (socket) {
				console.log("user connected to socket");
				socket.on('messageFromClientToServer', function(data){
					console.log(data);
				});
		
				var sendLightSignal = setInterval(function(){
					console.log(reading.value);
					socket.emit('messageFromServerToClient', reading.value);
				},1000);
	
				socket.on('disconnect', function(){
					console.log("user disconnected from socket");
					clearInterval(sendLightSignal);
				});
			});
   		});
	}, 1000);
});