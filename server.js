const net = require('net');

//creates an empty array to push the data into
let connections = [];
//connects server
const server = net.createServer((socket) => {
  // connections.write('hi');
  connections.push(socket);


  //socket is now able to retreive data
  socket.on('data', (data) => {
    //the data that goes through the socket will be encoded with utf8
    socket.setEncoding('utf8');
    console.log(data);
    //makes sure that client doesnt receive their own message 
    connections.filter(element => {
        return element !== socket;
      })
      .forEach(element => {
        element.write(data)
      });


  });
  socket.on('end', () => {
    //splice makes sure that client doesnt receive their own message
    connections.splice(connections.indexOf(socket, 1));
    console.log('Client Disconnected')
  });
});

//binds server to a port
server.listen(10337, '0.0.0.0', () => {
  console.log('You Are Now Connected');
});

// if (socket.userName) {
//   alert('Enter Your User Name');
// }

