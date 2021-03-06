"use strict"
/* form input display text */
$(document).ready(function () {
  bsCustomFileInput.init()
})

/* form input submit button */
const formUpload = document.getElementById('formUpload')
var hName = document.getElementById('hostName').value;
var message, hName, fName, lName, phone, rsvp;
var regEx = /\[\w+\]/g
var regExF = /\[FirstName+\]/g
var regExL = /\[LastName+\]/g
var regExH = /\[HostFirstName+\]/g

formUpload.addEventListener('submit', function(e) {
  e.preventDefault()
  // reset form

  document.getElementById('contactCount').innerHTML = 0
  document.getElementById('phone').innerHTML = ''
  document.getElementById('name').innerHTML = ''
  document.getElementById('rsvp').innerHTML = ''
  document.getElementById('messageDisplay').innerHTML = ''
  document.getElementById('contactNext').dataset.count = 0;

  message = document.getElementById('message').value
  hName = document.getElementById('hostName').value
  //console.log(message)
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
      var custom = message
      fName = data.firstName
      lName = data.lastName
      phone = data.phone
      email = data.email
      rsvp = data.rsvp

      custom = custom.replace(regExF,fName[0])
      custom = custom.replace(regExL,lName[0])
      custom = custom.replace(regExH,hName)

      const total = document.getElementsByClassName('totalRSVP')
      for(var i=0; i<total.length; i++) {
        total[i].innerHTML = fName.length;
      }
      document.getElementById('contactCount').innerHTML = 1
      document.getElementById('phone').innerHTML = phone[0]
      document.getElementById('email').innerHTML = email[0]
      document.getElementById('name').innerHTML = fName[0] + ' ' + lName[0]
      document.getElementById('rsvp').innerHTML = rsvp[0]
      document.getElementById('messageDisplay').innerHTML = custom
      const counter = Number(document.getElementById('contactNext').dataset.count)
      document.getElementById('contactNext').dataset.count = counter + 1;
      //console.log(data)
    }
  })
  .catch(error => {
    // TODO: display error in an alert box
    console.log(error)
  })

})

/* flip through contacts */
const nextBtn = document.getElementById('contactNext')
nextBtn.addEventListener('click', function(e) {
  var custom = message
  const counter = Number(document.getElementById('contactNext').dataset.count)
  if (counter >= 1) {
    prevBtn.disabled = false
  }
  if (counter + 1 <= phone.length) {
    custom = custom.replace(regExF,fName[counter])
    custom = custom.replace(regExL,lName[counter])
    custom = custom.replace(regExH,hName)

    document.getElementById('contactCount').innerHTML = counter + 1
    document.getElementById('phone').innerHTML = phone[counter]
    document.getElementById('email').innerHTML = email[counter]
    document.getElementById('name').innerHTML = fName[counter] + ' ' + lName[counter]
    document.getElementById('rsvp').innerHTML = rsvp[counter]
    document.getElementById('messageDisplay').innerHTML = custom
    document.getElementById('contactNext').dataset.count = counter + 1
  } else {
    nextBtn.disabled = true
  }
})

const prevBtn = document.getElementById('contactPrev')
prevBtn.addEventListener('click', function(e) {
  var custom = message
  const counter = Number(document.getElementById('contactNext').dataset.count)
  if (counter <= phone.length-1) {
    nextBtn.disabled = false
  }
  if (counter > 1) {
    custom = custom.replace(regExF,fName[counter-2])
    custom = custom.replace(regExL,lName[counter-2])
    custom = custom.replace(regExH,hName)

    document.getElementById('contactCount').innerHTML = counter - 1
    document.getElementById('phone').innerHTML = phone[counter-2]
    document.getElementById('email').innerHTML = email[counter-2]
    document.getElementById('name').innerHTML = fName[counter-2] + ' ' + lName[counter-2]
    document.getElementById('rsvp').innerHTML = rsvp[counter-2]
    document.getElementById('messageDisplay').innerHTML = custom
    document.getElementById('contactNext').dataset.count = counter - 1
  } else {
    prevBtn.disabled = true
  }
})
