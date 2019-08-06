// fixtures
let dummyPosters = require('../fixtures/posters.json')
let notFound = require('../fixtures/notFound.json')

// helper fn to take screenshots
let screenshot = async (filename) => {
  await page.screenshot({
    path: __dirname + '/../screenshots/omdb/' + filename + '.png'
  })
}

describe('OMDB:UI', () => {
  beforeEach(async () => {
    await jestPuppeteer.resetPage()
    await page.goto('http://localhost:4444/omdb')
  })

  it('should have "OMDB" on the page', async () => {
    await expect(page).toMatch('OMDB Search')
    await screenshot('onload')
  })

  it('should require min 3 chars to search', async () => {
    await expect(page).toFillForm('form[name="movieForm"]', {
      search: 'ab',
    })
    await page.keyboard.press('Enter')
    let errorMsg = await page.$eval('#flash-error', el => el.innerText)
    expect(errorMsg).toMatch(/min 3 characters/)
    await screenshot('validation')
  })

  it('displays ...searching after request', async (done) => {
    await page.setRequestInterception(true)
    // register event listener to intercept fetch response after request is made
    page.on('request', async req => {
      if (req.url().includes('omdbapi.com')) {
        let $main = await page.$eval('#main', el => el.innerText)
        await expect($main).toBe('...searching')
        await screenshot('searching')
        
        await req.respond({
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(dummyPosters),
          contentType: 'application/json'
        })
        
        done()
      }
    })

    await expect(page).toFillForm('form[name="movieForm"]', {
      search: 'star',
    })
    await page.keyboard.press('Enter')
  })

  it('should display search results', async (done) => {
    await page.setRequestInterception(true)
    // register event listener to intercept fetch response after request is made
    page.on('request', async req => {
      await req.respond({
        headers: {'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(dummyPosters),
        contentType: 'application/json'
      })
    })

    // Check if page has loaded all image elements from json payload response
    page.on('response', async (res) => {
      // only listen for specific response. E.g. ignore browser default favicon.ico requests
      if (res.url().includes('omdbapi.com')) {
        let results = await res.json()
        await Promise.all(
          results.Search.map(movie =>
            expect(page).toMatchElement(`img[src="${movie.Poster}"]`)
          )
        ).then(async () => {
          await page.setRequestInterception(false)
          await screenshot('results')
          done()
        })
      }
    })

    await expect(page).toFillForm('form[name="movieForm"]', {
      search: 'star',
    })
    await page.keyboard.press('Enter')
  })

  it('should show "No Results" if no results', async (done) => {
    await page.setRequestInterception(true)
    // register event listener to intercept fetch response after request is made
    page.on('request', async req => {
      await req.respond({
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(notFound),
        contentType: 'application/json'
      })
    })

    // Check for error response
    page.on('response', async (res) => {
      // only listen for specific response. E.g. ignore browser default favicon.ico requests
      if (res.url().includes('omdbapi.com')) {
        let message = await page.$eval('#main', el => el.innerText)
        expect(message).toBe('No Results')
        await page.setRequestInterception(false)
        await screenshot('notFound')
        done()
      }
    })

    await expect(page).toFillForm('form[name="movieForm"]', {search: 's12345'})
    await page.keyboard.press('Enter')

  })

})