const mc = require('minecraft-protocol');

let retryCount = 0;

function startBot() {
  const client = mc.createClient({
    host: '65.109.53.221',
    port: 8219,
    username: 'AFK_Bot',
    auth: 'offline',
    version: false,         // Tự dò phiên bản server (bao gồm 1.21.6)
    skipValidation: true,   // Bỏ qua một số kiểm tra packet không cần thiết
    setTimeout: 30000       // Timeout kết nối trong 30s
  });

  client.on('connect', () => {
    console.log('Đã kết nối vào server Minecraft.');
    retryCount = 0;
  });

  client.on('error', (err) => {
    console.error('Lỗi bot:', err);
  });

  client.on('end', () => {
    console.log('Kết nối bị ngắt, reconnect...');
    retryCount++;
    const delay = retryCount < 10 ? 5000 : 60000;
    setTimeout(startBot, delay);
  });

  client.on('packet', (data, meta) => {
    // Bỏ qua các packet chunk có thể gây lỗi partial packet
    if (meta.name === 'chunk_data' || meta.name === 'level_chunk_with_light') {
      return;
    }
  });

  // Gửi packet keep-alive mỗi 15 giây để giữ kết nối hoạt động
  setInterval(() => {
    try {
      client.write('keep_alive', { keepAliveId: BigInt(Date.now()) });
    } catch (err) {
      console.error('Lỗi keep-alive:', err);
    }
  }, 15000);
}

startBot();
