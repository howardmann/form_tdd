let makeScreenshot = require('../util/screenshot')
let screenshot = makeScreenshot('../screenshots/shorten')
let validURL = require('../fixtures/shorten/validURL.json')

describe('Shorten:UI', () => {
  beforeEach(async () => {
    // await jestPuppeteer.resetPage()
    await page.goto('http://localhost:4444/shorten')
  })

  it('should have "Shorten URL" on the page', async () => {
    await expect(page).toMatch('Shorten URL TDD')
    await screenshot('onload.png')
  })

  it('should display shortened URL on success', async (done) => {
    await page.setRequestInterception(true)

    page.on('request', async req => {
      await req.respond({
        headers: {'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(validURL),
        contentType: 'application/json'
      })
    })

    page.on('response', async (res) => {
      if (res.url().includes('https://rel.ink/api/links/')) {
        let results = await res.json()
        let message = await page.$eval('#main', el => el.innerText)
        expect(message).toBe(`https://rel.ink/${results.hashid}`)
        await screenshot('success.png')
        await page.setRequestInterception(false)
        done()
      }
    })


    await page.type('input[name="url"]', 'https://www.apple.com')
    await page.keyboard.press('Enter')
  })

  xit('should direct to correct URL when clicking on link', async (done) => {
    await page.setRequestInterception(true)
    page.on('request', async req => {
      if (req.url().includes('https://rel.ink/api/links')) {
        await req.respond({
          headers: {'Access-Control-Allow-Origin': '*'},
          body: JSON.stringify(validURL),
          contentType: 'application/json'
        })
      }
    })

    page.on('response', async res => {
      if (res.url().includes('https://rel.ink/api/links/')) {
        await page.setRequestInterception(false)
        await page.click('#shorten-link')
        await page.waitFor(10000)
        await screenshot('validURL.png')
        done()
      }
    })

    await page.type('input[name="url"]', 'https://www.apple.com')
    await page.keyboard.press('Enter')
  }, 30000)

  it.only('should require valid url format to be submitted', async () => {
    await page.type('input[name="url"]', 'invalidurl')
    await page.keyboard.press('Enter')
    let result = await page.$eval('#main', el => el.innerText)
    expect(result).toBe('invalid url')
  })

  xit('should display error if invalid URL ', async () => {
  })

  xit('should clear error messages on success', async () => {
  })

  xit('should say "..searching" on submit', async () => {
  })
})