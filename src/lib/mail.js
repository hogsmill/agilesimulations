
import jQuery from 'jquery'
const $ = jQuery
window.$ = $

const required = {
  email: true
}

const Mail = {

  post: function(data, message) {
    let ok = true
    for (const key in data) {
      data[key] = data[key].trim()
      if (required[key]) {
        if (!data[key] || 0 === data[key].length) {
          ok = false
        }
      }
    }
    if (!ok) {
      alert('Please complete all fields')
      return false
    } else {
      $.ajax({
          type: 'GET',
          url: 'https://agilesimulations.co.uk/mail.php',
          data: data,
          success: () => {
            alert(message)
          }
      })
      return true
    }
  }
}

export default Mail
