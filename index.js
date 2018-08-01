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
    console.log('----------------------------------------');

    // Handle generate event
    socket.on('generate', function(){
        var text = "";
        var possible = "abcd";  // Change letters

        for (var i = 0; i < 18; i++) {
            text += possible.charAt(Math.floor(Math.random()
                * possible.length));
        }

        console.log('Generated new sequence: ', text);
        io.sockets.emit('generate', text);
    });

    socket.on('shoe', function(player, finished) {
        console.log('Emit: shoe');
        io.sockets.emit('shoe', player, finished);
    });

    socket.on('fail', function(loser) {
        console.log('Emit: fail');
        io.sockets.emit('fail', loser)
    });

    socket.on('nextRound', function() {
        console.log('Emit: nextRound');
        io.sockets.emit('nextRound', {})
    });

    socket.on('startAgain', function() {
        console.log('Emit: startAgain');
        io.sockets.emit('startAgain', {});
    });

    socket.on('yourTurn', function(player) {
        console.log('Emit: yourTurn');
        io.sockets.emit('yourTurn', player);
    });

    socket.on('addition', function(letter) {
        console.log('Emit: addition. Letter: ' + letter);
        io.sockets.emit('addition', letter);
    });

});