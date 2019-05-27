const http = require('http');
const port = process.env.port || 7000;
const app = require('./index');


const server = http.createServer(app);

server.listen(port);



