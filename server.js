'use strict';

const express = require('express');
var fs = require('fs')
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3001;
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
  ws.on('close', () => console.log('Client disconnected'));
});

mediaws.on('open', (mws) => {
  console.log('media-ws connected');
  mediaws.on('message', (data) => {
    console.log(data);
    wss.clients.forEach((client) => {
      client.send(data);
    });
  });
});