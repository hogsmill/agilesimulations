
module.exports = {

  new: function() {
    let code = parseInt(Math.random() * 1000000)
    if (code < 100000) {
      code = code * 10
    }
    return code
  }
}
