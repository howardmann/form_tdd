let makeScreenshot = (directory) => {
  return async (filename) => {
    await page.screenshot({
      path: __dirname + '/' + directory + '/' + filename + '.png'
    })
  }
}

module.exports = makeScreenshot