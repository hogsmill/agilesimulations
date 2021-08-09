import io from 'socket.io-client'
import bus from './EventBus'

let connStr, labsConnStr
if (location.hostname == 'localhost') {
  connStr = 'http://localhost:3099'
  labsConnStr = 'http://localhost:3013'
} else {
  connStr = 'https://agilesimulations.co.uk:3099'
  labsConnStr = 'https://agilesimulations.co.uk:3013'
}

const connectToLabs = location.hostname != 'localhost'
console.log('Connecting to: ' + connStr)
const socket = io(connStr)
let labsSocket
if (connectToLabs) {
  console.log('Connecting to: ' + labsConnStr)
  labsSocket = io(labsConnStr)
}
// Send

// Contact

bus.$on('contact', () => { bus.$emit('showContact') })

// --------------------------------------------------------------
// Agile Simulations

bus.$on('sendLogin', (data) => { socket.emit('sendLogin', data) })

bus.$on('sendCheckLogin', (data) => { socket.emit('sendCheckLogin', data) })

bus.$on('sendLogout', (data) => { socket.emit('sendLogout', data) })

// Receive

socket.on('loginSuccess', (data) => { bus.$emit('loginSuccess', data) })

socket.on('loginError', (data) => { bus.$emit('loginError', data) })

socket.on('logout', (data) => { bus.$emit('logout', data) })

// Admin

bus.$on('sendLoadUpdates', (data) => { socket.emit('sendLoadUpdates', data) })

bus.$on('sendAddUpdate', (data) => { socket.emit('sendAddUpdate', data) })

bus.$on('sendUpdateUpdate', (data) => { socket.emit('sendUpdateUpdate', data) })

bus.$on('sendDeleteUpdate', (data) => { socket.emit('sendDeleteUpdate', data) })

socket.on('loadUpdates', (data) => { bus.$emit('loadUpdates', data) })

bus.$on('sendLoadGameDates', (data) => { socket.emit('sendLoadGameDates', data) })

bus.$on('sendAddGameDate', (data) => { socket.emit('sendAddGameDate', data) })

bus.$on('sendUpdateGameDate', (data) => { socket.emit('sendUpdateGameDate', data) })

bus.$on('sendDeleteGameDate', (data) => { socket.emit('sendDeleteGameDate', data) })

socket.on('loadGameDates', (data) => { bus.$emit('loadGameDates', data) })

bus.$on('sendLoadFaqs', (data) => { socket.emit('sendLoadFaqs', data) })

bus.$on('sendAddFaq', (data) => { socket.emit('sendAddFaq', data) })

bus.$on('sendUpdateFaq', (data) => { socket.emit('sendUpdateFaq', data) })

bus.$on('sendDeleteFaq', (data) => { socket.emit('sendDeleteFaq', data) })

socket.on('loadFaqs', (data) => { bus.$emit('loadFaqs', data) })

bus.$on('sendLoadPricing', (data) => { socket.emit('sendLoadPricing', data) })

bus.$on('sendAddPricing', (data) => { socket.emit('sendAddPricing', data) })

bus.$on('sendUpdatePricing', (data) => { socket.emit('sendUpdatePricing', data) })

bus.$on('sendSelectPricing', (data) => { socket.emit('sendSelectPricing', data) })

bus.$on('sendDeletePricing', (data) => { socket.emit('sendDeletePricing', data) })

socket.on('loadPricing', (data) => { bus.$emit('loadPricing', data) })

// --------------------------------------------------------------
// Labs

if (connectToLabs) {
  bus.$on('sendLoadGames', () => { labsSocket.emit('sendLoadGames') })

  bus.$on('sendVoteFor', (data) => { labsSocket.emit('sendVoteFor', data) })

  labsSocket.on('loadGames', (data) => { bus.$emit('loadGames', data) })
}

export default bus
