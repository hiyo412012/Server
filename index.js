const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: '65.109.53.221',
    port: 8219,
    username: 'AFK_Bot',
    auth: 'offline',
    version: '1.21'  // Mineflayer 4.31.0 hỗ trợ kết nối tới 1.21.6
  });

  bot.on('spawn', () => console.log('Bot đã join thành công vào server!'));
  bot.on('error', console.error);
  bot.on('end', () => {
    console.log('Kết nối bị ngắt, reconnect...');
    setTimeout(createBot, 5000);
  });
}

createBot();
