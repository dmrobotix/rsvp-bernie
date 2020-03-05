"use strict"
/* form input display text */
$(document).ready(function () {
  bsCustomFileInput.init()
})

/* form input submit button */
const formUpload = document.getElementById('formUpload')
var message, fName, lName, phone, status;
formUpload.addEventListener('submit', function(e) {
  e.preventDefault()
  message = document.getElementById('message').value
  console.log(message)
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
      throw data.error
    } else {
      fName = data.firstName;
      lName = data.lastName;
      phone = data.phone;
      status = data.status;

      //document.getElementsByClassName('totalRSVP').forEach(function(element,index) {element.innerHTML = fName.length});
      const total = document.getElementsByClassName('totalRSVP');
      for(var i=0; i<total.length; i++) {
        total[i].innerHTML = fName.length;
      }
      total.forEach(function(element,index) {element.innerHTML = fName.length})
      document.getElementById('contactCount').innerHTML = 1;
      document.getElementById('phone').innerHTML = phone[0];
      document.getElementById('messageDisplay').innerHTML = fName[0]+" "+lName[0]
      console.log(data)
    }
  })
  .catch(error => {
    // TODO: display error in an alert box
    console.log(error)
  })

})
