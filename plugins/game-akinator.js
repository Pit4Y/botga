import fetch from 'node-fetch'
import translate from '@vitalets/google-translate-api'
let handler = async (m, { conn, usedPrefix, command, text }) => {
if (m.isGroup) return
let aki = global.db.data.users[m.sender].akinator
if (text == 'end') {
if (!aki.sesi) return m.reply('*[â] ð°ð²ððð°ð»ð¼ð´ð½ðð´ ð½ð¾ ð´ððð°ð ð´ð½ ðð½ð° ðð´ðð¸ð¾ð½ (ð¿ð°ððð¸ð³ð°) ð³ð´ ð°ðºð¸ð½ð°ðð¾ð*')
aki.sesi = false
aki.soal = null
m.reply('*[â] ðð´ ð´ð»ð¸ð¼ð¸ð½ð¾ ð²ð¾ð½ ð´ðð¸ðð¾ ð»ð° ðð´ðð¸ð¾ð½ (ð¿ð°ððð¸ð³ð°) ð³ð´ ð°ðºð¸ð½ð°ðð¾ð*')
} else {
if (aki.sesi) return conn.reply(m.chat, '*[â] ðð¾ð³ð°ðð¸ð° ð´ððð°ð ð´ð½ ðð½ð° ðð´ðð¸ð¾ð½ (ð¿ð°ððð¸ð³ð°) ð³ð´ ð°ðºð¸ð½ð°ðð¾ð*', aki.soal)
try {
let res = await fetch(`https://api.lolhuman.xyz/api/akinator/start?apikey=${lolkeysapi}`)
let anu = await res.json()
if (anu.status !== 200) throw '*[â] ð´ððð¾ð, ð¸ð½ðð´ð½ðð°ð»ð¾ ð¼ð°ð ðð°ðð³ð´*'
let { server, frontaddr, session, signature, question, progression, step } = anu.result
aki.sesi = true
aki.server = server
aki.frontaddr = frontaddr
aki.session = session
aki.signature = signature
aki.question = question
aki.progression = progression
aki.step = step
let resultes2 = await translate(question, { to: 'es', autoCorrect: false })
let txt = `ð® *ðððððððð* ð®\n\n*ð¹ðð¶ð°ð³ð¾ð: @${m.sender.split('@')[0]}*\n*ð¿ðð´ð¶ðð½ðð°: ${resultes2.text}*\n\n`
txt += '*0 - SÃ­*\n'
txt += '*1 - No*\n'
txt += '*2 - No sÃ©*\n'
txt += '*3 - Probablemente sÃ­*\n'
txt += '*4 - Probablemente no*\n\n'
txt += `*ððð° ð´ð» ð²ð¾ð¼ð°ð½ð³ð¾ ${usedPrefix + command} end ð¿ð°ðð° ðð°ð»ð¸ð ð³ð´ ð»ð° ðð´ðð¸ð¾ð½ (ð¿ð°ððð¸ð³ð°) ð³ð´ ð°ðºð¸ð½ð°ðð¾ð*`
let soal = await conn.sendMessage(m.chat, { text: txt, mentions: [m.sender] }, { quoted: m })
aki.soal = soal
} catch {
m.reply('*[â] ð´ððð¾ð, ð¸ð½ðð´ð½ðð°ð»ð¾ ð¼ð°ð ðð°ðð³ð´*')
}}}
handler.menu = ['akinator']
handler.tags  = ['game']
handler.command = /^(akinator)$/i
export default handler
