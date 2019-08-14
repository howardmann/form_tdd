let express = require('express')
let router = express.Router()
let validateForm = require('../validation/validateForm')

router.get('/', (req, res, next) => {
  res.render('form')
})

router.get('/form-server', (req, res, next) => {
  res.render('form-server')
})

router.post('/form-server', (req, res, next) => {
  let {company, email, password} = req.body
  let errorList = validateForm({company, email, password})
  if(errorList.length > 0) {
    req.flash('validationFailure', errorList)
  } else {
    let messageSuccess = `Success: ${company}`
    req.flash('messageSuccess', messageSuccess)
  }

  res.redirect('form-server')
})

router.get('/counter', (req, res, next) => {
  res.render('counter')
})

router.get('/omdb', (req, res, next) => {
  res.render('omdb')
})

router.get('/omdbReact', (req, res, next) => {
  res.render('omdbReact')
})


router.get('/shorten', (req, res, next) => {
  res.render('shorten')
})

module.exports = router