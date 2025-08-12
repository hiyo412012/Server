const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: '65.109.53.221',
    port: 8219,
    username: 'AFK_Bot',
    auth: 'offline',
    // version: false, // có thể bỏ comment để ép version "1.21"
  });

  bot.on('spawn', () => console.log(`Bot đã join server: ${bot.username}`));
  bot.on('end', () => setTimeout(startBot, 5000));
  bot.on('error', (err) => console.error('Bot error:', err));
}

startBot();
