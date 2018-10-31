'use strict';

const xpipe = require('xpipe');
const net = require('net');
const fs = require('fs');

let ipcPath = xpipe.eq('/tmp/my.sock');
const client = net.connect(ipcPath, () => {
    console.log('client connected');    
});

var file = null;

client.on('data', (data) => {
    console.log(data.toString());

    console.log('loading file');
    file = fs.createReadStream('./largeImage.jpg');
    file.pipe(client);
});

client.on('end', () => {
    file.close();
    console.log('client disconnected');
})