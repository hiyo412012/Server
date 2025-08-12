// pingBot.js
const net = require('net');
const HOST = '65.109.53.221';
const PORT = 8219;

function pingServer() {
  const sock = net.createConnection(PORT, HOST, () => {
    sock.end();
    console.log('Pinged server at', new Date().toLocaleTimeString());
  });
  sock.on('error', console.error);
}

// Ping ngay khi bắt đầu
pingServer();

// Tiếp tục ping mỗi 5 phút
setInterval(pingServer, 5 * 60 * 1000);
