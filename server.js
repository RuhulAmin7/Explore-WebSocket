const express = require('express');
const http = require('http');
const app = express();
const expressHTTPServer = http.createServer(app);
const ws = require('ws');
const wss = new ws.Server({ server: expressHTTPServer });

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

wss.on('connection', (socket) => {
  console.log('User connected');
  // receive user message
  socket.on('message', (data) => {
    const msg = data.toString();
    wss.clients.forEach((client) => {
      if (client !== socket) {
        client.send(msg);
      }
    });
  });

  // user close connection
  socket.on('close', (data) => {
    console.log('User Disconnected');
  });
});

expressHTTPServer.listen(3000, () => {
  console.log('server is listening on port 3000');
});
