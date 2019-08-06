let counter = require('./counter.js')

let $ = (el) => document.querySelector(el)

let $counter = $('#counter')
let $reset = $('#reset')
let $increment = $('#increment')
let $decrement = $('#decrement')
let $double = $('#double')

let dispatch = (event) => {
  let initial = $counter.innerText
  let number = initial === 'Results' ? 0 : Number(initial)
  let newNumber = counter(number, {
    type: event.toUpperCase()
  })
  $counter.innerText = newNumber
}

$reset.addEventListener('click', () => {
  dispatch('reset')
})

$increment.addEventListener('click', () => {
  dispatch('increment')
})

$decrement.addEventListener('click', () => {
  dispatch('decrement')
})

$double.addEventListener('click', () => {
  dispatch('DOUBLE')
})