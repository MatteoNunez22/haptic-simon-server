var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){ //Port number: 4000
    console.log('Listening to requests on port 4000 ...')
});

// Socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('Made socket connection with: ', socket.id);
    console.log('--------------------------------------------------------------');

    // Handle generate event
    socket.on('generate', function(){
        var text = "";
        var possible = "abcd";

        for (var i = 0; i < 18; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        console.log('Generated new sequence: ', text);
        io.sockets.emit('generate', text);
    });

    socket.on('shoe', function(player, finished) {
        console.log('!!! player = ' + player);
        console.log('!!! finished = ' + finished);
        io.sockets.emit('shoe', player, finished);
    });

    socket.on('fail', function(loser) {
        io.sockets.emit('fail', loser)
    });

    socket.on('startnew', function() {
        io.sockets.emit('startnew', {})
    });

    socket.on('startfail', function() {
        io.sockets.emit('startfail', {})
    });

});