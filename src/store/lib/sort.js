
function _date(r) {
  const d = new Date(r.year, r.month, r.day)
  return d.getTime()
}

module.exports = {

  sortByDate: function(res) {
    return res.sort((a, b) => {
      return _date(b) - _date(a)
    })
  }
}
