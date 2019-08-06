module.exports = (state = 0, action) => {
  let data = {
    'INCREMENT': () => state + 1,
    'DECREMENT': () => Math.max(state - 1, 0),
    'DOUBLE': () => state * 2,
    'RESET': () => 0
  }
  
  return data[action.type] ? data[action.type]() : state
}

