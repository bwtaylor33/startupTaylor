const { WebSocketServer, WebSocket } = require('ws');

function peerProxy(httpServer) {
  try {
  // Create a websocket object
  const socketServer = new WebSocketServer({ server: httpServer });

  socketServer.on('connection', (socket) => {
    socket.isAlive = true;

    // Forward messages to everyone except the sender
    socket.on('message', function message(data) {
      console.log("received websocket message");
      socketServer.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });

    // Respond to pong messages by marking the connection alive
    socket.on('pong', () => {
      socket.isAlive = true;
    });
  });

  // Periodically send out a ping message to make sure clients are alive
  setInterval(() => {
    socketServer.clients.forEach(function each(client) {
      if (client.isAlive === false) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, 10000);

  function broadcastMessage(book) {
    socketServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        console.log("sending new book to connected client");
        client.send(JSON.stringify(book));
      }
    });
  }
  return {
    broadcastMessage
  };

} catch (error) {
  console.log(error);
}
}

module.exports = { peerProxy };
