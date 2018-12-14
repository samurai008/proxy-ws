'use strict';

const express = require('express');
var fs = require('fs')
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
 
// const https = require('https');

// https.createServer({
// }, app)
// .listen(PORT, function () {
//   console.log('Example app listening on port 3000! Go to https://localhost:3000/')
// })

// app.get('/', function(req, res) {
//   const mediaws = new WebSocket('ws://stocks.mnet.website');

//   mediaws.on('message', (data) => {
//     console.log('incoming', data);
//   });
//   res.sendFile(INDEX);
// })

const wss = new SocketServer({ server });
const mediaws = new WebSocket('ws://stocks.mnet.website');

wss.on('connection', (ws) => {
  console.log('Client connected');
  wss.clients.forEach((client) => {
    mediaws.on('message', (data) => {
      client.send(data);
    });
    // client.send(new Date().toTimeString());
  });
  ws.on('close', () => console.log('Client disconnected'));
});

// wss.clients.forEach((client) => {
//   console.log('in wss client');
//   const mediaws = new WebSocket('ws://stocks.mnet.website');
//   mediaws.on('message', (data) => {
//     client.send(data);
//   });
// });
// setInterval(() => {
//   wss.clients.forEach((client) => {
//     mediaws.on('message', (data) => {
//       client.send(data);
//     });
//     // client.send(new Date().toTimeString());
//   });
// }, 0);
