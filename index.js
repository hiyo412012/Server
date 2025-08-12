const mc = require('minecraft-protocol');

function startBot() {
  const client = mc.createClient({
    host: '65.109.53.221',
    port: 8219,
    username: 'AFK_Bot',
    auth: 'offline',
    version: false,        // Tự dò phiên bản server
    skipValidation: true   // Bỏ qua một số kiểm tra packet
  });

  client.on('connect', () => console.log('Đã kết nối vào server Minecraft.'));
  client.on('end', () => {
    console.log('Kết nối bị ngắt, đang reconnect...');
    setTimeout(startBot, 5000);
  });
  client.on('error', (err) => console.error('Lỗi bot:', err));

  // Bỏ qua các packet chunk nặng để tránh lỗi partial packet
  client.on('packet', (data, meta) => {
    if (meta.name === 'chunk_data' || meta.name === 'level_chunk_with_light') {
      return;
    }
  });

  // Gửi keep-alive để giữ kết nối
  setInterval(() => {
    try {
      client.write('keep_alive', { keepAliveId: BigInt(Date.now()) });
    } catch (err) {
      console.error('Lỗi keep-alive:', err);
    }
  }, 15000);
}

startBot();
