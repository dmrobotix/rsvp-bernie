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
  const url = "/process.php"

  formData.append('file',file)

  fetch(url, {
    method: 'POST',
    body: formData
  }).then(response => {
    console.log(response)
  })

})
