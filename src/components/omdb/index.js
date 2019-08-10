console.log('new omdb app');

let $movieForm = document.querySelector('form[name="movieForm"]')
let $search = document.querySelector('input[name="search"]')
let $flashSuccess = document.querySelector('#flash-success')
let $flashError = document.querySelector('#flash-error')
let $main = document.querySelector('#main')

$movieForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let search = e.target.search.value
  if (search.length < 3) {
    $flashError.innerText = 'min 3 characters'
    return;
  }
  
  $main.innerText = '...searching'
  fetch(`http://www.omdbapi.com/?s=${search}&apikey=ee0200e`)
    .then(async res => {
      $flashError.innerText = ''
      let data = await res.json()
      let response = data.Response
      let result;

      if (response === 'False') {
        result = '<p>No Results</p>'
      } else {
        result = data.Search.map(movie => {
          return `
            <p>${movie.Title}</p>
            <img src="${movie.Poster}"/>
        `}).join('')
      }

      $main.innerHTML = result
    })
})
