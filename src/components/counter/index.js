let counter = require('./counter.js')

let $ = (el) => document.querySelector(el)

let $counter = $('#counter')
let $reset = $('#reset')
let $increment = $('#increment')
let $decrement = $('#decrement')

$reset.addEventListener('click', () => {
  $counter.innerText = 0
})

$increment.addEventListener('click', () => {
  let initial = $counter.innerText
  let number = initial === 'Results' ? 0 : Number(initial)
  let newNumber = counter(number, {type: 'INCREMENT'})
  $counter.innerText = newNumber
})

$decrement.addEventListener('click', () => {
  let initial = $counter.innerText
  let number = initial === 'Results' ? 0 : Number(initial)
  let newNumber = counter(number, {type: 'DECREMENT'})
  
  $counter.innerText = newNumber
})