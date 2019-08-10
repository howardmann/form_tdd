let makeScreenshot = require('../util/screenshot')
let screenshot = makeScreenshot('../screenshots/shorten')

describe('Shorten:UI', () => {
  beforeEach(async () => {
    await jestPuppeteer.resetPage()
    await page.goto('http://localhost:4444/shorten')
  })

  it('should have "Shorten URL" on the page', async () => {
    await expect(page).toMatch('Shorten URL TDD')
  })

  xit('should display shortened URL on success', async () => {
  })

  xit('should require url to be submitted', async () => {
  })

  xit('should display error if invalid URL ', async () => {
  })

  xit('should clear error messages on success', async () => {
  })

  xit('should say "..searching" on submit', async () => {
  })
})