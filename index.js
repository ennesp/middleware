const WebSocket = require('ws');
 
const port = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port });

console.log('WebSocket Server Listening at port: ', port);

wss.on('connection', function connection(ws) {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

let i = 1;
let timer = setInterval(() => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send('Chapter' + i);
      i++;
      if(i === 6)
        i = 1;
    }
  });
}, 10000);