
module.exports = {

  w3cDate: function() {
    const date = new Date()
    let y = date.getYear() + 1900
    let m = date.getMonth()
    if (m < 10) {
      m = '0' + m
    }
    let d = date.getDay()
    if (d < 10) {
      d = '0' + d
    }
    const hh = date.getHours()
    const mm = date.getMinutes()
    const ss = date.getSeconds()
    let dateStr = y + '-' + m + '-' + d + 'T' + hh + ':' + mm + ':' + ss
    return dateStr
  }
}
