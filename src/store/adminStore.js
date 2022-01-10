
const { v4: uuidv4 } = require('uuid')

const sortFuns = require('./lib/sort.js')
const rss = require('./rss.js')
const sitemap = require('./sitemap.js')

const gameDefinitions = [
  {name: 'No Estimates',               enabled: true,  popular: 3, level: 'Use',         limited: 'Demo', url: 'no-estimates',      mobile: 'no-estimates-mobile'},
  {name: 'Kanban Playground',          enabled: true,  popular: 0, level: 'Use',         limited: 'Demo', url: 'kanban-playground', mobile: 'kanban-playground-mobile'},
  {name: 'Coin Game',                  enabled: true,  popular: 2, level: 'Use',         limited: 'Demo', url: 'coin-game'},
  {name: 'Agile Battleships',          enabled: true,  popular: 0, level: 'Use',         limited: null,   url: 'battleships'},
  {name: 'Context Switching',          enabled: true,  popular: 0, level: 'Use',         limited: null,   url: 'context-switching'},
  {name: 'Survival at Sea',            enabled: true,  popular: 0, level: 'Use',         limited: null,   url: 'survival'},
  {name: 'Team Dependency Simulation', enabled: false, popular: 0, level: 'Use',         limited: null,   url: 'do-others-work-first'},
  {name: 'Planning Poker',             enabled: true,  popular: 0, level: 'Regular Use', limited: 'Demo',       url: 'planning-poker'},
  {name: 'Spotify Health Check',       enabled: true,  popular: 0, level: 'Regular Use', limited: 'Individual', url: 'team-health-check'},
  {name: '5 Dysfunctions of a Team',   enabled: true,  popular: 1, level: 'Regular Use', limited: 'Individual', url: 'five-dysfunctions'},
  {name: 'Agile Maturity Assessment',  enabled: true,  popular: 0, level: 'Regular Use', limited: 'Individual', url: 'agile-maturity'}
]

function _loadUpdates(db, io, debugOn, updated) {

  if (debugOn) { console.log('loadUpdates') }

  db.updatesCollection.find().toArray(function(err, res) {
    if (err) throw err
    if (updated) {
      sitemap.createSiteMap(db, debugOn)
      rss.createUpdates(db, debugOn)
    }
    res = sortFuns.sortByDate(res)
    io.emit('loadUpdates', res)
  })
}

function _loadGameDates(db, io, debugOn, updated) {

  if (debugOn) { console.log('loadGameDates') }

  db.gameDatesCollection.find().toArray(function(err, res) {
    if (err) throw err
    if (updated) {
      sitemap.createSiteMap(db, debugOn)
      rss.createGameDates(db, debugOn)
    }
    res = sortFuns.sortByDate(res)
    io.emit('loadGameDates', res)
  })
}

function _loadFaqs(db, io, debugOn) {

  if (debugOn) { console.log('loadFaqs') }

  db.faqsCollection.find().toArray(function(err, res) {
    if (err) throw err
    io.emit('loadFaqs', res)
  })
}

function _loadPricings(db, io, debugOn) {

  if (debugOn) { console.log('loadPricings') }

  db.pricingCollection.find().sort({order: 1}).toArray(function(err, res) {
    if (err) throw err
    io.emit('loadPricings', res)
  })
}

function _loadGames(db, io, debugOn) {

  if (debugOn) { console.log('loadGames') }

  db.gamesCollection.find().toArray(function(err, res) {
    if (err) throw err
    io.emit('loadGames', res)
  })
}

