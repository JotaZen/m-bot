require('dotenv').config()
const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: process.env.MC_HOST,
  port: parseInt(process.env.MC_PORT || '25565'),
  username: process.env.MC_USERNAME,
  version: process.env.MC_VERSION || false // auto
})

bot.once('spawn', () => {
  console.log('✅ Bot conectado y listo')
  bot.chat('Hola, mundo!')
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return
  if (message === 'salta') bot.setControlState('jump', true)
})
