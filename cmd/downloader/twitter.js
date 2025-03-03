import * as cheerio from 'cheerio'
export default (handler) => {
    handler.reg({
        cmd: ['twitter', 'twit', 'twitdl', 'xdl'],
        tags: 'downloader',
        desc: 'Twitter / X downloader',
        isLimit: true,
        run: async (m, { sock, func }) => {
            if (!m.text) return m.reply('Silahkan masukan link twitter')
            const scrape = await func.load("@amiruldev/twit.js")
            const ok = await scrape(cheerio, m.text)
            if (!ok.status === 'ok') return m.reply('Permintaan tidak dapat diproses!!')
            m.react("⏱️")
            await Promise.all(ok.images.map(it => sock.sendMedia(m.from, it.download, m)))
            m.react("✅")
        }
    })
}