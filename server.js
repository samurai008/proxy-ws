'use strict';

const express = require('express');
var fs = require('fs')
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const app = express()
  // .use((req, res) => res.sendFile(INDEX) )
  // .listen(PORT, () => console.log(`Listening on ${ PORT }`));
 
const https = require('https');

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(3000, function () {
  console.log('Example app listening on port 3000! Go to https://localhost:3000/')
})

app.get('/', function(req, res) {
  const mediaws = new WebSocket('ws://stocks.mnet.website');

  mediaws.on('message', (data) => {
    console.log('incoming', data);
  });
  res.sendFile(INDEX);
})

// const wss = new SocketServer({ app });

// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   const mediaws = new WebSocket('ws://stocks.mnet.website');

//   mediaws.on('message', (data) => {
//     console.log('incoming', data);
//   });

//   ws.on('close', () => console.log('Client disconnected'));
// });

// setInterval(() => {
//   wss.clients.forEach((client) => {
//     client.send(new Date().toTimeString());
//   });
// }, 1000);
