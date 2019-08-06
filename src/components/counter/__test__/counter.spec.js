let counter = require('../counter.js')

describe('Counter', () => {
  it('should increment', () => {
    let initial = 0
    let state1 = counter(initial, {type: 'INCREMENT'})
    expect(state1).toBe(1)
    
    let state2 = counter(state1, {type: 'INCREMENT'})
    expect(state2).toBe(2)

    let state3 = counter(state2, {type: 'INCREMENT'})
    expect(state3).toBe(3)
  })

  it('should decrement', () => {
    let initial = 0
    let state1 = counter(initial, {type: 'INCREMENT'})
    expect(state1).toBe(1)
    
    let state2 = counter(state1, {type: 'DECREMENT'})
    expect(state2).toBe(0)

    let state3 = counter(state2, {type: 'DECREMENT'})
    expect(state3).toBe(0)
  })

  it('should return state if invalid action type', () => {
    let initial = 1
    let state1 = counter(initial, {type: 'INVALID'})
    expect(state1).toBe(1)
  })

  it('should double', () => {
    let initial = 5
    let state1 = counter(initial, {
      type: 'DOUBLE'
    })
    expect(state1).toBe(10)
  })

  it('should reset to 0', () => {
    let initial = 5
    let state1 = counter(initial, {
      type: 'RESET'
    })
    expect(state1).toBe(0)
  })

})