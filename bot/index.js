require('dotenv').config()
const mc = require('minecraft-protocol')
const { ChatMessage } = require('prismarine-chat')

const client = mc.createClient({
  host: process.env.MC_HOST,
  port: parseInt(process.env.MC_PORT, 10),
  username: process.env.MC_USERNAME,
  version: process.env.MC_VERSION
})

client.on('connect', () => {
  console.log('✅ Conectado al servidor Minecraft')
})

client.on('chat', (packet) => {
  try {
    const raw = packet.unsignedContent || packet.message
    const chat = new ChatMessage(raw)
    const text = chat.toString()
    console.log(`💬 ${text}`)
  } catch (e) {
    console.warn('❗ Error al leer mensaje:', e.message)
  }
})

client.on('kick_disconnect', (reason) => {
  console.log('🛑 Expulsado:', JSON.stringify(reason, null, 2))
})

client.on('disconnect', (packet) => {
  console.log('❌ Desconectado por el servidor:', JSON.stringify(packet, null, 2))
})

client.on('end', () => {
  console.log('🔌 Bot desconectado')
})

client.on('error', (err) => {
  console.error('💥 Error de conexión:', err.message)
})
