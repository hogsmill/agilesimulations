
const { v4: uuidv4 } = require('uuid')

const sortFuns = require('./lib/sort.js')

function _loadUpdates(db, io, debugOn) {

  if (debugOn) { console.log('loadUpdates') }

  db.updatesCollection.find().toArray(function(err, res) {
    if (err) throw err
    res = sortFuns.sortByDate(res)
    io.emit('loadUpdates', res)
  })
}

function _loadGameDates(db, io, debugOn) {

  if (debugOn) { console.log('loadGameDates') }

  db.gameDatesCollection.find().toArray(function(err, res) {
    if (err) throw err
    res =sortFuns.sortByDate(res)
    io.emit('loadGameDates', res)
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
  }
}
