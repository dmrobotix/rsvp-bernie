"use strict"
/* form input display text */
$(document).ready(function () {
  bsCustomFileInput.init()
})

/* form input submit button */
const formUpload = document.getElementById('formUpload')
formUpload.addEventListener('submit', function(e) {
  e.preventDefault()

  const file = document.getElementById('fileInput').files[0]
  const formData = new FormData()
  const url = "https://www.margotbits.com/rsvp-bernie/php/process.php"

  formData.append('file',file)

  fetch(url, {
    method: 'POST',
    body: formData
  })
  .then(async response => {
    let data = await response.json()
    if (!response.ok) {
      console.log(data)
      throw data
    }
  })
  .then(response => console.log(response))
  .catch(error => {
    console.log(error)
  })

})
