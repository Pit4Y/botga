let handler = async (m, { conn, participants, groupMetadata, args }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/admins.jpg'
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
let pesan = args.join` `
let oi = `*πΌπ΄π½ππ°πΉπ΄:* ${pesan}`
let text = `*βγ* πππππππππ LIDERES *γβ*

${oi}

*π°π³πΌπΈπ½π:*
${listAdmin}

*[ β  οΈ] πππ°π π΄πππ΄ π²πΎπΌπ°π½π³πΎ ππΎπ»πΎ π²ππ°π½π³πΎ ππ΄ πππ°ππ΄ π³π΄ ππ½π° π΄πΌπ΄ππΆπ΄π½π²πΈπ°!!*`.trim()
conn.sendFile(m.chat, pp, 'error.jpg', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
}
handler.help = ['admins <texto>']
handler.tags = ['group']
handler.command = /^(admins|@admins|dmins)$/i
handler.group = true
export default handler
