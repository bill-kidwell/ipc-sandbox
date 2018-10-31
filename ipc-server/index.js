'use strict';

const xpipe = require('xpipe');
const net = require('net');
let ipcPath = xpipe.eq('/tmp/my.sock');
const fs = require('fs');
const streamBuffers = require('stream-buffers');

const server = net.createServer( { allowHalfOpen: false }, (c) => { // connection listener

    console.log('server connected');

    // Create a stream buffer
    var streamBuffer = new streamBuffers.WritableStreamBuffer({
        initialSize: (100 * 1024),  // Starts at 100k
        incrementAmount: (10 * 1024), // Grows by 10k
    });

    c.write('send\r\n')
    // client will pipe over file contents
    c.pipe(streamBuffer);

    // When the connection ends, we can see the streambuffer contents.
    c.on('end', () => {
        console.log('server disconnected');        
        console.log('Stream buffer is ' + streamBuffer.size());
    });

});

server.listen(ipcPath, () => {
    console.log('server bound');
})


