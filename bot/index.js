require('dotenv').config()
const mineflayer = require('mineflayer')

function startBot() {
  const bot = mineflayer.createBot({
    host: process.env.MC_HOST,
    port: parseInt(process.env.MC_PORT, 10),
    username: process.env.MC_USERNAME,
    version: process.env.MC_VERSION || false
  })

  bot.on('login', () => console.log('🔐 Login exitoso'))
  bot.on('spawn', () => {
    console.log('✅ BOT SPAWNED')
    bot.chat('¡Hola desde mineflayer!')
  })

  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    console.log(`<${username}> ${message}`)

    if (message === 'salta') {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 400)
    }
  })

  bot.on('kicked', (reason) => console.log('🛑 Kickeado:', reason))
  bot.on('error', (err) => console.error('💥 Error:', err))
  bot.on('end', () => {
    console.log('🔌 Bot desconectado. Reintentando en 5s...')
    setTimeout(startBot, 5000)
  })
}

startBot()
