require('dotenv').config();
const mc = require('minecraft-protocol');

const client = mc.createClient({
  host: process.env.MC_HOST,
  port: parseInt(process.env.MC_PORT, 10),
  username: process.env.MC_USERNAME,
  version: process.env.MC_VERSION || false
});

client.on('connect', () => console.log('✅ Conectado al servidor'));
client.on('chat', (packet) => {
  const message = packet.message || packet.unsignedContent;
  console.log(`<CHAT> ${message}`);
  if (packet.senderName !== client.username && message.includes('salta')) {
    client.write('set_player_position', { on_ground: true });
  }
});
client.on('end', () => console.log('Desconectado'));
client.on('error', err => console.error('Error:', err));
