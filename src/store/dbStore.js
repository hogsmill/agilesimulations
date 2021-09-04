
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

  checkAdminAccounts: function(db, io, data, debugOn) {

    if (debugOn) { console.log('checkAdminAccounts', data) }

    db.collection.findOne({userName: 'agile-simulations'}, function(err, res) {
      if (err) throw err
      if (!res) {
        const res = {
          userName: 'agile-simulations',
          noOfUsers: 100,
          route: '',
          passCode: 'as_user',
          adminPassCode: 'as_admin',
          enabled: true,
          logins: []
        }
        db.collection.insertOne(res, function(err, res) {
          if (err) throw err
          io.emit('adminAccountCreated', data)
          _loadAccounts(db, io, {id: data.id}, debugOn)
        })
      }
    })
  },

  login: function(db, io, data, debugOn) {

    if (debugOn) { console.log('login', data) }

    db.collection.findOne({userName: data.userName}, function(err, res) {
      if (err) throw err
      if (res) {
        let codeMatch = false
        if (res.passCode == data.passCode) {
          data.session = uuidv4()
          data.route = res.route
          data.level = res.level
          data.games = res.games
          data.loggedInAsUser = true
          codeMatch = true
        } else if (res.adminPassCode == data.passCode) {
          data.session = uuidv4()
          data.route = res.route
          data.level = res.level
          data.games = res.games
          data.loggedInAsAdmin = true
          codeMatch = true
        }
        if (codeMatch) {
          res.logins.push(data.session)
          db.collection.updateOne({'_id': res._id}, {$set: {logins: res.logins}}, function(err, res) {
            delete data.passCode
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

    db.collection.findOne({userName: data.session.userName}, function(err, res) {
      if (err) throw err
      if (res) {
        for (let i = 0; i < res.logins.length; i++) {
          if (data.session.session == res.logins[i]) {
            io.emit('loginSuccess', {
              id: data.id,
              route: res.route,
              level: res.level,
              games: res.games,
              userName: data.session.userName,
              session: data.session.session,
              loggedInAsAdmin: data.session.loggedInAsAdmin,
            })
          }
        }
      }
    })
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

  rating: function(db, io, data, debugOn) {

    if (debugOn) { console.log('rating', data) }

    db.ratingsCollection.insertOne({game: data.game, rating: data.rating}, function(err, res) {
      if (err) throw err
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
          noOfUsers: data.noOfUsers,
          route: data.route,
          level: data.level,
          renewal: data.renewal,
          passCode: passCode.new(),
          adminPassCode: passCode.new(),
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

  updateRoute: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updateRoute', data) }

    db.collection.updateOne({userName: data.userName}, {$set: {route: data.route}}, function(err, res) {
      if (err) throw err
      _loadAccounts(db, io, {id: data.id}, debugOn)
    })
  },

  updateLevel: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updateLevel', data) }

    db.collection.updateOne({userName: data.userName}, {$set: {level: data.level, games: data.games}}, function(err, res) {
      if (err) throw err
      _loadAccounts(db, io, {id: data.id}, debugOn)
    })
  },

  updateRenewal: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updateRenewal', data) }

    db.collection.updateOne({userName: data.userName}, {$set: {renewal: data.renewal}}, function(err, res) {
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
