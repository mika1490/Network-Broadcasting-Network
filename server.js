const net = require('net');

//creates an empty array to push the data into
let connections = [];
//connects server
const server = net.createServer((socket) => {

  //the data that goes through the socket will be encoded with utf8
  socket.setEncoding('utf8');

  // connections.write('hi');
  connections.push(socket);

  socket.write('What is your Username');
  socket.loggedName = {};
  socket.loggedName.userName = null;
  //socket is now able to retreive data
  socket.on('data', (data) => {
    let info = data.toString();
    
    if (socket.loggedName.userName === null) {
      socket.loggedName.userName = data.trim();
      console.log(socket.loggedName);
    } else {
      
      let userName = socket.loggedName.userName;
      
      //makes sure that client doesnt receive their own message 
      connections.filter(element => {
        return element !== socket;
      })
      .forEach(element => {
        element.write(`${userName} ${data}`);
        console.log(`${userName}  ${info}`);
      });
    };

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





