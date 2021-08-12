
const fs = require('fs')
const os = require('os')
const prod = os.hostname() == 'agilesimulations' ? true : false

const timeFuns = require('./lib/timeFuns.js')
const sortFuns = require('./lib/sort.js')

const sitemap = prod ? '/var/www/html/sitemap.xml' : 'sitemap.xml'

function header() {
  if (fs.existsSync(sitemap)) {
    fs.unlinkSync(sitemap)
  }
  writeXML('<?xml version="1.0" encoding="UTF-8" ?>')
  writeXML('  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
}

function footer() {
  writeXML( '</urlset>')
}

function writeItem(url, date) {
  writeXML('    <url>')
  writeXML('      <loc>https://agilesimulations.co.uk/' + url + '</loc>')
	writeXML('      <lastmod>' + date + '</lastmod>')
  writeXML('    </url>')
}

function writeXML(str) {
  fs.appendFileSync(sitemap, str + '\n', function (err) {
    if (err) console.log(err)
  })
}

module.exports = {

  createSiteMap: function(db, debugOn) {

    if (debugOn) { console.log('createSiteMap') }

    const tabs = [
      'pricing',
      'subscriptiondescription',
      'games',
      'about'
    ]
    date = timeFuns.w3cDate()
    header()
    for (let i = 0; i < tabs.length; i++) {
      writeItem('?' + tabs[i], date)
    }
    writeItem('gameDates.xml', date)
    writeItem('updates.xml', date)
    db.gameDatesCollection.find().toArray(function(err, res) {
      if (err) throw err
      res = sortFuns.sortByDate(res)
      for (let i = 0; i < res.length; i++) {
        writeItem('?gameDate=' + res[i].id, date)
      }
      db.updatesCollection.find().toArray(function(err, res) {
        if (err) throw err
        res = sortFuns.sortByDate(res)
        for (let i = 0; i < res.length; i++) {
          writeItem('?update=' + res[i].id, date)
        }
        db.gamesCollection.find().toArray(function(err, res) {
          if (err) throw err
          for (let i = 0; i < res.length; i++) {
            if (res[i].href) {
              const href = res[i].href.replace(/\?walkThrough/, '')
              writeItem(href, date)
            }
          }
          footer()
        })
      })
    })
  }
}
