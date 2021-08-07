
module.exports = {

  w3cDate: function() {
    const d = new Date();
    const dateStr = d.toISOString();
    return dateStr
  }
}
