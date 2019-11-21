const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 8080 });

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