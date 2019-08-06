module.exports = (state = 0, action) => {
  let data = {
    'INCREMENT': () => state + 1,
    'DECREMENT': () => Math.max(state - 1, 0)
  }
  
  return data[action.type] ? data[action.type]() : state
}

