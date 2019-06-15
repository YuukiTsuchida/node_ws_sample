// original script from  https://github.com/theturtle32/WebSocket-Node
const WebSocketServer = require("websocket").server;
const http = require("http");

const port = process.env.PORT || 5000;

const server = http.createServer((request, response) => {
  console.log(`${new Date()} Received request for ${request.url}`);
  response.writeHead(404);
  response.end();
});

server.listen(port, () => {
  console.log(
    `${new Date()} Server is listening on port ${server.address().port}`
  );
});

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: true
});

wsServer.on("connect", connection => {
  console.log(
    `${new Date()} Peer ${connection.remoteAddress} Connection accepted.`
  );

  connection.on("message", message => {
    console.log(`message : ${JSON.stringify(message)}`);
  });
  connection.on("error", message => {
    console.log(message);
  });

  connection.on("close", (reasonCode, description) => {
    console.log(`[reasonCode : ${reasonCode} ] [description : ${description}]`);
  });

  function sendNumber() {
    if (connection.connected) {
      var str = `{"aaa":"bbb"}`;
      connection.sendUTF(str);
      setTimeout(sendNumber, 4000);
    }
  }

  setTimeout(sendNumber, 30000);
});
