const mc = require('minecraft-protocol');

function startBot() {
  const client = mc.createClient({
    host: '65.109.53.221',
    port: 8219,
    username: 'AFK_Bot',
    auth: 'offline',
    version: false  // để tự dò phiên bản server (bao gồm 1.21.6)
  });

  client.on('connect', () => console.log('Đã kết nối vào server Minecraft.'));
  client.on('end', () => {
    console.log('Kết nối bị ngắt, đang reconnect...');
    setTimeout(startBot, 5000);
  });
  client.on('error', (err) => console.error('Lỗi bot:', err));

  // Gửi keep-alive ping để giữ kết nối luôn hoạt động
  setInterval(() => {
    try {
      client.write('keep_alive', { keepAliveId: BigInt(Date.now()) });
    } catch (err) {
      console.error('Lỗi keep-alive:', err);
    }
  }, 15000);
}

startBot();