module.exports = {

  checkGameDefinitions: function(db, io, debugOn) {

    if (debugOn) { console.log('checkAdminAccounts') }

    db.gamesCollection.findOne(function(err, res) {
      if (err) throw err
      if (!res) {
        for (let i = 0; i < gameDefinitions.length; i++) {
          gameDefinitions[i].id = uuidv4()
          db.gamesCollection.insertOne(gameDefinitions[i], function(err, res) {
            if (err) throw err
          })
        }
        _loadGames(db, io, debugOn)
      }
    })
  },

  // Updates

  loadUpdates: function(db, io, debugOn) {

    _loadUpdates(db, io, debugOn)
  },

  addUpdate: function(db, io, data, debugOn) {

    if (debugOn) { console.log('addUpdate', data) }

    data.id = uuidv4()
    data.text = []
    data.tags = []
    db.updatesCollection.insertOne(data, function(err, res) {
      if (err) throw err
      _loadUpdates(db, io, debugOn)
    })
  },

  updateUpdate: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updateUpdate', data) }

    const id = data.id
    delete data.id
    delete data._id
    db.updatesCollection.updateOne({id: id}, {$set: data}, function(err, res) {
      if (err) throw err
      _loadUpdates(db, io, debugOn, true)
    })
  },

  deleteUpdate: function(db, io, data, debugOn) {

    if (debugOn) { console.log('deleteUpdate', data) }

    db.updatesCollection.deleteOne({id: data.id}, function(err, res) {
      if (err) throw err
      _loadUpdates(db, io, debugOn, true)
    })
  },

  // Game Dates

  loadGameDates: function(db, io, debugOn) {

    _loadGameDates(db, io, debugOn)
  },

  addGameDate: function(db, io, data, debugOn) {

    if (debugOn) { console.log('addGameDate', data) }

    data.id = uuidv4()
    db.gameDatesCollection.insertOne(data, function(err, res) {
      if (err) throw err
      _loadGameDates(db, io, debugOn)
    })
  },

  updateGameDate: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updateGameDate', data) }

    const id = data.id
    delete data.id
    delete data._id
    db.gameDatesCollection.updateOne({id: id}, {$set: data}, function(err, res) {
      if (err) throw err
      _loadGameDates(db, io, debugOn, true)
    })
  },

  deleteGameDate: function(db, io, data, debugOn) {

    if (debugOn) { console.log('deleteGameDate', data) }

    db.gameDatesCollection.deleteOne({id: data.id}, function(err, res) {
      if (err) throw err
      _loadGameDates(db, io, debugOn, true)
    })
  },

  // FAQs

  loadFaqs: function(db, io, debugOn) {

    _loadFaqs(db, io, debugOn)
  },

  addFaq: function(db, io, data, debugOn) {

    if (debugOn) { console.log('addFaq', data) }

    data.id = uuidv4()
    db.faqsCollection.insertOne(data, function(err, res) {
      if (err) throw err
      _loadFaqs(db, io, debugOn)
    })
  },

  updateFaq: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updateFaq', data) }

    const id = data.id
    delete data.id
    delete data._id
    db.faqsCollection.updateOne({id: id}, {$set: data}, function(err, res) {
      if (err) throw err
      _loadFaqs(db, io, debugOn)
    })
  },

  deleteFaq: function(db, io, data, debugOn) {

    if (debugOn) { console.log('deleteFaq', data) }

    db.faqsCollection.deleteOne({id: data.id}, function(err, res) {
      if (err) throw err
      _loadFaqs(db, io, debugOn)
    })
  },

  // Pricing

  loadPricings: function(db, io, debugOn) {

    _loadPricings(db, io, debugOn)
  },

  addPricing: function(db, io, data, debugOn) {

    if (debugOn) { console.log('addPricing', data) }

    data.id = uuidv4()
    data.text = []
    db.pricingCollection.insertOne(data, function(err, res) {
      if (err) throw err
      _loadPricings(db, io, debugOn)
    })
  },

  updatePricing: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updatePricing', data) }

    const id = data.id
    delete data.id
    delete data._id
    db.pricingCollection.updateOne({id: id}, {$set: data}, function(err, res) {
      if (err) throw err
      _loadPricings(db, io, debugOn)
    })
  },

  selectPricing: function(db, io, data, debugOn) {

    if (debugOn) { console.log('selectPricing', data) }

    db.pricingCollection.find().toArray(function(err, res) {
      if (err) throw err
      for (let i = 0; i < res.length; i++) {
        const selected = res[i].id == data.id
        db.pricingCollection.updateOne({id: res[i].id}, {$set: {selected: selected}}, function(err) {
          if (err) throw err
        })
      }
      _loadPricings(db, io, debugOn)
    })
  },

  deletePricing: function(db, io, data, debugOn) {

    if (debugOn) { console.log('deletePricing', data) }

    db.pricingCollection.deleteOne({id: data.id}, function(err, res) {
      if (err) throw err
      _loadPricings(db, io, debugOn)
    })
  },

  // Games

  loadGames: function(db, io, debugOn) {

    _loadGames(db, io, debugOn)
  },

  addGame: function(db, io, data, debugOn) {

    if (debugOn) { console.log('addGame', data) }

    data.id = uuidv4()
    db.gamesCollection.insertOne(data, function(err, res) {
      if (err) throw err
      _loadGames(db, io, debugOn)
    })
  },

  updateGame: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updateGame', data) }

    const id = data.id
    delete data.id
    delete data._id
    db.gamesCollection.updateOne({id: id}, {$set: data}, function(err, res) {
      if (err) throw err
      _loadGames(db, io, debugOn, true)
    })
  },

  deleteGame: function(db, io, data, debugOn) {

    if (debugOn) { console.log('deleteGame', data) }

    db.gamesCollection.deleteOne({id: data.id}, function(err, res) {
      if (err) throw err
      _loadGames(db, io, debugOn, true)
    })
  }
}
