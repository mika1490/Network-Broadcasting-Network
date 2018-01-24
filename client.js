const net = require('net');

const client = net.connect(10337, '0.0.0.0', () => {
  console.log('Connected'); //acknowledge socket connection

process.stdin.pipe(client);

  
});

client.on('data', (data) => {
  //display info received from server
  console.log('Received: ' + data); 
});

client.on('close', () => {
  console.log('Connection Closed');
});
