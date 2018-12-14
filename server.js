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

const wss = new SocketServer({ server });
const mediaws = new WebSocket('ws://stocks.mnet.website');

wss.on('connection', (ws) => {
  console.log('Client connected');
  // wss.clients.forEach((client) => {
  //   mediaws.on('message', (data) => {
  //     client.send(data);
  //   });
  
  //   // client.send(new Date().toTimeString());
  // });
  mediaws.on('message', (data) => {
    wss.send(data);
  })
  ws.on('close', () => console.log('Client disconnected'));
});