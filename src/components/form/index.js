let validateForm = require('../../validation')

module.exports = function(){
  let $form = document.querySelector('form[name="myForm"]')
  let $flashSuccess = document.querySelector('#flash-success')
  let $flashError = document.querySelector('#flash-error')
  console.log('woohoo');
  
  $form.addEventListener('submit', (e) => {
    e.preventDefault()
    let company = e.target.company.value || null
    let email = e.target.email.value
    let password = e.target.password.value

    let errorList = validateForm({
      company,
      email,
      password
    })
    if (errorList.length > 0) {
      let liArr = errorList.map(el => `<li>${el}</li>`)
      let HTML = `
      <ul>
        ${liArr.join('')}
      </ul>
      `
      $flashError.innerHTML = HTML
      return
    }
    $flashSuccess.innerText = `Success: ${company}`
  })
}
