const mc = require('minecraft-protocol');

function startBot() {
  const client = mc.createClient({
    host: '65.109.53.221',
    port: 8219,
    username: 'AFK_Bot',
    auth: 'offline',
    version: false  // để tự dò phiên bản từ server
  });

  client.on('connect', () => console.log('Đã kết nối vào server.'));
  client.on('disconnect', (packet) => {
    console.log('Bị ngắt kết nối:', packet?.reason || '');
    setTimeout(startBot, 5000);
  });
  client.on('error', console.error);

  // Ping để giữ server luôn "thức"
  setInterval(() => client.write('ping', { keepAlive: Date.now() }), 15000);
}

startBot();
