
const levels = [
  'Single Game',
  'Using',
  'Regular Use',
  'Dedicated',
  'Admin'
]

const Levels = {

  hasLevel: function(level, required) {
    return levels.indexOf(level) >= levels.indexOf(required)
  }
}

export default Levels
