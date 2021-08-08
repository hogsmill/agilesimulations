
const { v4: uuidv4 } = require('uuid')

const sortFuns = require('./lib/sort.js')
const rss = require('./rss.js')

function _loadUpdates(db, io, debugOn) {

  if (debugOn) { console.log('loadUpdates') }

  db.updatesCollection.find().toArray(function(err, res) {
    if (err) throw err
    rss.createUpdates(db, debugOn)
    res = sortFuns.sortByDate(res)
    io.emit('loadUpdates', res)
  })
}

function _loadGameDates(db, io, debugOn) {

  if (debugOn) { console.log('loadGameDates') }

  db.gameDatesCollection.find().toArray(function(err, res) {
    if (err) throw err
    rss.createGameDates(db, debugOn)
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

module.exports = {

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
      _loadUpdates(db, io, debugOn)
    })
  },

  deleteUpdate: function(db, io, data, debugOn) {

    if (debugOn) { console.log('deleteUpdate', data) }

    db.updatesCollection.deleteOne({id: data.id}, function(err, res) {
      if (err) throw err
      _loadUpdates(db, io, debugOn)
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
      _loadGameDates(db, io, debugOn)
    })
  },

  deleteGameDate: function(db, io, data, debugOn) {

    if (debugOn) { console.log('deleteGameDate', data) }

    db.gameDatesCollection.deleteOne({id: data.id}, function(err, res) {
      if (err) throw err
      _loadGameDates(db, io, debugOn)
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
  }
}
