'use strict';

const xpipe = require('xpipe');
const net = require('net');
let ipcPath = xpipe.eq('/tmp/my.sock');

const server = net.createServer( { allowHalfOpen: false }, (c) => { // connection listener
    console.log('server connected');
    c.on('end', () => {
        console.log('server disconnected');        
    })

    c.write('hello\r\n');
    c.pipe(c);
});

server.listen(ipcPath, () => {
    console.log('server bound');
})


