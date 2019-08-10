let makeScreenshot = require('../util/screenshot')
let screenshot = makeScreenshot('../screenshots/shorten')
let validURL = require('../fixtures/shorten/validURL.json')
let notFound = require('../fixtures/shorten/notFound.json')

describe('Shorten:UI', () => {
  beforeEach(async () => {
    await jestPuppeteer.resetPage()
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

  it('should require valid url format to be submitted', async () => {
    await page.type('input[name="url"]', 'apple.com')
    await page.keyboard.press('Enter')
    let result = await page.$eval('#main', el => el.innerText)
    expect(result).toBe('invalid url')
    await screenshot('invalidFormat.png')
  })

  it('should display error if invalid URL ', async (done) => {
    await page.setRequestInterception(true)

    page.on('request', async req => {
      await req.respond({
        headers: {'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(notFound),
        contentType: 'application/json'
      })
    })

    page.on('response', async (res) => {
      if (res.url().includes('https://rel.ink/api/links/')) {
        let results = await res.json()
        let message = await page.$eval('#main', el => el.innerText)
        expect(message).toBe('Not a valid URL')
        await screenshot('invalid.png')
        await page.setRequestInterception(false)
        done()
      }
    })


    await page.type('input[name="url"]', 'https://www.fakeapple123xyz.com')
    await page.keyboard.press('Enter')
  })

  it('should say "..waiting" on submit', async (done) => {
    await page.setRequestInterception(true)

    page.on('request', async req => {
      if (req.url().includes('https://rel.ink/api/links/')) {
        let $main = await page.$eval('#main', el => el.innerText)
        await screenshot('waiting')

        expect($main).toBe('...waiting')

        await req.respond({
          headers: {'Access-Control-Allow-Origin': '*'},
          body: JSON.stringify(validURL),
          contentType: 'application/json'
        })
        await page.setRequestInterception(false)
        done()
      }
    })

    await page.type('input[name="url"]', 'https://www.apple.com')
    await page.keyboard.press('Enter')
  })
})