const mc = require('minecraft-protocol');

const options = {
  host: "IP_SERVER_CỦA_BẠN", // Ví dụ: play.example.com
  port: 25565,               // Port server
  username: "Bot_AFK",       // Tên bot
  version: "1.21.6"          // Phiên bản server
};

const client = mc.createClient(options);

client.on('connect', () => {
  console.log('✅ Bot đã kết nối server!');
});

client.on('disconnect', (packet) => {
  console.log('❌ Bị ngắt kết nối:', packet.reason);
  setTimeout(() => {
    console.log('🔄 Thử join lại...');
    mc.createClient(options);
  }, 5000); // Thử join lại sau 5 giây
});

client.on('error', (err) => {
  console.log('⚠ Lỗi:', err);
});
