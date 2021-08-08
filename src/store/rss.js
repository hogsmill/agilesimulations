
const fs = require('fs')
const os = require('os')
const prod = os.hostname() == 'agilesimulations' ? true : false

const sortFuns = require('./lib/sort.js')

const rssDir = prod ? '/var/www/html/' : __dirname + '/'

function header(file, description) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file)
  }
  writeXML(file, '<?xml version="1.0" encoding="UTF-8" ?>')
  writeXML(file, '<rss version="2.0">')
  writeXML(file, '<channel>')
  writeXML(file, '  <title>Agile Simulations</title>')
  writeXML(file, '  <link>https://agilesimulations.co.uk</link>')
  writeXML(file, '  <description>' + description + '</description>')
}

function footer(file) {
  writeXML(file, '</channel>')
  writeXML(file, '</rss>')
}

function writeGameDateItem(file, item) {
  const date = item.day + '/' + item.month + '/' + item.year
  writeXML(file, '  <item>')
  writeXML(file, '    <title>')
  writeXML(file, '      Public playing of ' + item.game + ' on ' + date)
  writeXML(file, '    </title>')
  writeXML(file, '    <link>')
  writeXML(file, '      https://agilesimulations.co.uk?gameDate=' + item.id)
  writeXML(file, '    </link>')
  writeXML(file, '    <description>')
  writeXML(file, '      ' + item.description)
  writeXML(file, '    </description>')
  writeXML(file, '  </item>')
}

function writeUpdateItem(file, item) {
  const date = item.year + '-' + item.month + '-' + item.day
  writeXML(file, '  <item>')
  writeXML(file, '    <title>')
  writeXML(file, '      Status Update ' + date)
  writeXML(file, '    </title>')
  writeXML(file, '    <link>')
  writeXML(file, '      https://agilesimulations.co.uk?update=' + item.id)
  writeXML(file, '    </link>')
  writeXML(file, '    <description>')
  writeXML(file, '      Welcome to the weekly status update to everyone interested in the progress at Agile Simulations. We\'ve been busy...')
  writeXML(file, '    </description>')
  writeXML(file, '  </item>')
}

function writeXML(file, str) {
  fs.appendFileSync(file, str + '\n', function (err) {
    if (err) console.log(err)
  })
}

module.exports = {

  createGameDates: function(db, debugOn) {

    if (debugOn) { console.log('createGameDates') }

    const file = rssDir + 'gameDates.xml'
    header(file, 'Agile Smulations Public Game Dates')
    db.gameDatesCollection.find().toArray(function(err, res) {
      if (err) throw err
      res = sortFuns.sortByDate(res)
      for (let i = 0; i < res.length; i++) {
        writeGameDateItem(file, res[i], )
      }
      footer(file)
    })
  },

  createUpdates: function(db, debugOn) {

    if (debugOn) { console.log('createUpdates') }

    const file = rssDir + 'updates.xml'
    header(file, 'Agile Smulations Weekly Updates')
    db.updatesCollection.find().toArray(function(err, res) {
      if (err) throw err
      res = sortFuns.sortByDate(res)
      for (let i = 0; i < res.length; i++) {
        writeUpdateItem(file, res[i])
      }
      footer(file)
    })
  }
}
