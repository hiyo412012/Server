const mineflayer = require('mineflayer');

// --- Cấu hình trực tiếp ở đây ---
const config = {
  host: '65.109.53.221',  // IP server
  port: 8219,             // Port server
  username: 'Bot_AFK',    // Tên bot
  version: '1.21.6',      // Phiên bản Java
  auth: 'offline',        // 'offline' hoặc 'microsoft'
  reconnectDelayMs: 5000, // Thời gian thử reconnect (ms)
  antiAfkInterval: 50,    // Anti-AFK mỗi X giây
  antiAfkMoveMs: 1200     // Thời gian di chuyển mỗi lần Anti-AFK (ms)
};
// --------------------------------

let bot;
let reconnectTimeout;
let afkInterval;

function createBot() {
  console.log(`[${new Date().toLocaleTimeString()}] 🔌 Đang tạo bot...`);

  bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    version: config.version,
    auth: config.auth
  });

  bot.on('login', () => {
    console.log(`[${new Date().toLocaleTimeString()}] ✅ Đăng nhập thành công: ${bot.username}`);
    bot.chat('Xin chào, bot AFK đã vào server!');
  });

  bot.on('spawn', () => {
    console.log(`[${new Date().toLocaleTimeString()}] 🌍 Bot đã spawn.`);
    startAntiAfk();
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    console.log(`[CHAT] <${username}> ${message}`);
    if (message.includes(bot.username)) {
      bot.chat(`@${username} mình đang AFK nhưng vẫn online nhé!`);
    }
  });

  bot.on('kicked', (reason) => {
    console.log(`[${new Date().toLocaleTimeString()}] 🚫 Bị kick: ${reason}`);
  });

  bot.on('end', () => {
    console.log(`[${new Date().toLocaleTimeString()}] ❌ Mất kết nối, sẽ thử reconnect...`);
    stopAntiAfk();
    scheduleReconnect();
  });

  bot.on('error', (err) => {
    console.error(`[${new Date().toLocaleTimeString()}] ⚠ Lỗi: ${err.message}`);
  });
}

// --- Anti-AFK ---
function startAntiAfk() {
  stopAntiAfk();
  afkInterval = setInterval(() => {
    if (!bot || !bot.entity) return;
    try {
      const yaw = Math.random() * Math.PI * 2 - Math.PI;
      const pitch = (Math.random() * 40 - 20) * Math.PI / 180;
      bot.look(yaw, pitch, true);

      bot.setControlState('forward', true);
      setTimeout(() => bot.setControlState('forward', false), config.antiAfkMoveMs);

      if (Math.random() < 0.3) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 300);
      }
    } catch (err) {
      console.error('Anti-AFK error:', err.message);
    }
  }, config.antiAfkInterval * 1000);
  console.log(`[Anti-AFK] Đã bật, mỗi ${config.antiAfkInterval}s sẽ di chuyển.`);
}

function stopAntiAfk() {
  if (afkInterval) clearInterval(afkInterval);
  afkInterval = null;
  if (bot) {
    bot.setControlState('forward', false);
    bot.setControlState('jump', false);
  }
}

// --- Reconnect ---
function scheduleReconnect() {
  if (reconnectTimeout) return;
  reconnectTimeout = setTimeout(() => {
    reconnectTimeout = null;
    console.log(`[${new Date().toLocaleTimeString()}] 🔄 Reconnecting...`);
    createBot();
  }, config.reconnectDelayMs);
}

// Chạy lần đầu
createBot();

// Thoát an toàn
process.on('SIGINT', () => {
  console.log('🔌 Đang tắt bot...');
  stopAntiAfk();
  if (bot) bot.quit();
  process.exit();
});
