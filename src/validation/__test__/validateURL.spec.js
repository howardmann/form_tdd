let validateURL = require('../validateURL')

describe('validateURL', () => {
  it('should return true if valid payload', () => {
    let payload = {
      url: 'https://www.apple.com'
    }

    let input = validateURL(payload)
    let actual = true
    expect(input).toBe(actual)
  })

  it('return error message if invalid', () => {
    let payload = {
      url: 'apple.com'
    }

    let input = validateURL(payload)
    let actual = 'valid url required'
    expect(input).toEqual(actual)
  })
})