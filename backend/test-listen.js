const http = require('http');
const server = http.createServer((req, res) => res.end('ok'));
server.listen(5000, () => {
  console.log('Listening on 5000');
});
server.on('error', (e) => {
  console.error('SERVER ERROR', e);
});
