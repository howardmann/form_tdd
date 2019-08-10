let validate = require('validate.js')

let validateURL = (payload) => {
  let schema = {
    url: {
      presence: {
        message: 'valid url required'
      },
      url: {
        message: 'valid url required'
      }
    }
  }

  let result = validate(payload, schema, {
    fullMessages: false
  })
  if (!result) {
    return true
  }
  return result.url[0]
}

module.exports = validateURL