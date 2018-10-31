'use strict';

const xpipe = require('xpipe');
const net = require('net');

let ipcPath = xpipe.eq('/tmp/my.sock');
const client = net.connect(ipcPath, () => {
    console.log('client connected');
    client.write('world!\r\n');
});

client.on('data', (data) => {
    console.log(data.toString());
    client.end();
});

client.on('end', () => {
    console.log('client disconnected');
})