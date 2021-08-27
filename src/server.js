const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const fs = require('fs')
const ON_DEATH = require('death')({uncaughtException: true})
const os = require('os')
const prod = os.hostname() == 'agilesimulations' ? true : false

const port = 3099
const logFile = prod ? process.argv[4] : 'server.log'
const collection = 'agileSimulations'
const updatesCollection = 'agileSimulationsUpdates'
const gameDatesCollection = 'agileSimulationsGameDates'
const faqsCollection = 'agileSimulationsFaqs'
const pricingCollection = 'agileSimulationsPricing'
const gamesCollection = 'agileSimulationsGames'
const ratingsCollection = 'agileSimulationsRatings'

ON_DEATH(function(signal, err) {
  let logStr = new Date()
  if (signal) {
    logStr = logStr + ' ' + signal + '\n'
  }
  if (err && err.stack) {
    logStr = logStr + '  Error: ' + err.stack + '\n'
  }
  fs.appendFile(logFile, logStr, function (err) {
    if (err) console.log(logStr)
    process.exit()
  })
})

global.TextEncoder = require("util").TextEncoder
global.TextDecoder = require("util").TextDecoder

let httpServer
let io
if (!prod) {
  const express = require('express')
  const app = express()
  httpServer = require('http').createServer(app)
  io = require('socket.io')(httpServer, {
    cors: {
      origins: ['http://localhost:*'],
      methods: ['GET', 'POST'],
      credentials: true
    }
  })
} else {
  const options = {
    key: fs.readFileSync('/etc/ssl/private/agilesimulations.co.uk.key'),
    cert: fs.readFileSync('/etc/ssl/certs/07DDA10F5A5AB75BD9E9508BC490D32C.cer')
  }
  httpServer = require('https').createServer(options)
  io = require('socket.io')(httpServer, {
    cors: {
      origins: ['https://agilesimulations.co.uk'],
      methods: ['GET', 'POST'],
      credentials: true
    }
  })
}

const rss = require('./store/rss.js')
const sitemap = require('./store/sitemap.js')
const dbStore = require('./store/dbStore.js')
const adminStore = require('./store/adminStore.js')

const MongoClient = require('mongodb').MongoClient

const url = prod ?  'mongodb://127.0.0.1:27017/' : 'mongodb://localhost:27017/'
const maxIdleTime = 7200000
const connectDebugOff = prod
const debugOn = !prod

const connections = {}
const maxConnections = 2000

function emit(event, data) {
  if (debugOn) {
    console.log(event, data, '(emit)')
  }
  io.emit(event, data)
}

