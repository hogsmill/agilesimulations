import io from 'socket.io-client'
import bus from './EventBus'

let labsConnStr
if (location.hostname == 'localhost') {
  labsConnStr = 'http://localhost:3013'
} else {
  labsConnStr = 'https://agilesimulations.co.uk:3013'
}
console.log('Connecting to: ' + labsConnStr)
const socket = io(labsConnStr)

// Send

// Contact

bus.$on('contact', () => { bus.$emit('showContact') })

// Labs

bus.$on('sendLoadGames', () => { socket.emit('sendLoadGames') })

bus.$on('sendVoteFor', (data) => { socket.emit('sendVoteFor', data) })

// Receive

// Labs

socket.on('loadGames', (data) => { bus.$emit('loadGames', data) })

export default bus
