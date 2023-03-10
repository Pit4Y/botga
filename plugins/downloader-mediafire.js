import axios from 'axios'
import fetch from 'node-fetch'
import cheerio from 'cheerio'

let handler = async (m, { conn, args, usedPrefix, command }) => {
   if (!args[0]) throw `*[βππππβ] πΈπ½πΆππ΄ππ΄ ππ½ π΄π½π»π°π²π΄ ππ°π»πΈπ³πΎ π³π΄ πΌπ΄π³πΈπ°π΅πΈππ΄, π΄πΉπ΄πΌπΏπ»πΎ: ${usedPrefix + command} https://www.mediafire.com/file/pbabuzyc7i8ord5/TheMystic-Bot-MD-master_%25285%2529.zip/file*`
   try {  
      let res = await mediafireDl(args[0])
      let { name, size, date, mime, link } = res
      let caption = `
*π π½πΎπΌπ±ππ΄:* ${name}
*π πΏπ΄ππΎ:* ${size}
*π ππΈπΏπΎ:* ${mime}

*β³ π΄ππΏπ΄ππ΄ π΄π½ π»πΎ πππ΄ π΄π½ππΈπΎ ππ π°ππ²π·πΈππΎ. . . .* 
`.trim()
   await m.reply(caption)
   await conn.sendFile(m.chat, link, name, '', m, null, { mimetype: mime, asDocument: true })
   } catch {  
      await m.reply('*[βππππβ] π΄πππΎπ, πΏπΎπ π΅π°ππΎπ πππ΄π»ππ° π° πΈπ½ππ΄π½ππ°ππ»πΎ*\n\n*- π²πΎπππΎπ±πΎππ΄ πππ΄ π΄π» π΄π½π»π°π²π΄ ππ΄π° ππΈπΌπΈπ»π°π π°:*\n*β https://www.mediafire.com/file/pbabuzyc7i8ord5/TheMystic-Bot-MD-master_%25285%2529.zip/file*')
   }
}

handler.help = ['mediafire'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(mediafire|mediafiredl|dlmediafire)$/i

export default handler

async function mediafireDl(url) {
   const res = await axios.get(`https://www-mediafire-com.translate.goog/${url.replace('https://www.mediafire.com/','')}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`)
   const $ = cheerio.load(res.data)
   const link = $('#downloadButton').attr('href')
   const name = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').attr('title').replaceAll(' ','').replaceAll('\n','')
   const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text()
   const size = $('#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '').replaceAll(' ','')
   let mime = ''
   let rese = await axios.head(link)
   mime = rese.headers['content-type']
   return { name, size, date, mime, link }
}
