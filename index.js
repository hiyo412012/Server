const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: process.env.SERVER_IP,
    port: parseInt(process.env.SERVER_PORT) || 25565,
    username: process.env.BOT_NAME || 'AFK_Bot',
    auth: 'offline'
  });

  bot.on('spawn', () => console.log(`Bot đã join server: ${bot.username}`));
  bot.on('end', () => setTimeout(startBot, 5000));
  bot.on('error', console.error);
}

startBot();
