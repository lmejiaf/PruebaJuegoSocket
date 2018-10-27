const express = require("express");
const app = express();
const path = require("path");


app.set("port", process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, "src")));


const server = app.listen(app.get("port"), () => {
    console.log("server on port" + app.get("port"));
});


const SocketIO = require("socket.io");
const io = SocketIO(server);

var players = []
var cont = 0;
io.on("connection", (socket) => {

    players[socket.id] = {
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 500) + 50,
        playerId: socket.id,
    };
    // send the players object to the new player
    socket.emit('currentPlayers', players);
    // update all other players of the new player
    socket.broadcast.emit('newPlayer', players[socket.id]);

    // when a player disconnects, remove them from our players object
    socket.on('disconnect', function () {
        console.log('user disconnected');
        // remove this player from our players object
        delete players[socket.id];
        // emit a message to all players to remove this player
        io.emit('disconnect', socket.id);
    });
});
