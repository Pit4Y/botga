import fetch from 'node-fetch'
import cheerio from 'cheerio'
let handler = async (m, { conn, args, command, usedPrefix }) => {
if (!db.data.chats[m.chat].modohorny && m.isGroup) throw '*[βππππβ] π»πΎπ π²πΎπΌπ°π½π³πΎπ +π·πΎ π΄πππ°π½ π³π΄ππ°π²ππΈππ°π³πΎπ π΄π½ π΄πππ΄ πΆπππΏπΎ, ππΈ π΄π π°π³πΌπΈπ½ π π³π΄ππ΄π° π°π²ππΈππ°ππ»πΎπ πππ΄ π΄π» π²πΎπΌπ°π½π³πΎ #enable modohorny*'
if (!args[0]) throw `*[βππππβ] πΈπ½πΆππ΄ππ΄ ππ½ π΄π½π»π°π²π΄ ππ°π»πΈπ³πΎ π³π΄ ππ½ππ, π΄πΉπ΄πΌπΏπ»πΎ: ${usedPrefix + command} https://www.xnxx.com/video-14lcwbe8/rubia_novia_follada_en_cuarto_de_bano*`
try {
await conn.reply(m.chat, '[β] πΈπ π£ππππ ππ π‘π π πππππ ππππππ πππ, ππ ππππ π’π ππππππ‘π ππ ππ ππ’π ππ  πππ£ππππ..\n\nοΉ£ α΄Κ α΄Ιͺα΄α΄α΄α΄ α΄α΄ α΄Ι΄α΄ Ιͺα΄ α΄α΄α΄α΄Ι΄α΄α΄ α΄α΄Κ α΄α΄sα΄ Κ α΄α΄Κα΄α΄Ιͺα΄ΜΙ΄ α΄α΄Κ α΄ Ιͺα΄α΄α΄', m)
let res = await xnxxdl(args[0])
let json = await res.result.files
conn.sendMessage(m.chat, { document: { url: json.high }, mimetype: 'video/mp4', fileName: res.result.title }, { quoted: m })
} catch {
throw '*[βππππβ] π΄πππΎπ, πΏπΎπ π΅π°ππΎπ πππ΄π»ππ° π° πΈπ½ππ΄π½ππ°ππ»πΎ*\n\n*- π²πΎπππΎπ±πΎππ΄ πππ΄ π΄π» π΄π½π»π°π²π΄ ππ΄π° ππΈπΌπΈπ»π°π π°:*\n*β https://www.xnxx.com/video-14lcwbe8/rubia_novia_follada_en_cuarto_de_bano*'
}}
handler.command = /^(xnxxdl)$/i
export default handler

async function xnxxdl(URL) {
return new Promise((resolve, reject) => {
fetch(`${URL}`, {method: 'get'}).then(res => res.text()).then(res => {
let $ = cheerio.load(res, { xmlMode: false  });
const title = $('meta[property="og:title"]').attr('content');
const duration = $('meta[property="og:duration"]').attr('content');
const image = $('meta[property="og:image"]').attr('content');
const videoType = $('meta[property="og:video:type"]').attr('content');
const videoWidth = $('meta[property="og:video:width"]').attr('content');
const videoHeight = $('meta[property="og:video:height"]').attr('content');
const info = $('span.metadata').text();
const videoScript = $('#video-player-bg > script:nth-child(6)').html();
const files = {
low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1], };
resolve({ status: 200, result: { title, URL, duration, image, videoType, videoWidth, videoHeight, info, files }})}).catch(err => reject({code: 503, status: false, result: err }))})}
