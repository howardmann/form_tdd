console.log('shorten url');
const URL = 'https://rel.ink/api/links/'
let postData = require('../../util/postData')
let validateURL = require('../../validation/validateURL')

let $ = (el) => document.querySelector(el)


let $form = $('#shorten-form')
let $main = $('#main')

$form.addEventListener('submit', e => {
  e.preventDefault()
  let url = e.target.url.value
  let validURL = validateURL({url})
  if (validURL === true) {
    let payload = {
      url
    }

    $main.innerText = "...waiting"

    postData(URL, payload)
      .then(async data => {
        let result = await data.json()
        if (result.url[0] === 'Enter a valid URL.') {
          $main.innerHTML = 'Not a valid URL'
          return
        }
        let hashid = result.hashid
        let html = `<a id="shorten-link" href="https://rel.ink/${hashid}">https://rel.ink/${hashid}</a>`
        $main.innerHTML = html
      })
  } else {
    $main.innerText = 'invalid url'
  }
})


