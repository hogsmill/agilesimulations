
const levels = [
  'Using',
  'Regular Use',
  'Dedicated'
]

const Levels = {

  hasLevel: function(level, required) {
    return levels.indexOf(level) >= levels.indexOf(required)
  }
}

export default Levels
