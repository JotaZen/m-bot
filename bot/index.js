require('dotenv').config()
const mc = require('minecraft-protocol')
const { ChatMessage } = require('prismarine-chat')

const client = mc.createClient({
  host: process.env.MC_HOST,
  port: parseInt(process.env.MC_PORT, 10),
  username: process.env.MC_USERNAME,
  version: process.env.MC_VERSION,
  skipValidation: true,
  hideErrors: true
})

client.on('connect', () => {
  console.log('✅ Bot conectado al servidor Minecraft')
})

client.on('chat', (packet) => {
  try {
    const raw = packet.unsignedContent || packet.message
    const chat = new ChatMessage(raw)
    const msg = chat.toString()
    console.log(`💬 ${msg}`)

    if (msg.toLowerCase().includes('salta')) {
      client.write('chat', { message: '¡Estoy saltando!' })
    }
  } catch (err) {
    console.warn('❗ No se pudo interpretar mensaje:', err.message)
  }
})

// 🛑 Ignorar canales de mods o plugins
client.on('plugin_message', (packet) => {
  console.log(`📦 Canal plugin ignorado: ${packet.channel}`)
  // No respondemos nada
})

// Mostrar razones detalladas del kick
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
