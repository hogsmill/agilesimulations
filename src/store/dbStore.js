
const { v4: uuidv4 } = require('uuid')

const passCode = require('./lib/passCode.js')

function _loadAccounts(db, io, data, debugOn) {

  if (debugOn) { console.log('loadAccounts', data) }

  db.collection.find().toArray(function(err, res) {
    if (err) throw err
    if (res.length) {
      data.accounts = res
    } else {
      data.accounts = []
    }
    io.emit('loadAccounts', data)
  })
}

module.exports = {

  login: function(db, io, data, debugOn) {

    if (debugOn) { console.log('login', data) }

    db.collection.findOne({userName: data.userName}, function(err, res) {
      if (err) throw err
      if (res) {
        if (res.passCode == data.passCode) {
          data.session = uuidv4()
          res.logins.push(data.session)
          db.collection.updateOne({'_id': res._id}, {$set: {logins: res.logins}}, function(err, res) {
            io.emit('loginSuccess', data)
          })
        } else {
          data.message = 'Incorrect password'
          io.emit('loginError', data)
        }
      } else {
        data.message = 'Unknown user'
        io.emit('loginError', data)
      }
    })
  },

  checkLogin: function(db, io, data, debugOn) {

    if (debugOn) { console.log('checkLogin', data) }

/*
    db.collection.findOne({userName: data.userName}, function(err, res) {
      if (err) throw err
      if (res) {
        if (res.passCode == data.passCode) {
          data.session = uuidv4()
          io.emit('loginSuccess', data)
        } else {
          data.message = 'Incorrect password'
          io.emit('loginError', data)
        }
      } else {
        data.message = 'Unknown user'
        io.emit('loginError', data)
      }
    })
*/
  },

  logout: function(db, io, data, debugOn) {

    if (debugOn) { console.log('logout', data) }

    db.collection.findOne({userName: data.userName}, function(err, res) {
      if (err) throw err
      if (res) {
        db.collection.updateOne({'_id': res._id}, {$set: {logins: []}}, function(err, res) {
          io.emit('logout', data)
        })
      }
    })
  },

  // Accounts

  loadAccounts: function(db, io, data, debugOn) {

    _loadAccounts(db, io, data, debugOn)
  },

  createAccount: function(db, io, data, debugOn) {

    if (debugOn) { console.log('createAccount', data) }

    db.collection.findOne({userName: data.userName}, function(err, res) {
      if (err) throw err
      if (res) {
        io.emit('accountExists', data)
      } else {
        const res = {
          userName: data.userName,
          passCode: passCode.new(),
          enabled: data.enabled,
          logins: []
        }
        db.collection.insertOne(res, function(err, res) {
          if (err) throw err
          io.emit('accountCreated', data)
          _loadAccounts(db, io, {id: data.id}, debugOn)
        })
      }
    })
  },

  toggleEnableAccount: function(db, io, data, debugOn) {

    if (debugOn) { console.log('toggleEnableAccount', data) }

    db.collection.updateOne({userName: data.userName}, {$set: {enabled: data.enabled}}, function(err, res) {
      if (err) throw err
      _loadAccounts(db, io, {id: data.id}, debugOn)
    })
  },

  newPassCode: function(db, io, data, debugOn) {

    if (debugOn) { console.log('newPassCode', data) }

    db.collection.updateOne({userName: data.userName}, {$set: {passCode: passCode.new()}}, function(err, res) {
      if (err) throw err
      _loadAccounts(db, io, {id: data.id}, debugOn)
    })
  },

  deleteAccount: function(db, io, data, debugOn) {

    if (debugOn) { console.log('deleteAccount', data) }

    db.collection.deleteOne({userName: data.userName}, function(err, res) {
      if (err) throw err
      _loadAccounts(db, io, {id: data.id}, debugOn)
    })
  }

}
