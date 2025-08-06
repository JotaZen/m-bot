require('dotenv').config()
const mc = require('minecraft-protocol')
const { parse } = require('minecraft-chat') // nuevo sistema de chat JSON

const client = mc.createClient({
  host: process.env.MC_HOST,
  port: parseInt(process.env.MC_PORT || '25565'),
  username: process.env.MC_USERNAME,
  version: process.env.MC_VERSION || false,
})

client.on('connect', () => {
  console.log('✅ Conectado al servidor Minecraft')
})

client.on('chat', (packet) => {
  try {
    const json = packet.unsignedContent || packet.message
    const parsed = parse(json)
    const msg = parsed.toString()

    console.log(`💬 ${msg}`)

    if (msg.toLowerCase().includes('salta')) {
      client.write('chat', { message: '¡Estoy saltando!' })
    }
  } catch (e) {
    console.warn('No se pudo interpretar el mensaje:', e.message)
  }
})

client.on('kick_disconnect', (reason, isServerSide) => {
  console.log('🛑 Expulsado:', reason.toString())
})

client.on('end', () => {
  console.log('🔌 Bot desconectado')
})

client.on('error', (err) => {
  console.error('💥 Error de conexión:', err.message)
})
