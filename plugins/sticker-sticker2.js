import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'
let handler = async (m, { conn, args, usedPrefix, command }) => {
let stiker = false
try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/webp|image|video/g.test(mime)) {
if (/video/g.test(mime)) if ((q.msg || q).seconds > 10) return m.reply('*[βππππβ] π΄π» ππΈπ³π΄πΎ π½πΎ πΏππ΄π³π΄ π³πππ°π πΌπ°π π³π΄ 10 ππ΄πΆππ½π³πΎπ*')
let img = await q.download?.()
if (!img) throw `*[βππππβ] ππ΄ππΏπΎπ½π³π΄ π° ππ½ ππΈπ³π΄πΎ, πΈπΌπ°πΆπ΄π½ πΎ πΈπ½ππ΄πππ΄ π΄π» π΄π½π»π°π²π΄ π³π΄ ππ½π° πΈπΌπ°πΆπ΄π½ ππ΄ππΌπΈπ½π°π²πΈπΎΜπ½ .πππ π΄π» π²ππ°π» ππ΄ππ° π²πΎπ½ππ΄πππΈπ³πΎ π΄π½ πππΈπ²πΊπ΄π, π³π΄π±π΄ ππ΄ππΏπΎπ½π³π΄π πΎ πππ°π π΄π» π²πΎπΌπ°π½π³πΎ ${usedPrefix + command}*`
let out
try {
stiker = await sticker(img, false, global.packname, global.author)
} catch (e) {
console.error(e)
} finally {
if (!stiker) {
if (/webp/g.test(mime)) out = await webp2png(img)
else if (/image/g.test(mime)) out = await uploadImage(img)
else if (/video/g.test(mime)) out = await uploadFile(img)
if (typeof out !== 'string') out = await uploadImage(img)
stiker = await sticker(false, out, global.packname, global.author)
}}
} else if (args[0]) {
if (isUrl(args[0])) stiker = await sticker(false, args[0], global.packname, global.author)
else return m.reply('*[βππππβ] π΄π» π΄π½π»π°π²π΄ / πππ» / π»πΈπ½πΊ π½πΎ π΄π ππ°π»πΈπ³π°, π»π° ππ΄ππΌπΈπ½π°π²πΈπΎπ½ π³π΄π» π΄π½π»π°π²π΄ / πππ» / π»πΈπ½πΊ π³π΄π±π΄ ππ΄π .πππ, π΄πΉπ΄πΌπΏπ»πΎ: #s https://telegra.ph/file/0dc687c61410765e98de2.jpg*')
}} catch (e) {
console.error(e)
if (!stiker) stiker = e
} finally {
if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
else throw '*[βππππβ] π»πΎ ππΈπ΄π½ππΎ, πΎπ²ππππΈπΎ ππ½ π΄πππΎπ, πππ΄π»ππ° π° πΈπ½ππ΄ππ½ππ°ππ»πΎ. π½πΎ πΎπ»ππΈπ³π΄ ππ΄ππΏπΎπ½π³π΄ π° ππ½ ππΈπ³π΄πΎ, πΈπΌπ°πΆπ΄π½ πΎ πΈπ½ππ΄πππ΄ π΄π» π΄π½π»π°π²π΄ π³π΄ ππ½π° πΈπΌπ°πΆπ΄π½ ππ΄ππΌπΈπ½π°π²πΈπΎΜπ½ .πππ π΄π» π²ππ°π» ππ΄ππ° π²πΎπ½ππ΄πππΈπ³πΎ π΄π½ πππΈπ²πΊπ΄π*'
}}
handler.help = ['stiker (caption|reply media)', 'stiker <url>', 'stikergif (caption|reply media)', 'stikergif <url>']
handler.tags = ['sticker']
handler.command = /^(sfull|s2|sticker2|stickergif2|stickerwm2|stiker2)$/i
export default handler

const isUrl = (text) => {
return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))}
