let express = require('express')
let router = express.Router()

router.get('/', (req, res, next) => {
  res.render('form')
})

// router.post('/signup', (req, res, next) => {
//   let payload = req.body

// })

module.exports = router