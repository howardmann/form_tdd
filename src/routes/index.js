let express = require('express')
let router = express.Router()

router.get('/', (req, res, next) => {
  res.render('form')
})

router.get('/counter', (req, res, next) => {
  res.render('counter')
})


module.exports = router