MongoClient.connect(url, { useUnifiedTopology: true, maxIdleTimeMS: maxIdleTime }, function (err, client) {
  if (err) throw err
  const db = client.db('db')

  db.createCollection(collection, function(error, collection) {})
  db.createCollection(updatesCollection, function(error, updatesCollection) {})
  db.createCollection(gameDatesCollection, function(error, gameDatesCollection) {})
  db.createCollection(faqsCollection, function(error, faqsCollection) {})
  db.createCollection(gamesCollection, function(error, gamesCollection) {})
  db.createCollection(ratingsCollection, function(error, ratingsCollection) {})

  db.updatesCollection = db.collection(updatesCollection)
  db.gameDatesCollection = db.collection(gameDatesCollection)
  db.faqsCollection = db.collection(faqsCollection)
  db.pricingCollection = db.collection(pricingCollection)
  db.gamesCollection = db.collection(gamesCollection)
  db.ratingsCollection = db.collection(ratingsCollection)
  db.collection = db.collection(collection)

  sitemap.createSiteMap(db, debugOn)

  rss.createGameDates(db, debugOn)
  rss.createUpdates(db, debugOn)

  io.on('connection', (socket) => {
    const connection = socket.handshake.headers.host
    connections[connection] = connections[connection] ? connections[connection] + 1 : 1
    if (Object.keys(connections).length > maxConnections || connections[connection] > maxConnections) {
      console.log(`Too many connections. Socket ${socket.id} closed`)
      socket.disconnect(0)
    } else {
      connectDebugOff || console.log(`A user connected with socket id ${socket.id} from ${connection} - ${connections[connection]} connections. (${Object.keys(connections).length} clients)`)
      emit('updateConnections', {connections: connections, maxConnections: maxConnections})
    }

    socket.on('disconnect', () => {
      const connection = socket.handshake.headers.host
      connections[connection] = connections[connection] - 1
      connectDebugOff || console.log(`User with socket id ${socket.id} has disconnected.`)
      emit('updateConnections', {connections: connections, maxConnections: maxConnections})
    })

    socket.on('sendLogin', (data) => { dbStore.login(db, io, data, debugOn) })

    socket.on('sendCheckLogin', (data) => { dbStore.checkLogin(db, io, data, debugOn) })

    socket.on('sendLogout', (data) => { dbStore.logout(db, io, data, debugOn) })

    socket.on('sendRating', (data) => { dbStore.rating(db, io, data, debugOn) })

    // Admin

    socket.on('sendCheckGameDefinitions', () => { adminStore.checkGameDefinitions(db, io, debugOn) })

    socket.on('sendLoadGameDates', (data) => { adminStore.loadGameDates(db, io, data, debugOn) })

    socket.on('sendAddGameDate', (data) => { adminStore.addGameDate(db, io, data, debugOn) })

    socket.on('sendUpdateGameDate', (data) => { adminStore.updateGameDate(db, io, data, debugOn) })

    socket.on('sendDeleteGameDate', (data) => { adminStore.deleteGameDate(db, io, data, debugOn) })

    socket.on('sendLoadUpdates', (data) => { adminStore.loadUpdates(db, io, data, debugOn) })

    socket.on('sendAddUpdate', (data) => { adminStore.addUpdate(db, io, data, debugOn) })

    socket.on('sendUpdateUpdate', (data) => { adminStore.updateUpdate(db, io, data, debugOn) })

    socket.on('sendDeleteUpdate', (data) => { adminStore.deleteUpdate(db, io, data, debugOn) })

    socket.on('sendLoadFaqs', (data) => { adminStore.loadFaqs(db, io, data, debugOn) })

    socket.on('sendAddFaq', (data) => { adminStore.addFaq(db, io, data, debugOn) })

    socket.on('sendUpdateFaq', (data) => { adminStore.updateFaq(db, io, data, debugOn) })

    socket.on('sendDeleteFaq', (data) => { adminStore.deleteFaq(db, io, data, debugOn) })

    socket.on('sendLoadPricings', (data) => { adminStore.loadPricings(db, io, data, debugOn) })

    socket.on('sendAddPricing', (data) => { adminStore.addPricing(db, io, data, debugOn) })

    socket.on('sendUpdatePricing', (data) => { adminStore.updatePricing(db, io, data, debugOn) })

    socket.on('sendSelectPricing', (data) => { adminStore.selectPricing(db, io, data, debugOn) })

    socket.on('sendDeletePricing', (data) => { adminStore.deletePricing(db, io, data, debugOn) })

    socket.on('sendLoadGames', (data) => { adminStore.loadGames(db, io, data, debugOn) })

    socket.on('sendLoadPopularGames', (data) => { adminStore.loadPopularGames(db, io, data, debugOn) })

    socket.on('sendAddGame', (data) => { adminStore.addGame(db, io, data, debugOn) })

    socket.on('sendUpdateGame', (data) => { adminStore.updateGame(db, io, data, debugOn) })

    socket.on('sendDeleteGame', (data) => { adminStore.deleteGame(db, io, data, debugOn) })

    // From accounts

    socket.on('sendLoadAccounts', (data) => { dbStore.loadAccounts(db, io, data, debugOn) })

    socket.on('sendCheckAdminAccounts', (data) => { dbStore.checkAdminAccounts(db, io, data, debugOn) })

    socket.on('sendCreateAccount', (data) => { dbStore.createAccount(db, io, data, debugOn) })

    socket.on('sendToggleEnableAccount', (data) => { dbStore.toggleEnableAccount(db, io, data, debugOn) })

    socket.on('sendUpdateRoute', (data) => { dbStore.updateRoute(db, io, data, debugOn) })

    socket.on('sendUpdateLevel', (data) => { dbStore.updateLevel(db, io, data, debugOn) })

    socket.on('sendUpdateRenewal', (data) => { dbStore.updateRenewal(db, io, data, debugOn) })

    socket.on('sendNewPassCode', (data) => { dbStore.newPassCode(db, io, data, debugOn) })

    socket.on('sendDeleteAccount', (data) => { dbStore.deleteAccount(db, io, data, debugOn) })

  })
})

httpServer.listen(port, () => {
  console.log('Listening on *:' + port)
})
