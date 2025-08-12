// index.js
const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: '65.109.53.221',
    port: 8219,
    username: 'AFK_Bot',
    auth: 'offline',
    version: '1.21'
  });

  bot.on('spawn', () => {
    console.log('Bot đã join thành công vào server!');
  });

  bot.on('error', err => {
    console.error('Lỗi bot:', err);
  });

  bot.on('end', () => {
    console.log('Kết nối bị ngắt, đang reconnect...');
    setTimeout(createBot, 5000);
  });
}

createBot();
