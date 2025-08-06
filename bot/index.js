require('dotenv').config()
const mc = require('minecraft-protocol')
const { ChatMessage } = require('prismarine-chat') // ✅ reemplazo real

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
        const raw = packet.unsignedContent || packet.message
        const chat = new ChatMessage(raw)
        const text = chat.toString()

        console.log(`💬 ${text}`)

        if (text.toLowerCase().includes('salta')) {
            client.write('chat', { message: '¡Estoy saltando!' })
        }
    } catch (e) {
        console.warn('❗ Error al interpretar mensaje:', e.message)
    }
})

client.on('kick_disconnect', (reason) => {
    console.log('🛑 Expulsado del servidor:', reason.toString())
})

client.on('end', () => {
    console.log('🔌 Bot desconectado')
})

client.on('error', (err) => {
    console.error('💥 Error de conexión:', err.message)
})
