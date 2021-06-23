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
console.log('Connecting to: ' + connStr)
const socket = io(connStr)
console.log('Connecting to: ' + labsConnStr)
const labsSocket = io(labsConnStr)

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

// --------------------------------------------------------------
// Labs

bus.$on('sendLoadGames', () => { labsSocket.emit('sendLoadGames') })

bus.$on('sendVoteFor', (data) => { labsSocket.emit('sendVoteFor', data) })

// Receive

labsSocket.on('loadGames', (data) => { bus.$emit('loadGames', data) })

export default bus
