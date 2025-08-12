// index.js
const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: '65.109.53.221',       // IP cố định của server Java/Bedrock
    port: 8219,                  // Port cố định (Java/Bedrock)
    username: 'AFK_Bot',         // Tên bot hiển thị
    auth: 'offline'
  });

  bot.on('spawn', () => console.log(`Bot đã join server: ${bot.username}`));
  bot.on('end', () => setTimeout(startBot, 5000)); // tự reconnect sau 5 giây
  bot.on('error', console.error);
}

startBot();
