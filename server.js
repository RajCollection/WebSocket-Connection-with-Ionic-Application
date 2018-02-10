/*server setup */

var WebSocketServer = require("ws").Server; //to install node module : npm install ws

//websocket runs on port number 8100, you can use any port number
var wss = new WebSocketServer({port:8100});

 
wss.on('connection', function connection(ws) {
    console.log("Connection received")

    ws.on('message', function(msg){
        console.log("message received :"+ msg)
            //send reply back
            ws.send("receive message is: "+msg)
    });

    ws.on('close', function() {
        console.log('closing connection');
    });
});
