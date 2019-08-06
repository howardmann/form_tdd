let $ = (el) => document.querySelector(el)
let $$ = (el) => document.querySelectorAll(el)

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
  let newNumber = number + 1
  $counter.innerText = newNumber
})

$decrement.addEventListener('click', () => {
  let initial = $counter.innerText
  let number = initial === 'Results' ? 0 : Number(initial)
  let newNumber = number === 0 ? 0 : number - 1
  
  $counter.innerText = newNumber
})